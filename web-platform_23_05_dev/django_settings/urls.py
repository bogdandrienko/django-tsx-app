from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include, re_path
from django_app import views


urlpatterns = [
    path("grappelli/", include("grappelli.urls")),  # grappelli URLS
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("", views.index, name=""),
    path("api/", include("django_app.urls")),

    # re_path(r"^.*$", lambda request: redirect("/", permanent=False), name="redirect"),

]

# if not settings.DEBUG:
#     urlpatterns += re_path(r"^.*$", lambda request: redirect("/", permanent=False), name="redirect")

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
