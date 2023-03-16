from django.urls import path, re_path
from django_app import views

app_name = "django_app"
urlpatterns = [
    path("", views.predictive_f, name=""),

    path("vehtrips/status/", views.vehtrips_status_f),
    # path("index/", views.index_f, name="index"),
    # path("home/", views.index_f, name="home"),
    # re_path(r"^user/captcha/$", views.captcha_f, name="captcha"),
    # re_path(r"^user/token/$", views.token_f, name="token"),
    # re_path(r"^user/detail/$", views.detail_f, name="token"),
    # re_path(r"^report/(?P<pk>\d+)/$", views.report_f, name="report_pk"),
    # re_path(r"^report/$", views.report_f, name="report"),
    # re_path(r"^todo/(?P<pk>\d+)/$", views.todo_f, name="todo_pk"),
    # re_path(r"^todo/$", views.todo_f, name="todo"),
]
