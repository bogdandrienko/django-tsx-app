from django.urls import path, re_path
from django_drf_todo_list import views


urlpatterns = [
    path('', views.home, name=''),
    path('index/', views.home, name='index'),
    path('home/', views.home, name='home'),

    re_path(r'^api/todo/(?P<pk>\d+)/$', views.todo, name='todo_pk'),  # GET(one) / PUT (PATCH) / DELETE
    re_path(r'^api/todo/$', views.todo, name='todo'),  # GET(all) / POST
]
