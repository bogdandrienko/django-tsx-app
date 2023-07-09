from django.urls import re_path
from django_app import views


urlpatterns = [
    # events
    re_path(r"^events/drainage/$", views.f_events_drainage),  # "/api/events/drainage"
    re_path(r"^events/dumptrucks/$", views.f_events_dumptrucks),  # "/api/events/drainage"
    re_path(r"^events/shovels/$", views.f_events_dumptrucks),  # "/api/events/drainage"
    re_path(r"^events/auxes/$", views.f_events_dumptrucks),  # "/api/events/drainage"

    re_path(r"^rational/$", views.f_rational),

    # analyse
    re_path(r"^analyse/vehtrips/$", views.f_analyse_predictive),  # "/api/analyse/predictive"
    re_path(r"^pto/analytic_tech/$", views.f_pto_analytic_tech),  # "/api/pto/analytic_tech"
    re_path(r"^pto/operative_stoppages/$", views.f_pto_operative_stoppages),  # "/api/pto/operative_stoppages"

    # reports
    re_path(r"^reports/operuchet/dumptrucks/$", views.f_reports_operuchet_dumptrucks),  # "/api/reports/operuchet_dumptrucks"
    re_path(r"^reports/avg_speed/$", views.f_reports_avg_speed),  # "/api/atc/avg_speed"
    re_path(r"^reports/time_wait_to_load/$", views.f_reports_time_wait_to_load),  # "/api/reports/time_wait_to_load"
    re_path(r"^reports/errors_asd/$", views.f_reports_errors_asd),  # "/api/reports/time_wait_to_load"

    # todo #############################################################################################################
    re_path(r"^users/captcha/$", views.f_users_captcha),

    # re_path(r"^users/(?P<pk>\d+)/detail/$", views.todo_f, name="todo_pk"),
    # re_path(r"^users/list/$", views.todo_f, name="todo"),

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
