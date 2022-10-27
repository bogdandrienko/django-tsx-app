from django.contrib import admin

# Register your models here.
from django_app import models

admin.site.site_header = 'Панель 1'
admin.site.index_title = 'Панель 2'
admin.site.site_title = 'Панель 3'

class TaskAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'Task' на панели администратора
    """

    list_display = (
        'title',
        'description',
        'is_completed',
        'created',
        'updated'
    )
    list_display_links = (
        'title',
        'description',
    )
    list_editable = (
        'is_completed',
    )
    list_filter = (
        'title',
        'description',
        'is_completed',
        'created',
        'updated'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'title',
            'description',
            'is_completed',
            'created',
            'updated'
        )}),
    )
    search_fields = [
        'title',
        'description',
        'is_completed',
        'created',
        'updated'
    ]


admin.site.register(models.Task, TaskAdmin)


class TextModelAdmin(admin.ModelAdmin):
    """TextModel"""

    list_display = (
        'author',
        'text',
        'created_datetime',
    )

    list_display_links = (
        'author',
        'created_datetime',
    )

    list_editable = (
        'text',
    )

    list_filter = (
        'author',
        'text',
        'created_datetime',
    )

    fieldsets = ((
        'Основное', {"fields": (
            'author',
            'text',
            'created_datetime',
        )}),
    )

    search_fields = [
        'author',
        'text',
        'created_datetime',
    ]


admin.site.register(models.TextModel, TextModelAdmin)
