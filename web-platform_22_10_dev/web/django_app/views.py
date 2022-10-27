import re

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import HttpRequest
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from django_app import models as django_models, serializers as django_serializers, utils as django_utils

http_method_names = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]


# Create your views here.

def index(request):
    try:
        context = {}
        return render(request, "build/index.html", context=context)
    except Exception as error:
        if settings.DEBUG:
            print(f"error {error}")
        return django_utils.DjangoClass.DRFClass.RequestClass.return_global_error(request=request, error=error)


class Django:
    @staticmethod
    def request(_api_view=True, _http_method_names=None, _permission_classes=None):
        if _http_method_names is None:
            _http_method_names = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
        if _permission_classes is None:
            _permission_classes = [AllowAny]  # AllowAny, IsAuthenticated, IsAdminUser

        def decorator(func):
            @api_view(http_method_names=_http_method_names)
            @permission_classes(_permission_classes)
            # @authentication_classes([BasicAuthentication])
            def wrapper(*args, **kwargs):
                request = args[0]
                req_inst = django_utils.DjangoClass.TemplateClass.request(request=request)
                args = list(args)
                args.insert(1, req_inst)  # args.append(req_inst)
                args = tuple(args)

                result = None
                try:
                    result = func(*args, **kwargs)  # вызов контроллер-функции
                    django_utils.DjangoClass.TemplateClass.response(request=request,
                                                                    response=result.data)  # логирование действия
                except Exception as error:  # ловля исключение в контроллер-функции
                    django_utils.DjangoClass.LoggingClass.error(request=request, error=error)  # логирование ошибки
                    result = Response(data={"error": req_inst.action_type_error(error)},
                                      status=status.HTTP_400_BAD_REQUEST)  # формирование ошибки
                finally:
                    return result  # возврат результата работы функции

            return wrapper  # возврат декоратора

        return decorator  # возврат конструктора декоратора


@Django.request()
def user(request: HttpRequest, django_request: django_utils.DjangoClass.DRFClass.RequestClass, pk=0) -> Response:
    if pk:
        if django_request.method == "GET":
            # TODO get one user
            user = User.objects.get(id=pk)
            response = django_serializers.UserSerializer(user, many=False).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif django_request.method == "PUT" or django_request.method == "PATCH":
            # TODO update user
            password = django_request.get_value(key="username", default='')
            user = User.objects.get(id=pk)
            user.set_password(password)
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
        elif django_request.method == "PUT" or django_request.method == "PATCH":
            # TODO delete user
            user = User.objects.get(id=pk)
            user.delete()
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
    else:
        if django_request.method == "GET":
            # TODO get all users
            users = User.objects.all()
            response = django_serializers.UserSerializer(users, many=True).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif django_request.method == "POST":
            # TODO create user
            username = django_request.get_value(key="username", default='')
            password = django_request.get_value(key="username", default='')
            if username and password:
                if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password) and \
                        re.match(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", username):
                    User.objects.create(
                        username=username,
                        password=make_password(password)
                    )
                    return Response(data={"response:": "Успешно"}, status=status.HTTP_201_CREATED)
                else:
                    return Response(data={"error:": "Вы не прошли проверку регулярного выражения"},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(data={"error:": "Данные не заполнены"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={"error": django_request.not_allowed_method()}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(http_method_names=http_method_names)
@permission_classes([AllowAny])
def registration(request):
    if request.method == "GET":
        return Response(data={"ответ:": r'(POST){"email": "admin@gmail.com", "password": "12345qwe!Brty"} '
                                        '=> <Response 201>'},
                        status=status.HTTP_200_OK)
    elif request.method == "POST":
        try:
            email = request.data.get("email", None)
            password = request.data.get("password", None)
            if email and password:
                if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password) and \
                        re.match(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", email):
                    User.objects.create(
                        username=email,
                        email=email,
                        password=make_password(password)  # для create НУЖНО шифровать пароль, для create_user НЕТ!
                    )
                    return Response(status=status.HTTP_201_CREATED)
                else:
                    return Response(data={"ответ:": "Вы не прошли проверку регулярного выражения"},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response(data=str(error), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            data={"response": "метод не реализован"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
