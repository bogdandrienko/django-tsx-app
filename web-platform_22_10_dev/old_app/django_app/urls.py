from django.contrib import admin
from django.urls import path, include, re_path
from django_app import views

#app_name = 'app_name_task_list'
urlpatterns = [
    path('', views.index, name="index"),

    re_path(route=r'^users/$', view=views.users, name="users"),

    re_path(route=r'^chat/(?P<sms_id>\d+)/$', view=views.chat, name="chat_id"),
    re_path(route=r'^chat/$', view=views.chat, name="chat"),
    path('index/', views.index, name='index'),
    path('', views.home, name=''),
    path('home/', views.home, name='home'),

    path('task/create/', views.create, name='create'),
    path('task/<int:task_id>/', views.read, name='read'),
    path('task/list/', views.read_list, name='read_list'),
    path('task/<int:task_id>/update/', views.update, name='update'),
    re_path(r'^task/(?P<task_id>\d+)/delete/$', views.delete, name='delete'),
]

