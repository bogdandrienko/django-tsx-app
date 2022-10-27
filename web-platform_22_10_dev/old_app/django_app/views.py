from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User, Group

from django.views.decorators.cache import cache_page
from django.core.cache import caches
from django.db import connection, transaction

LocMemCache = caches["default"]
DatabaseCache = caches["special"]
# RedisCache = caches["extra"]


# @transaction.atomic()
@transaction.non_atomic_requests()
def index(request):

    try:
        transaction.savepoint('create user')
        User.objects.create(username="Admin")
        print(1 / 0)  # error
    except Exception as error:
        print(error)
        transaction.savepoint_rollback('create user')
        # transaction.rollback()
    else:
        transaction.savepoint_commit('create user')
        # transaction.commit()
    finally:
        pass

    connection.autocommit = False
    cursor = connection.cursor()

    try:
        connection.autocommit = False
        cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan5', '666');")
        # cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan', '666');")

        # print(10 / 0)
        # connection.commit()
    except Exception as error:
        print(f"ERROR: {error}")
        connection.rollback()
    else:
        pass
    finally:
        connection.close()
        cursor.close()

    users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
    return JsonResponse(data=users_list, safe=False)


def home(request):
    return "<h1>Home Page</h1>"


# @cache_page(120)
def users(request):
    # old: 60 sec = 1000 users = 1000 BAD REQUEST | timeout=30
    # new: 60 sec = 1000 users = 2 BAD REQUEST | timeout=30

    print("\n\n\n\n\n**********************\n\n\n\n")
    users_list = LocMemCache.get("users")
    if users_list is None:
        # BAD ! COMPUTE request ! BAD
        users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
        # BAD ! COMPUTE request ! BAD
        print('BAD ! COMPUTE request ! BAD')
        LocMemCache.set("users", users_list, timeout=30)  # set cache

    print("cache users: ", users_list)
    # print(users_list)

    return JsonResponse(data=users_list, safe=False)

def con():
    import psycopg2

    connection = psycopg2.connect(user="postgres",
                                  password="31284bogdan",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="django_database")
    cursor = connection.cursor()

    try:
        connection.autocommit = False
        cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan5', '666');")
        # cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan', '666');")

        # print(10 / 0)
        # connection.commit()
    except Exception as error:
        print(f"ERROR: {error}")
        connection.rollback()
    else:
        pass
    finally:
        connection.close()
        cursor.close()


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_app import models
from django_app import serializers


def index(request):
    return JsonResponse({"response": "Ok!"})


def users(request):
    return JsonResponse({"response": "Ok!"})


@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
def chat(request, sms_id=None):
    try:
        if sms_id:
            if request.method == "GET":
                return Response(status=status.HTTP_200_OK)
            elif request.method == "PUT" or request.method == "PATCH":
                return Response(status=status.HTTP_200_OK)
            elif request.method == "DELETE":
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            if request.method == "GET":
                page = int(request.GET.get("page", 1))
                limit = int(request.GET.get("limit", 3))

                obj_list = models.TextModel.objects.all()
                paginator_obj = Paginator(object_list=obj_list, per_page=limit)
                current_page = paginator_obj.get_page(page).object_list
                serialized_obj_list = serializers.TextModelSerializer(instance=current_page, many=True).data

                return Response(data={"list": serialized_obj_list, "x-total-count": len(obj_list)},
                                status=status.HTTP_200_OK)
            elif request.method == "POST":
                text = int(request.GET.get("text", ""))
                if text:
                    models.TextModel.objects.create(
                        text=text
                    )
                    return Response(status=status.HTTP_201_CREATED)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User, Group

from django.views.decorators.cache import cache_page
from django.core.cache import caches
from django.db import connection, transaction

from django_app import celery as current_celery
from celery.result import AsyncResult
from django_settings.celery import app as celery_app

LocMemCache = caches["default"]
DatabaseCache = caches["special"]


# RedisCache = caches["extra"]


# @transaction.atomic()
@transaction.non_atomic_requests()
def index(request):
    try:
        transaction.savepoint('create user')
        User.objects.create(username="Admin")
        print(1 / 0)  # error
    except Exception as error:
        print(error)
        transaction.savepoint_rollback('create user')
        # transaction.rollback()
    else:
        transaction.savepoint_commit('create user')
        # transaction.commit()
    finally:
        pass

    connection.autocommit = False
    cursor = connection.cursor()

    try:
        connection.autocommit = False
        cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan5', '666');")
        # cursor.execute("insert into zarplata (username, salary) VALUES ('Bogdan', '666');")

        # print(10 / 0)
        # connection.commit()
    except Exception as error:
        print(f"ERROR: {error}")
        connection.rollback()
    else:
        pass
    finally:
        connection.close()
        cursor.close()

    users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
    return JsonResponse(data=users_list, safe=False)


