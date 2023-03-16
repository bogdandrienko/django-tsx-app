from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.cache import caches
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.shortcuts import render
from django.views import View
from django.db import connection, transaction

import re
import time
from django.views.decorators.cache import cache_page
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from rest_framework import status, serializers
from rest_framework.response import Response

LocMemCache = caches["default"]
DatabaseCache = caches["special"]


# RedisCache = caches["extra"]


class HomeViewC(View):
    template_name = 'django_app/home.html'

    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        context = {"todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)]}
        return render(request=request, template_name='django_app/home.html', context=context)


@cache_page(timeout=1)
def http_str_response_f(request: HttpRequest, pk=0) -> HttpResponse:
    context = {"todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)]}
    return render(request=request, template_name='django_app/home.html', context=context)


@cache_page(timeout=5)
def http_response_f(request: HttpRequest, pk=0) -> HttpResponse:
    todos = {"todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)]}
    context = "<ol> "
    for todo in todos["todos"]:
        context += f'<li>{todo["id"]} {todo["title"]} {todo["value"]}</li>'
    context += " </ol>"
    return HttpResponse(context=context)


def json_response_f(request: HttpRequest, pk=0) -> JsonResponse:
    context = {"todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)]}
    return JsonResponse(data={"response:": context}, safe=False)


def drf_response_f(request: HttpRequest, pk=0) -> Response:
    context = {"todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)]}
    return Response(data={"response": context}, status=status.HTTP_200_OK)


@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"])
@permission_classes([AllowAny])  # IsAuthenticated IsAdminUser
def drf_full_response_f(request: HttpRequest, pk=0) -> Response:
    try:
        if request.user.is_superuser is False:
            return Response(data={"response": "FORBIDDEN"}, status=status.HTTP_403_FORBIDDEN)

        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = '__all__'  # ['id', 'username', 'email']

        if pk:
            if request.method == "GET":
                obj = User.objects.get(id=pk)
                obj = UserSerializer(obj, many=False).data
                return Response(data={"response": obj}, status=status.HTTP_200_OK)
            elif request.method == "PUT" or request.method == "PATCH":
                # {"username": "user12346", "password": "qwertY!212"}
                username = request.data.get("username", None)
                password = request.data.get("password", None)
                obj = User.objects.get(id=pk)
                if username is not None and obj.username != username:
                    obj.username = username
                if password is not None and obj.password != password:
                    obj.password = make_password(password)
                obj.save()
                return Response(data={"response:": "Successfully updated"}, status=status.HTTP_200_OK)
            elif request.method == "PUT" or request.method == "PATCH":
                User.objects.get(id=pk).delete()
                return Response(data={"response:": "Successfully deleted"}, status=status.HTTP_200_OK)
        else:
            if request.method == "GET":
                # ?page=1&limit=10&sort_by=name%20(asc)&filter_by=pay%20(true)&search=95
                page = request.GET.get("page", 1)
                limit = request.GET.get("limit", 10)
                search = request.GET.get("search", "")
                filter_by = request.GET.get("filter_by", "")
                sort_by = request.GET.get("sort_by", "")

                objs = User.objects.all()
                if search:
                    objs = objs.filter(title__contains=search, email__contains=search)
                    # objs[0].is_done()

                match filter_by:
                    case "active (true)":
                        objs = objs.filter(is_active=True)
                    case "active (false)":
                        objs = objs.filter(is_active=False)
                    case "":
                        pass
                    case _:
                        pass

                match sort_by:
                    case "date joined (asc)":
                        objs = objs.order_by('-date_joined')
                    case "date joined (desc)":
                        objs = objs.order_by('date_joined')
                    case "username (desc)":
                        objs = objs.order_by('username')
                    case "username (asc)":
                        objs = objs.order_by('-username')
                    case "":
                        pass
                    case _:
                        pass

                def paginate(page_number: int, object_list: any, limit_per_page: int) -> any:
                    paginator = Paginator(object_list, limit_per_page)
                    try:
                        page_instance = paginator.page(int(page_number))
                    except PageNotAnInteger:
                        page_instance = paginator.page(1)
                    except EmptyPage:
                        page_instance = paginator.page(paginator.num_pages)
                    return page_instance

                objs = paginate(page_number=page, object_list=objs, limit_per_page=limit)
                objs = UserSerializer(objs, many=True).data
                return Response(data={"response": objs}, status=status.HTTP_200_OK)
            elif request.method == "POST":
                # {"username": "user12346", "password": "qwertY!212"}
                username = request.data.get("username", "")
                password = request.data.get("password", "")
                if username and password:
                    if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password):
                        User.objects.create(username=username, password=make_password(password))
                        return Response(data={"response:": "Successfully created"}, status=status.HTTP_201_CREATED)
                    else:
                        return Response(data={"error:": "Password invalid"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(data={"error:": "Data not fulled"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"error": "METHOD_NOT_ALLOWED"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as error:
        if settings.DEBUG:
            print(f"error: {error}")
        return Response(data={"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)


def cache_f(request: HttpRequest, pk=0) -> JsonResponse:
    users_list = LocMemCache.get("cache_f users_list")
    if users_list is None:
        users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
        LocMemCache.set("cache_f users_list", users_list, timeout=30)

    print("cache_f users_list: ", users_list)
    return JsonResponse(data=users_list, safe=False)


@transaction.non_atomic_requests()  # @transaction.atomic()
def transaction_f(request: HttpRequest, pk=0) -> JsonResponse:
    is_transaction = False

    if is_transaction:
        try:
            transaction.savepoint('create user savepoint')
            User.objects.create(username="Admin")
            print(1 / 0)  # error
        except Exception as error:
            print(error)
            transaction.savepoint_rollback('create user savepoint')
            # transaction.rollback()
        else:
            transaction.savepoint_commit('create user savepoint')
            # transaction.commit()
        finally:
            pass
    else:
        connection.autocommit = False
        cursor = connection.cursor()

        try:
            connection.autocommit = False
            cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan5', '666');")
            print(10 / 0)
        except Exception as error:
            print(f"error: {error}")
            connection.rollback()
        else:
            connection.commit()
        finally:
            connection.close()
            cursor.close()

    users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
    return JsonResponse(data=users_list, safe=False)


def psycopg2_f():
    # print(pyodbc.connect('DRIVER=MyOracle;DBQ=172.28.254.215:1521/PITENEW;UID=DISPATCHER;PWD=disp'))

    # import pyodbc
    # print(pyodbc.drivers())
    # cnxn = pyodbc.connect(
    #     'DRIVER={Devart ODBC Driver for Oracle};Direct=True;Host=172.28.254.215;Port=1521;'
    #     'Service Name=PITENEW;User ID=DISPATCHER;Password=disp'
    # )
    # connection = pyodbc.connect('Driver={Oracle in OraClient11g_home1};DBQ=pacfin;Uid=uid;Pwd=pw')

    # cnxn = pyodbc.connect(
    #     'DRIVER={SQL Server};Direct=True;Host=172.28.254.215;Port=1521;'
    #     'Service Name=PITENEW;User ID=DISPATCHER;Password=disp'
    # )
    # cursor = cnxn.cursor()
    # cursor.execute("SELECT * FROM DISPATCHER.AUXDRIVERS")
    # rows = cursor.fetchall()
    # print(f"rows: {rows}")

    # import cx_Oracle
    # connection = cx_Oracle.connect(
    #     'DISPATCHER',
    #     'disp',
    #     '172.28.254.215:1521/PITENEW',
    # )
    # print(connection.version)
    # cursor = connection.cursor()
    # cursor.execute("SELECT * FROM DISPATCHER.AUXDRIVERS")
    # rows = cursor.fetchall()
    # print(f"rows: {rows}")

    pg_connection = psycopg2.connect(
        user="postgres", password="12345Qwerty!", host="127.0.0.1", port="5432", database="django_database"
    )
    pg_cursor = pg_connection.cursor()
    is_select = True

    if is_select:
        try:
            pg_cursor.execute("select * from zarplata;")
            result = pg_cursor.fetchall()
            print(f"result: {result}")
        except Exception as error:
            print(f"error: {error}")
        finally:
            pg_connection.close()
            pg_cursor.close()
    else:
        try:
            pg_connection.autocommit = False
            pg_cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan5', '666');")
            result = pg_cursor.fetchall()
            print(f"result: {result}")
        except Exception as error:
            print(f"error: {error}")
            pg_connection.rollback()
        else:
            pg_connection.commit()
        finally:
            pg_connection.close()
            pg_cursor.close()
