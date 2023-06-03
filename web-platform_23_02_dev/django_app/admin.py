from django.contrib import admin
from django_app import models as django_models, serializers as django_serializers, utils as django_utils

# Register your models here.


admin.site.site_header = 'Панель управления'  # default: "Django Administration"
admin.site.index_title = 'Администрирование сайта'  # default: "Site administration"
admin.site.site_title = 'Администрирование'  # default: "Django site admin"


class ExamplesModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ExamplesModel' на панели администратора
    """

    # form = ExamplesModelForm

    # Поля, которые нужно отображать в заголовке, на панели администратора
    list_display = (
        'binary_field',
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
        'foreign_key_field',
        'one_to_one_field',
    )

    # Поля, которые отображаются как ссылки для перехода в детали модели
    list_display_links = (
        'binary_field',
        'boolean',
    )

    # Поля, которые можно редактировать прям из общего списка
    list_editable = (
        'text',
        'slug',
    )

    # Поля, которые отображаются как поле "группы" в пользователе, для моделей many_to_many_field
    filter_horizontal = ('many_to_many_field',)

    # Поля, которые нужно отображать при фильтрации, на панели администратора
    list_filter = (
        'binary_field',
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
        'foreign_key_field',
        'one_to_one_field',
        'many_to_many_field',
    )

    # Поля, которые нужно отображать при создании модели, на панели администратора
    # fields          = ('id',)

    # Поля, которые нужно отображать сгруппированно при создании модели, на панели администратора
    fieldsets = (
        ('binary_data', {'fields': (
            'binary_field',
        )}),
        ('boolean_data', {'fields': (
            'boolean',
            'null_boolean',
        )}),
        ('char_data', {'fields': (
            'char',
            'text',
            'slug',
            'email',
            'url_field',
            'genericipaddress_field',
        )}),
        ('numeric_data', {'fields': (
            'integer',
            'big_integer',
            'positive_integer',
            'float_field',
            'decimal_field',
        )}),
        ('datetime_data', {'fields': (
            'datetime_field',
            'date_field',
            'time_field',
            'duration_field',
        )}),
        ('file_data', {'fields': (
            'file_field',
            'image',
        )}),
        ('relations_data', {'fields': (
            'foreign_key_field',
            'one_to_one_field',
            'many_to_many_field',
        )}),
    )

    # Поля, которые не нужно отображать при создании модели, на панели администратора |
    # exclude         = ['id',]

    # Поля, которые нужно учитывать при поиске, на панели администратора | Не включать связанные поля(ForeignKey...)
    search_fields = [
        'binary_field',
        'boolean',
        'null_boolean',
        'char',
        'text',
        'slug',
        'email',
        'url_field',
        'genericipaddress_field',
        'integer',
        'big_integer',
        'positive_integer',
        'float_field',
        'decimal_field',
        'datetime_field',
        'date_field',
        'time_field',
        'duration_field',
        'file_field',
        'image',
        'foreign_key_field',
        'one_to_one_field',
        'many_to_many_field',
    ]

    # Поля, которые нужно добавлять связанными при создании модели, на панели администратора
    # inlines         = [ExamplesModelInline]


class UserModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'UserModel' на панели администратора
    """

    # list_display = (
    #     'user',
    # )
    # list_display_links = (
    #     'user',
    # )
    # list_editable = (
    #     'user',
    # )
    # list_filter = (
    #     'user',
    # )
    # filter_horizontal = (
    #     'users',
    # )
    # fieldsets = (
    #     ('Основное', {'fields': (
    #         'user',
    #     )}),
    # )
    # search_fields = [
    #     'user',
    # ]

    list_display = (
        'user',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    )
    list_display_links = (
        'user',
        'last_name',
        'first_name',
        'patronymic',
    )
    list_editable = (
        'is_active_account',
    )
    list_filter = (
        'user',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    )
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user',
            'is_active_account',
            'email',
            'secret_question',
            'secret_answer',
            'is_temp_password',
            'last_name',
            'first_name',
            'patronymic',
            'personnel_number',
            'subdivision',
            'workshop_service',
            'department_site',
            'position',
            'category',
            'education',
            'achievements',
            'biography',
            'hobbies',
            'image',
        )}),
    )
    search_fields = [
        'user',
        'is_active_account',
        'email',
        'secret_question',
        'secret_answer',
        'is_temp_password',
        'last_name',
        'first_name',
        'patronymic',
        'personnel_number',
        'subdivision',
        'workshop_service',
        'department_site',
        'position',
        'category',
        'education',
        'achievements',
        'biography',
        'hobbies',
        'image',
    ]


class TokenModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'TokenModel' на панели администратора
    """

    list_display = (
        'user',
        'token',
        'created',
        'updated'
    )
    list_display_links = (
        'user',
        'token',
        'created'
    )
    list_editable = (
        'updated',
    )
    list_filter = (
        'user',
        'token',
        'created',
        'updated'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user',
            'token',
            'created',
            'updated'
        )}),
    )
    search_fields = [
        'user',
        'token',
        'created',
        'updated'
    ]


class ActionModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ActionModel' на панели администратора
    """

    list_display = (
        'action',
    )
    list_display_links = (
        'action',
    )
    list_editable = (
    )
    list_filter = (
        'action',
    )
    filter_horizontal = (
    )
    fieldsets = (
        ('Основное', {'fields': (
            'action',
        )}),
    )
    search_fields = [
        'action',
    ]


class GroupModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'GroupModel' на панели администратора
    """

    list_display = (
        'name',
    )
    list_display_links = (
        'name',
    )
    list_editable = (
    )
    list_filter = (
        'name',
        'users',
        'actions',
    )
    filter_horizontal = (
        'users',
        'actions',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'name',
            'users',
            'actions',
        )}),
    )
    search_fields = [
        'name',
        'users',
        'actions',
    ]


class SettingsModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'SettingsModel' на панели администратора
    """

    list_display = (
        'type',
        'value',
    )
    list_display_links = (
        'type',
    )
    list_editable = (
        'value',
    )
    list_filter = (
        'type',
        'value',
    )
    fieldsets = (
        ('Основное', {'fields': (
            'type',
            'value',
        )}),
    )
    search_fields = [
        'type',
        'value',
    ]


class LoggingModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'LoggingModel' на панели администратора
    """

    list_display = (
        'username',
        'ip',
        'path',
        'method',
        'text',
        'created'
    )
    list_display_links = (
        'username',
        'ip',
        'path',
        'method',
    )
    list_editable = (
    )
    list_filter = (
        'username',
        'ip',
        'path',
        'method',
        'text',
        'created'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'username',
            'ip',
            'path',
            'method',
            'text',
            'created',
        )}),
    )
    search_fields = [
        'username',
        'ip',
        'path',
        'method',
        'text',
        'created'
    ]


class NotificationModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'IdeaModel' на панели администратора
    """

    list_display = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    )
    list_display_links = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
    )
    list_editable = (
        "is_visible",
    )
    list_filter = (
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    )
    fieldsets = (
        ("Основное", {"fields": (
            "author",
            "target_group_model",
            "target_user_model",
            "name",
            "place",
            "description",
            "is_visible",
            "created",
            "updated",
        )}),
    )
    search_fields = [
        "author",
        "target_group_model",
        "target_user_model",
        "name",
        "place",
        "description",
        "is_visible",
        "created",
        "updated",
    ]


class TodoAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'Todo' на панели администратора
    """

    list_display = (
        'title',
        'description',
        'avatar',
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
        'avatar',
        'is_completed',
        'created',
        'updated'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'title',
            'description',
            'avatar',
            'is_completed',
            'created',
            'updated'
        )}),
    )
    search_fields = [
        'title',
        'description',
        'avatar',
        'is_completed',
        'created',
        'updated'
    ]


class ResultListAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'ResultList' на панели администратора
    """

    list_display = (
        'user',
        'title',
        'description',
        'is_pay',
        'addiction_file_field',
        'created',
        'updated'
    )
    list_display_links = (
        'user',
        'title',
    )
    list_editable = (
        'is_pay',
    )
    list_filter = (
        'user',
        'title',
        'description',
        'is_pay',
        'addiction_file_field',
        'created',
        'updated'
    )
    fieldsets = (
        ('Основное', {'fields': (
            'user',
            'title',
            'description',
            'is_pay',
            'addiction_file_field',
        )}),
        ('Дополнительное', {'fields': (
            'created',
            'updated'
        )}),
    )
    search_fields = [
        'user',
        'title',
        'description',
        'is_pay',
        'addiction_file_field',
        'created',
        'updated'
    ]


admin.site.register(django_models.ExamplesModel, ExamplesModelAdmin)
admin.site.register(django_models.UserModel, UserModelAdmin)
admin.site.register(django_models.TokenModel, TokenModelAdmin)
admin.site.register(django_models.ActionModel, ActionModelAdmin)
admin.site.register(django_models.GroupModel, GroupModelAdmin)

admin.site.register(django_models.SettingsModel, SettingsModelAdmin)
admin.site.register(django_models.LoggingModel, LoggingModelAdmin)
admin.site.register(django_models.NotificationModel, NotificationModelAdmin)

admin.site.register(django_models.Todo, TodoAdmin)
admin.site.register(django_models.ResultList, ResultListAdmin)
