import datetime
import random
import re
import time
import openpyxl
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, update_last_login
from django.http import HttpRequest
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_app import models as django_models, serializers as django_serializers, utils as django_utils, \
    signals as django_signals

http_method_names = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]
django_signals.register_all_signals()


# Create your views here.

def index_f(request):
    try:
        context = {}
        return render(request, "build/index.html", context=context)
    except Exception as error:
        if settings.DEBUG:
            print(f"error {error}")
        return django_utils.DjangoClass.DRFClass.RequestOldClass.return_global_error(request=request, error=error)


@django_utils.DjangoClass.DRFClass.RequestClass.request(auth=False)
def captcha_f(request: django_utils.DjangoClass.DRFClass.RequestClass) -> any:
    if request.method == "GET":
        return "Вы не робот!"


@django_utils.DjangoClass.DRFClass.RequestClass.request(auth=False)
def token_f(request: django_utils.DjangoClass.DRFClass.RequestClass) -> any:
    if request.method == "POST":
        # TODO {"username": "admin", "password": "admin"}
        # TODO {"username": "user", "password": "12345Qwerty!"}
        username = request.get(key="username", _type=str, default="", is_file=False)
        password = request.get(key="password", _type=str, default="", is_file=False)

        if username and password:
            user_obj = authenticate(username=username, password=password)
            if user_obj is None:
                raise Exception("Username or password incorrect!")
            if user_obj.user_model.is_active_account is False:
                raise Exception("Attention, your account is banned!")
            update_last_login(sender=None, user=user_obj)
            token_str = django_models.TokenModel.create_or_update_token(user=user_obj)
            return {"token": token_str}
        raise Exception("Username or password not fulled!")


@django_utils.DjangoClass.DRFClass.RequestClass.request(auth=False)
def todo_f(request: django_utils.DjangoClass.DRFClass.RequestClass) -> any:
    if request.pk:
        if request.method == "GET":
            if request.action == "_":
                todo_obj = django_models.Todo.objects.get(id=request.pk)
                return django_serializers.TodoSerializer(todo_obj, many=False).data
        elif request.method == "PUT" or request.method == "PATCH":
            if request.action == "_":
                title = request.get(key="title", _type=str, default=None, is_file=False)
                description = request.get(key="description", _type=str, default=None, is_file=False)
                avatar = request.get(key="avatar", _type=any, default=None, is_file=True)
                is_completed = request.get(key="is_completed", _type=bool, default=None, is_file=True)

                todo_obj = django_models.Todo.objects.get(id=request.pk)
                if title is not None and todo_obj.title != title:
                    todo_obj.title = title
                if description is not None and todo_obj.description != description:
                    todo_obj.description = description
                if avatar is not None and todo_obj.avatar != avatar:
                    todo_obj.avatar = avatar
                if is_completed is not None and todo_obj.is_completed != is_completed:
                    todo_obj.is_completed = is_completed
                todo_obj.save()
                return "Successfully update"
        elif request.method == "DELETE":
            if request.action == "":
                django_models.Todo.objects.get(id=request.pk).delete()
                return "Successfully delete"
    else:
        if request.method == "GET":
            if request.action == "_":
                page = request.get(key="page", _type=int, default=None, is_file=False)
                limit = request.get(key="limit", _type=int, default=None, is_file=False)

                todos_obj = django_models.Todo.objects.all()
                if page and limit:
                    todos_obj = django_utils.DjangoClass.PaginationClass.paginate(
                        page_number=page, object_list=todos_obj, limit_per_page=limit
                    )
                return django_serializers.TodoSerializer(todos_obj, many=True).data
        elif request.method == "POST":
            if request.action == "_":
                title = request.get(key="title", _type=str, default=None, is_file=False)
                description = request.get(key="description", _type=str, default=None, is_file=False)
                avatar = request.get(key="avatar", _type=any, default=None, is_file=True)
                is_completed = request.get(key="is_completed", _type=bool, default=False, is_file=False)

                if title:
                    django_models.Todo.objects.create(
                        title=title, description=description, avatar=avatar, is_completed=is_completed
                    )
                    return "Successfully create"
                else:
                    raise Exception({"detail": "Not have data"})


