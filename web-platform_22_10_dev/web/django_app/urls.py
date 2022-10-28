from django.contrib import admin
from django.urls import path, include, re_path
from django_app import views

# app_name = 'django_app'
urlpatterns = [
    path('', views.index, name=''),
    path('index/', views.index, name='index'),
    path('home/', views.index, name='home'),

    # path('task_mvt/', views.task_mvt_home, name='task_mvt_home'),
    # path('task_mvt/list/', views.task_mvt_home, name='task_mvt_read_list'),
    # path('task_mvt/create/', views.task_mvt_home, name='task_mvt_create'),
    # path('task_mvt/<int:task_id>/', views.task_mvt_home, name='task_mvt_read'),
    # path('task_mvt/<int:task_id>/update/', views.task_mvt_home, name='task_mvt_update'),
    # path('task_mvt/<int:task_id>/delete/', views.task_mvt_home, name='task_mvt_delete'),

    # re_path(r'^api/user/$', views.user, name='user'),  # GET(all) / POST
    # re_path(r'^api/user/(?P<pk>\d+)/$', views.user, name='user_pk'),  # GET(one) / PUT (PATCH) / DELETE


    # re_path(r'^captcha/$', views.captcha, name='captcha'),
    # re_path(r'^login/$', views.login, name='login'),

    # re_path(r'^login/$', views.django_login, name='login'),
    # re_path(r'^logout/$', views.django_logout, name='logout'),

    # re_path(r'^receipt/(?P<receipt_id>\d+)/$', views.receipt, name='receipt_id'),  # GET(one) / PUT (PUTCH) / DELETE
    # re_path(r'^receipt/$', views.receipt, name='receipt'),  # GET(all) / POST

    # path('idea_create/', views.idea_create, name='django_idea_create'),
    # path('idea_change/<int:idea_int>/', views.idea_change, name='django_idea_change'),
    # path('idea_list/', views.idea_list, name='django_idea_list'),
    # path('idea_list/<slug:category_slug>/', views.idea_list, name='django_idea_list'),
    # path('idea_change_visibility/<int:idea_int>/', views.idea_change_visibility, name='django_idea_change_visibility'),
    # path('idea_view/<int:idea_int>/', views.idea_view, name='django_idea_view'),
    # path('idea_like/<int:idea_int>/', views.idea_like, name='django_idea_like'),
    # path('idea_comment/<int:idea_int>/', views.idea_comment, name='django_idea_comment'),
    # path('idea_rating/', views.idea_rating, name='django_idea_rating'),
]

