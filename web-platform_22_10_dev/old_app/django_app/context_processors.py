from django.contrib.auth.models import User

def task_count(request):
    try:
        count = models.Task.objects.all().count()
    except Exception as error:
        count = 0
        print(f"context_processors.py task_count {error}")

    return dict(task_count=count)


def get_users_count(request):
    return {"user_count": User.objects.all().count()}
