import re
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from django_drf_todo_list import serializers
from django_drf_todo_list import models


# Create your views here.

@api_view(http_method_names=["GET"])
@permission_classes([AllowAny])
# @authentication_classes([BasicAuthentication])
def home(request: HttpRequest) -> Response:
    response = {"response": [
        {
            'name': '''home''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/''',
            'methods': 'GET',
            'description': 'all routes at app',
            'help': '''...''',
            'code': '''...'''
        },
        {
            'name': '''create''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/api/todo/''',
            'methods': 'POST',
            'description': 'create new todo',
            'help': '''...''',
            'code': '''{"title":"111111111111", "description":"22222222222222"}'''
        },
        {
            'name': '''read''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/api/todo/$pk$/''',
            'methods': 'GET',
            'description': 'read todo',
            'help': '''...''',
            'code': '''...'''
        },
        {
            'name': '''read all''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/api/todo/''',
            'methods': 'GET',
            'description': 'read all todos',
            'help': '''...''',
            'code': '''...'''
        },
        {
            'name': '''update''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/api/todo/$pk$/''',
            'methods': 'PUT, PATCH',
            'description': 'update todo',
            'help': '''...''',
            'code': '''...'''
        },
        {
            'name': '''delete''',
            'endpoint': '''$BASEPATH$/django_drf_todo_list/api/todo/$pk$/''',
            'methods': 'DELETE',
            'description': 'delete todo',
            'help': '''...''',
            'code': '''...'''
        },
    ]}
    # return HttpResponse("12345")
    # return JsonResponse(data={"response": response}, safe=True)
    return Response(data={"response": response}, status=status.HTTP_200_OK)


@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE"])
@permission_classes([AllowAny])
def todo(request: HttpRequest, pk=0) -> Response:
    if pk:
        if request.method == "GET":
            todo_obj = models.Todo.objects.get(id=pk)
            response = serializers.TodoSerializer(todo_obj, many=False).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif request.method == "PUT" or request.method == "PATCH":
            title = request.data["title"]
            description = request.data["description"]
            todo_obj = models.Todo.objects.get(id=pk)
            if todo_obj.title != title:
                todo_obj.title = title
            if todo_obj.description != description:
                todo_obj.description = description
            todo_obj.save()
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
        elif request.method == "DELETE":
            todo_obj = models.Todo.objects.get(id=pk)
            todo_obj.delete()
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
    else:
        if request.method == "GET":
            todos_obj = models.Todo.objects.all()
            response = serializers.TodoSerializer(todos_obj, many=True).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif request.method == "POST":
            title = request.data["title"]
            description = request.data["description"]
            if title and description:
                models.Todo.objects.create(
                    title=title,
                    description=description
                )
                return Response(data={"response:": "Успешно"}, status=status.HTTP_201_CREATED)
            else:
                return Response(data={"error:": "Данные не заполнены"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={"error": "METHOD_NOT_ALLOWED"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