@django_utils.DjangoClass.DRFClass.RequestClass.request(auth=False)
def report_f(request: django_utils.DjangoClass.DRFClass.RequestClass) -> any:
    if request.pk:
        pass
    else:
        if request.method == "GET":
            if request.action == "monitoring":
                data = [
                    {"id": x, "type": "Автосамосвал", "speed": random.randint(0, 20), "mass": random.randint(87, 102),
                     "status": random.choice(["Норма", "Простой", "Движение", "Погрузка", "Ремонт", "ППР"]),
                     "time": django_utils.DateTimeUtils.get_current_time()}
                    for x in range(201, 230)
                ]
                return {"data": data}
            elif request.action == "report":
                try:
                    # ?page=1&limit=10&sort_by=name%20(asc)&filter_by=pay%20(true)&search=95
                    page = request.GET.get("page", 1)
                    limit = request.GET.get("limit", 10)
                    search = request.GET.get("search", "")
                    filter_by = request.GET.get("filter_by", "")
                    sort_by = request.GET.get("sort_by", "")

                    workbook = openpyxl.load_workbook('static/media/vehtrips.xlsx')
                    worksheet = workbook.active
                    matrix = worksheet.iter_rows(
                        min_col=1, min_row=1, max_col=worksheet.max_column, max_row=300, values_only=True
                    )
                    # matrix = []
                    # for i in range(1, worksheet.max_row+1):
                    #     row_data = []
                    #     for j in range(1, worksheet.max_column+1):
                    #         print(i, j)
                    #         row_data.append(worksheet.cell(i, j).value)
                    #     matrix.append(row_data)
                    matrix = [
                        {"Автосамосвал": x[0], "Экскаватор": x[1], "Зона разгрузки": x[2], "Тип породы": x[3],
                         "Зона погрузки": x[4], "Ном.": x[5], "Расстояние": x[6], "Масса": x[7], "Объём": x[8],
                         "Частота по массе": x[9], "Частота по объёму": x[10], "Сред. скорость": x[11],
                         "Часы": x[12], "Высота погрузки": x[13], "Высота разгрузки": x[14], "Время погрузки": x[15],
                         "Время выезда на дорогу": x[16], "Время разгрузки": x[17], "Время рейса": x[18]}
                        for x in list(matrix)
                    ]
                    matrix = [
                        x for x in matrix
                        if isinstance(x["Время разгрузки"], datetime.datetime) and
                           (filter_by == "все" or filter_by == x["Тип породы"]) and len(x["Зона разгрузки"]) > 0
                    ]
                    if sort_by == "времени погрузки (свежие в начале)":
                        matrix.sort(key=lambda x: x["Время погрузки"], reverse=True)
                    else:
                        matrix.sort(key=lambda x: x["Время погрузки"])
                    return {"data": matrix}
                except Exception as error:
                    print(error)
                    return {"data": []}