def home(request):

    task_id = current_celery.send_mass_email.apply_async([1, 2, 3], {}, skip_error=True, countdown=20)  #
    old_task_id = "33779111-0f42-4a96-bdec-d5643e57a018"

    result = AsyncResult(old_task_id, app=celery_app)
    # print()

    if result.state != "PENDING":
        result = f"status: {result.state} | result: {result.get()}"
    else:
        result = f"status: {result.state} | result: {None}"
    print(result)

    return JsonResponse(data=f"<h1>task_id: {task_id} | {result}</h1>", safe=False)


# @cache_page(120)
def users(request):
    # old: 60 sec = 1000 users = 1000 BAD REQUEST | timeout=30
    # new: 60 sec = 1000 users = 2 BAD REQUEST | timeout=30

    print("\n\n\n\n\n**********************\n\n\n\n")
    users_list = LocMemCache.get("users")
    if users_list is None:
        # BAD ! COMPUTE request ! BAD
        users_list = [{"username": f"{user.username}", "email": f"{user.email}"} for user in User.objects.all()]
        # BAD ! COMPUTE request ! BAD
        print('BAD ! COMPUTE request ! BAD')
        LocMemCache.set("users", users_list, timeout=30)  # set cache

    print("cache users: ", users_list)
    # print(users_list)

    return JsonResponse(data=users_list, safe=False)

class HomeView(View):
    template_name = 'django_app/home.html'

    def get(self, request, *args, **kwargs):
        context = {
            "todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)],
        }
        return render(request=request, template_name='django_app/home.html', context=context)

def home(request):
    context = {
        "todos": [{"id": x, "title": f"title ({x})", "value": 18.978 * x} for x in range(1, 100)],
    }
    return render(request=request, template_name='django_app/home.html', context=context)


def login(request):
    context = {
    }
    return render(request=request, template_name='django_app/home.html', context=context)

def index(request):
    return HttpResponse("<h1>This is a Index Page</h1>")


def home(request):
    context = {
    }
    return render(request, 'pages/home.html', context)


def create(request):
    if request.method == 'POST':
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        models.Task.objects.create(
            title=title,
            description=description,
            is_completed=False,
        )
        return redirect(reverse('app_name_task_list:read_list', args=()))
    context = {
    }
    return render(request, 'app_task_list/pages/task_create.html', context)


def read(request, task_id=None):
    task = models.Task.objects.get(id=task_id)
    context = {
        "task": task
    }
    return render(request, 'app_task_list/pages/task_detail.html', context)


def read_list(request):

    is_detail_view = request.GET.get("is_detail_view", True)
    if is_detail_view == "False":
        is_detail_view = False
    elif is_detail_view == "True":
        is_detail_view = True
    task_list = models.Task.objects.all()

    def paginate(objects, num_page):
        paginator = Paginator(objects, num_page)
        pages = request.GET.get('page')
        try:
            local_page = paginator.page(pages)
        except PageNotAnInteger:
            local_page = paginator.page(1)
        except EmptyPage:
            local_page = paginator.page(paginator.num_pages)
        return local_page

    page = paginate(objects=task_list, num_page=4)
    context = {
        "page": page,
        "is_detail_view": is_detail_view
    }
    return render(request, 'app_task_list/pages/task_list.html', context)


def update(request, task_id=None):
    if request.method == 'POST':
        task = models.Task.objects.get(id=task_id)
        is_completed = request.POST.get("is_completed", "")
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        if is_completed:
            if is_completed == "False":
                task.is_completed = False
            elif is_completed == "True":
                task.is_completed = True
        if title and title != task.title:
            task.title = title
        if description and description != task.description:
            task.description = description
        task.updated = timezone.now()
        task.save()
        return redirect(reverse('app_name_task_list:read_list', args=()))
    task = models.Task.objects.get(id=task_id)
    context = {
        "task": task
    }
    return render(request, 'app_task_list/pages/task_change.html', context)


def delete(request, task_id=None):
    models.Task.objects.get(id=task_id).delete()
    return redirect(reverse('app_name_task_list:read_list', args=()))
