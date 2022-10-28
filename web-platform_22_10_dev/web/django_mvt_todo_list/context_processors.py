from django.contrib.auth.models import User
from django_mvt_todo_list import models


def todo_count(request):
    try:
        count = models.Todo.objects.all().count()
    except Exception as error:
        count = 0
        print(f"context_processors.py todo_count {error}")

    return dict(todo_count=count)