@api_view(http_method_names=http_method_names)
def result_f(request: HttpRequest, pk=0) -> Response:
    try:
        time.sleep(round(random.uniform(1.0, 2.5), 2))

        # TODO Извлечение из "request: HttpRequest" нужных полей
        # front => back
        # GET: request.GET (api/todo/?page=1&limit=10&search=all)  # READ
        # DELETE: request.GET (api/todo/?filter=all)  # DELETE
        # POST: request.data | request.POST | request.FILES  # CREATE
        # PUT: request.data | request.POST | request.FILES  # UPDATE
        # PATCH: request.data | request.POST | request.FILES  # UPDATE

        # print('data: ', request.data)  # POST: JSON | POST: FormData
        # print('GET: ', request.GET)  # GET: url
        # print('POST: ', request.POST)  # POST: FormData
        # print('FILES: ', request.FILES)  # POST: FormData
        #
        method = request.method
        # print('method: ', method)
        # action = request.META.get("HTTP_AUTHORIZATION", "action=0;token=0;").split('action=')[1].split(';')[0]
        # print('action: ', action)
        # print('path: ', request.path)
        # print('ip: ', request.META.get("REMOTE_ADDR"))
        #
        # # TODO create and return token
        # # user_obj = User.objects.get(id=1)
        # # token_str = django_models.TokenModel.create_token(user=user_obj)
        # # print('token_str: ', token_str)
        #
        # # TODO Определение пользователя по токену (нужно/не нужно в конструкторе декоратора)
        # auth = False
        # if auth is True:
        #     try:
        #         # token = request.META.get("HTTP_AUTHORIZATION", "action=0;token=0;").split('token=')[1].split(';')[0]
        #         # user = django_models.TokenModel.objects.get(token=token).user
        #         # user_model = django_models.UserModel.objects.get(user=user)
        #         pass
        #     except Exception as error:
        #         return Response(data={"error": "UNAUTHORIZED"}, status=status.HTTP_401_UNAUTHORIZED)
        # else:
        #     token = None
        #     user = None
        #     user_model = None
        # # TODO Логирование действий
        # # TODO

        if pk:
            if method == "GET":
                obj = django_models.ResultList.objects.get(id=pk)
                response = django_serializers.ResultListSerializer(obj, many=False).data  # python object -> JSON
                return Response(data={"response": {"result": response}}, status=status.HTTP_200_OK)
            elif method == "POST":
                # {"username": "user12346", "password": "qwertY!212", "position": "Программист"}
                username = request.data.get("username", "")
                password = request.data.get("password", "")
                position = request.data.get("position", "")
                if username and password:
                    if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password):
                        user = User.objects.create(
                            username=username,
                            password=make_password(password)
                        )
                        user.profile.position = position
                        user.profile.save()
                        return Response(data={"response:": "Успешно"}, status=status.HTTP_201_CREATED)
                    else:
                        return Response(data={"error:": "Ваш пароль недостаточно сложный"},
                                        status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(data={"error:": "Данные не заполнены"}, status=status.HTTP_400_BAD_REQUEST)
            elif method == "PUT" or method == "PATCH":
                # {"title": "Новая 333", "description": "нов 3", "is_pay": false}
                title = request.data.get("title", None)
                description = request.data.get("description", None)
                is_pay = request.data.get("is_pay", None)

                obj = django_models.ResultList.objects.get(id=pk)
                if title is not None and obj.title != title:
                    obj.title = title
                if description is not None and obj.description != description:
                    obj.description = description
                if is_pay is not None and obj.is_pay != is_pay:
                    obj.is_pay = is_pay
                obj.save()
                return Response(data={"response:": "Successfully update"}, status=status.HTTP_200_OK)
            elif request.method == "DELETE":
                django_models.ResultList.objects.get(id=pk).delete()
                return Response(data={"response:": "Successfully delete"}, status=status.HTTP_200_OK)
        else:
            if method == "GET":
                # ?page=1&limit=10&sort_by=name%20(asc)&filter_by=pay%20(true)&search=95
                page = request.GET.get("page", 1)
                limit = request.GET.get("limit", 10)
                search = request.GET.get("search", "")
                filter_by = request.GET.get("filter_by", "")
                sort_by = request.GET.get("sort_by", "")

                objs = django_models.ResultList.objects.all()
                if search:
                    objs = objs.filter(title__contains=search, description__contains=search)
                    # objs[0].is_done()

                match filter_by:
                    case "pay (true)":
                        objs = objs.filter(is_pay=True)
                    case "pay (false)":
                        objs = objs.filter(is_pay=False)
                    case "":
                        pass
                    case _:
                        pass

                match sort_by:
                    case "date (asc)":
                        objs = objs.order_by('-updated')
                    case "date (desc)":
                        objs = objs.order_by('updated')
                    case "name (desc)":
                        objs = objs.order_by('title')
                    case "name (asc)":
                        objs = objs.order_by('-title')
                    case "":
                        pass
                    case _:
                        pass

                objs = django_utils.DjangoClass.PaginationClass.paginate(
                    page_number=page, object_list=objs, limit_per_page=limit
                )
                # TODO написать класс-конструктор для создания сериализатора "на лету"
                response = django_serializers.ResultListSerializer(objs, many=True).data
                # TODO Успешный ответ сервера "HTTP_200_OK"
                return Response(data={"response": response}, status=status.HTTP_200_OK)
            elif method == "POST":
                # {"title": "Новая 2", "description": "нов"}
                title = request.data.get("title", None)
                description = request.data.get("description", None)
                if title is None:
                    return Response(data={"error": "Not have any data"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    django_models.ResultList.objects.create(title=title, description=description)
                    return Response(data={"response": "Successfully create"}, status=status.HTTP_201_CREATED)

        # TODO Возврат ошибки сервера "HTTP_405_METHOD_NOT_ALLOWED" при несовпадении метода и/или действия
        return Response(data={"error": "METHOD_NOT_ALLOWED"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    # TODO Поимка исключений и возврат ошибки сервера "HTTP_400_BAD_REQUEST" с описанием ошибки
    except Exception as error:
        # TODO Логирование ошибок
        # TODO
        if settings.DEBUG:
            print(f"error {error}")
        return Response(data={"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=http_method_names)
def user_f(request: HttpRequest, pk=0) -> Response:
    try:
        time.sleep(round(random.uniform(1.0, 2.5), 2))

        if pk:
            if request.method == "GET":
                obj = User.objects.get(id=pk)
                response = django_serializers.UserSerializer(obj, many=False).data
                return Response(data={"response": {"result": response}}, status=status.HTTP_200_OK)
                # return JsonResponse(data={"response:": "Успешно"}, safe=True)  # TODO
        else:
            if request.method == "GET":
                obj = User.objects.get(id=pk)
                response = django_serializers.UserSerializer(obj, many=False).data
                return Response(data={"response": {"result": response}}, status=status.HTTP_200_OK)
            if request.method == "POST":
                # {"username": "user12346", "password": "qwertY!212",
                #  "last_name": "UserSurname", "first_name": "UserName", "patronymic": "UserPatr"}
                username = request.data.get("username", "")
                password = request.data.get("password", "")
                last_name = request.data.get("last_name", "")
                first_name = request.data.get("first_name", "")
                patronymic = request.data.get("patronymic", "")
                user = User.objects.create(
                    username=username,
                    password=make_password(password)
                )
                django_models.UserModel.objects.create(
                    user=user,
                    last_name=last_name,
                    first_name=first_name,
                    patronymic=patronymic,
                )
                return Response(data={"response:": "Успешно"}, status=status.HTTP_201_CREATED)

                print(request)
                print(request.data)  # TODO data
                print(request.POST)
                print(request.FILES)
                print(request.GET)

                # php => должен отвечать на запросы по ip+port: 192.168.101.200:8001
                # response = request.get('192.168.101.200:8001/algoritm')
                # response = request.post()

                # all = {
                #     "1": {"1_1"},
                #     "2": {"1_2": {"12": None}},
                #     "3": {"1_1"},
                # }
                # all["2"]["1_2"]["12"]

                action = request.GET.get("action", '_')
                if action == "setAvatar":
                    image = request.data.get("image", None)
                    print(image)
                    todo = django_models.Todo.objects.create(
                        title="11111111",
                        description="2222222222",
                        avatar=image,
                    )
                    path = todo.avatar
                    print(type(image))
                    print(type(image.read()))
                    print(image.read())
                    print(str(image))
                    print(image)
                    print(str(image.read()))
                    print(len(str(image.read())))

                    # with open('static/image3.jpg', 'wb') as file:
                    #     file.write()

                    print('image image ты где')
                    return Response(data={"response": "Successful"}, status=status.HTTP_201_CREATED)
                else:
                    username = request.data.get("username", "")
                    password = request.data.get("password", "")
                    print(username, password)
                    return Response(data={"response": "Successful"}, status=status.HTTP_201_CREATED)
        return Response(data={"error": "METHOD_NOT_ALLOWED"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as error:
        if settings.DEBUG:
            print(f"error {error}")
        return Response(data={"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=http_method_names)
# @permission_classes([IsAdminUser])
# @permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def get_all_users(request: HttpRequest) -> Response:
    time.sleep(round(random.uniform(1.0, 2.5), 2))

    user = request.user
    print(user, type(user))
    if request.user.is_superuser is False:
        return Response(data={"response": "FORBIDDEN"}, status=status.HTTP_403_FORBIDDEN)

    token = request.META.get("HTTP_AUTHORIZATION", "Bearer _").split('Bearer')[1].strip()
    print("token:", token)

    if request.method == "GET":
        obj = User.objects.all()
        response = django_serializers.UserSerializer(obj, many=True).data
        return Response(data={"response": {"result": response}}, status=status.HTTP_200_OK)
