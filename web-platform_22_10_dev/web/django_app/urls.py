from django.urls import path, re_path
from django_app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'django_app'
urlpatterns = [
    re_path(r'^token_jwt/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^token_jwt/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),

    re_path(r'^get_all_users/$', views.get_all_users, name='get_all_users'),

    path('', views.index_f, name=''),
    path('index/', views.index_f, name='index'),
    path('home/', views.index_f, name='home'),

    re_path(r'^captcha/$', views.captcha_f, name='captcha'),
    re_path(r'^token/$', views.token_f, name='token'),

    re_path(r'^todo/(?P<pk>\d+)/$', views.todo_f, name='todo_pk'),
    re_path(r'^todo/$', views.todo_f, name='todo'),

    re_path(r'^result/(?P<pk>\d+)/$', views.result_f, name='result_pk'),
    re_path(r'^result/$', views.result_f, name='result'),

    re_path(r'^report/(?P<pk>\d+)/$', views.report_f, name='report_pk'),
    re_path(r'^report/$', views.report_f, name='report'),

    re_path(r'^user/(?P<pk>\d+)/$', views.user_f, name='user_pk'),
    re_path(r'^user/$', views.user_f, name='user'),

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

