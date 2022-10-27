from django.contrib import admin
from django.urls import path, include, re_path
from django_app import views

# app_name = 'django_app'
urlpatterns = [
    path('', views.index, name="home"),

    re_path(r'^api/user/$', views.user, name='user'),  # GET(all) / POST
    re_path(r'^api/user/(?P<pk>\d+)/$', views.user, name='user_pk'),  # GET(one) / PUT (PATCH) / DELETE


    # re_path(r'^captcha/$', views.captcha, name='captcha'),
    # re_path(r'^login/$', views.login, name='login'),

    # re_path(r'^login/$', views.django_login, name='login'),
    # re_path(r'^logout/$', views.django_logout, name='logout'),

    # re_path(r'^receipt/(?P<receipt_id>\d+)/$', views.receipt, name='receipt_id'),  # GET(one) / PUT (PUTCH) / DELETE
    # re_path(r'^receipt/$', views.receipt, name='receipt'),  # GET(all) / POST
]

