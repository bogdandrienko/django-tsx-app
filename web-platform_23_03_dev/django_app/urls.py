from django.urls import re_path, path
from django_app import views


urlpatterns = [
    path("dumptrucks/eventstate/", views.vehtrips_status_f),
    re_path(r"^drainage/eventstate/$", views.drainage_status_f),
    re_path(r"^reports/operuchet/$", views.reports_operuchet_f),
    re_path(r"^analyse/predictive/$", views.analyse_predictive_f),
    # path("index/", views.index_f, name="index"),
    # path("home/", views.index_f, name="home"),
    # re_path(r"^user/captcha/$", views.captcha_f, name="captcha"),
    # re_path(r"^user/token/$", views.token_f, name="token"),
    # re_path(r"^user/detail/$", views.detail_f, name="token"),
    # re_path(r"^report/(?P<pk>\d+)/$", views.report_f, name="report_pk"),
    # re_path(r"^report/$", views.report_f, name="report"),
    # re_path(r"^todo/(?P<pk>\d+)/$", views.todo_f, name="todo_pk"),
    # re_path(r"^todo/$", views.todo_f, name="todo"),

    # re_path(r"^images/$", views.images),
    # re_path(r"^images/(?P<pk>\d+)/$", views.index),  # todo detail of image model
    # re_path(r"^images/upload/$", views.index),  # todo upload of new image model
]
