from django.urls import path, re_path
from django_app import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "django_app"
urlpatterns = [
    re_path(r"^token_jwt/$", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    re_path(r"^token_jwt/refresh/$", TokenRefreshView.as_view(), name="token_refresh"),
    path("", views.index_f, name=""),
    path("index/", views.index_f, name="index"),
    path("home/", views.index_f, name="home"),
    re_path(r"^user/captcha/$", views.captcha_f, name="captcha"),
    re_path(r"^user/token/$", views.token_f, name="token"),
    re_path(r"^user/detail/$", views.detail_f, name="token"),
    re_path(r"^report/(?P<pk>\d+)/$", views.report_f, name="report_pk"),
    re_path(r"^report/$", views.report_f, name="report"),
    re_path(r"^todo/(?P<pk>\d+)/$", views.todo_f, name="todo_pk"),
    re_path(r"^todo/$", views.todo_f, name="todo"),
]
