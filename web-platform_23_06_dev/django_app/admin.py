from django.contrib import admin
from django_app import models as django_models

# Register your models here.

admin.site.site_header = "Панель управления"  # default: "Django Administration"
admin.site.index_title = "Администрирование сайта"  # default: "Site administration"
admin.site.site_title = "Администрирование"  # default: "Django site admin"


class LoggingModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'LoggingModel' на панели администратора
    """

    list_display = ("username", "ip", "path", "method", "text", "created")
    list_display_links = (
        "username",
        "ip",
        "path",
        "method",
    )
    list_editable = ()
    list_filter = ("username", "ip", "path", "method", "text", "created")
    fieldsets = (
        (
            "Основное",
            {
                "fields": (
                    "username",
                    "ip",
                    "path",
                    "method",
                    "text",
                    "created",
                )
            },
        ),
    )
    search_fields = ["username", "ip", "path", "method", "text", "created"]


admin.site.register(django_models.LoggingModel, LoggingModelAdmin)
