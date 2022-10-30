from django.contrib import admin
from django_app import models as django_models, serializers as django_serializers, utils as django_utils


# Register your models here.


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


admin.site.register(django_models.TokenModel, TokenModelAdmin)


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


admin.site.register(django_models.Todo, TodoAdmin)


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


admin.site.register(django_models.ResultList, ResultListAdmin)


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


admin.site.register(django_models.UserModel, UserModelAdmin)

# from backend_native.models import IdeaTestCommentModel, IdeaTestModel, IdeaTestRatingModel
#
#
# class IdeaModelAdmin(admin.ModelAdmin):
#     """
#     Idea Model Admin
#     """
#     list_display = (
#         'author',
#         'name_char_field',
#         'category_slug_field',
#         'short_description_char_field',
#         'full_description_text_field',
#         'avatar_image_field',
#         'addiction_file_field',
#         'is_visible',
#         'created_datetime_field',
#         'register_datetime_field',
#     )
#     list_filter = (
#         'author',
#         'name_char_field',
#         'category_slug_field',
#         'short_description_char_field',
#         'full_description_text_field',
#         'avatar_image_field',
#         'addiction_file_field',
#         'is_visible',
#         'created_datetime_field',
#         'register_datetime_field',
#     )
#     fieldsets = (
#         ('Автор',
#          {'fields': ('author',)}
#          ),
#         ('Имя и категория',
#          {'fields': ('name_char_field', 'category_slug_field',)}
#          ),
#         ('Описание',
#          {'fields': ('short_description_char_field', 'full_description_text_field',)}
#          ),
#         ('Приложения',
#          {'fields': ('avatar_image_field', 'addiction_file_field',)}
#          ),
#         ('Отображение',
#          {'fields': ('is_visible',)}
#          ),
#         ('Дата и время',
#          {'fields': ('created_datetime_field', 'register_datetime_field',)}
#          ),
#     )
#     search_fields = [
#         'author',
#         'name_char_field',
#         'category_slug_field',
#         'short_description_char_field',
#         'full_description_text_field',
#         'avatar_image_field',
#         'addiction_file_field',
#         'is_visible',
#         'created_datetime_field',
#         'register_datetime_field',
#     ]
#
#
# admin.site.register(IdeaTestModel, IdeaModelAdmin)
#
#
# class IdeaCommentModelAdmin(admin.ModelAdmin):
#     """
#     Idea Comment Model Admin
#     """
#     list_display = (
#         'author',
#         'idea_foreign_key_field',
#         'text_field',
#         'datetime_field',
#     )
#     list_filter = (
#         'author',
#         'idea_foreign_key_field',
#         # 'text_field',
#         'datetime_field',
#     )
#     fieldsets = (
#         ('Автор',
#          {'fields': ('author',)}
#          ),
#         ('Идея',
#          {'fields': ('idea_foreign_key_field',)}
#          ),
#         ('Комментарий',
#          {'fields': ('text_field',)}
#          ),
#         ('Дата',
#          {'fields': ('datetime_field',)}
#          ),
#     )
#     search_fields = [
#         'author',
#         'idea_foreign_key_field',
#         'text_field',
#         'datetime_field',
#     ]
#
#
# admin.site.register(IdeaTestCommentModel, IdeaCommentModelAdmin)
#
#
# class IdeaRatingModelAdmin(admin.ModelAdmin):
#     """
#     Idea Rating Model Admin
#     """
#     list_display = (
#         'author',
#         'idea_foreign_key_field',
#         'status_boolean_field',
#         'datetime_field',
#     )
#     list_filter = (
#         'author',
#         'idea_foreign_key_field',
#         'status_boolean_field',
#         'datetime_field',
#     )
#     fieldsets = (
#         ('Автор',
#          {'fields': ('author',)}
#          ),
#         ('Идея',
#          {'fields': ('idea_foreign_key_field',)}
#          ),
#         ('Статус',
#          {'fields': ('status_boolean_field',)}
#          ),
#         ('Дата',
#          {'fields': ('datetime_field',)}
#          ),
#     )
#     search_fields = [
#         'author',
#         'idea_foreign_key_field',
#         'status_boolean_field',
#         'datetime_field',
#     ]
#
#
# admin.site.register(IdeaTestRatingModel, IdeaRatingModelAdmin)
