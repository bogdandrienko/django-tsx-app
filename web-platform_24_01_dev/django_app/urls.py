from django.urls import path, re_path
from django_app import views


urlpatterns = [
    # base
    path("", views.index, name=""),
    # idea - рац.предложения ПТО
    path("api/idea/create/", views.Idea.api_idea_create),
    path("api/idea/export/", views.Idea.api_idea_export),
    # claim - заявки Горняки
    path("api/claim/create/", views.Claim.api_claim_create),
    path("api/claim/list/", views.Claim.api_claim_list),
    path("api/claim/update/", views.Claim.api_claim_update),
    # telegram_proxy -
    path("api/proxy/bot1/", views.api_proxy_bot1, name="api_proxy_bot1"),
    # sql proxy
    path("api/proxy/sql/", views.api_proxy_sql, name="api_proxy_sql"),
    # center_monitoring
    # http://bogdandrienko.site:443/api/communicator/center_monitoring/
    path("api/communicator/center_monitoring/", views.Center.api_communicator_center_monitoring, name="api_communicator_center_monitoring"),
    path("api/communicator/center_sticking/", views.Center.api_communicator_center_sticking, name="api_communicator_center_sticking"),
    # digital clone
    path("api/speed/report/dumptrucks_custom/", views.Speed.get_target_report_avg_speed_custom),
    path("api/stoppages/report/empty_peregon/", views.Stoppages.get_empty_peregon_report_dumptrucks),
    path("api/stoppages/report/veh_dvs/", views.Stoppages.get_stoppages_report_veh_dvs),
    # redirect
    re_path(r"^.*$", views.index, name="redirect"),
]
