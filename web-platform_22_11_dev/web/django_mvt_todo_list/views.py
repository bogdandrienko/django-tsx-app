from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django_mvt_todo_list import models


# Create your views here.

def home(request: HttpRequest) -> HttpResponse:
    context = {"response": "<h1>This is a Index Page</h1>"}
    # return HttpResponse(context["response"])
    # return JsonResponse(data=context, safe=True)
    return render(request, 'django_mvt_todo_list/pages/todo_home.html', context)


def create(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        models.Todo.objects.create(
            title=title,
            description=description,
            is_completed=False,
        )
        return redirect(reverse('django_mvt_todo_list:read_list', args=()))
    context = {
    }
    return render(request, 'django_mvt_todo_list/pages/todo_create.html', context)


def read(request: HttpRequest, pk=0) -> HttpResponse:
    todo = models.Todo.objects.get(id=pk)
    context = {
        "todo": todo
    }
    return render(request, 'django_mvt_todo_list/pages/todo_detail.html', context)


def read_list(request: HttpRequest) -> HttpResponse:
    is_detail_view = request.GET.get("is_detail_view", True)
    if is_detail_view == "False":
        is_detail_view = False
    elif is_detail_view == "True":
        is_detail_view = True
    todo_list = models.Todo.objects.all()

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

    page = paginate(objects=todo_list, num_page=4)
    context = {
        "page": page,
        "is_detail_view": is_detail_view
    }
    return render(request, 'django_mvt_todo_list/pages/todo_list.html', context)


def update(request: HttpRequest, pk=0) -> HttpResponse:
    if request.method == 'POST':
        todo = models.Todo.objects.get(id=pk)
        is_completed = request.POST.get("is_completed", "")
        title = request.POST.get("title", "")
        description = request.POST.get("description", "")
        if is_completed:
            if is_completed == "False":
                todo.is_completed = False
            elif is_completed == "True":
                todo.is_completed = True
        if title and title != todo.title:
            todo.title = title
        if description and description != todo.description:
            todo.description = description
        todo.updated = timezone.now()
        todo.save()
        return redirect(reverse('django_mvt_todo_list:read_list', args=()))
    todo = models.Todo.objects.get(id=pk)
    context = {
        "todo": todo
    }
    return render(request, 'django_mvt_todo_list/pages/todo_change.html', context)


def delete(request: HttpRequest, pk=0) -> HttpResponse:
    models.Todo.objects.get(id=pk).delete()
    return redirect(reverse('django_mvt_todo_list:read_list', args=()))
