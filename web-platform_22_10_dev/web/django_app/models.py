import time

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, Group
from django.core.validators import MinLengthValidator, MaxLengthValidator, FileExtensionValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.baseconv import base64


# Create your models here.

class TokenModel(models.Model):
    """
    Модель, которая содержит токен пользователя django
    """

    user = models.OneToOneField(
        db_column='user_db_column',
        db_index=True,
        db_tablespace='user_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=True,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Пользователь',
        help_text='<small class="text-muted">OneToOneField</small><hr><br>',
        to=User,
        on_delete=models.CASCADE,
        related_name='token_user',
    )
    token = models.SlugField(
        db_column='token_db_column',
        db_index=True,
        db_tablespace='token_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Токен',
        help_text='<small class="text-muted">SlugField [0, 300]</small><hr><br>',

        max_length=300,
        allow_unicode=False,
    )
    created = models.DateTimeField(
        db_column='created_db_column',
        db_index=True,
        db_tablespace='created_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время создания',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    updated = models.DateTimeField(
        db_column='updated_db_column',
        db_index=True,
        db_tablespace='updated_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время обновления',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'django_app'
        ordering = ('-updated',)
        verbose_name = 'Токен'
        verbose_name_plural = 'Admin 7, Токены'
        db_table = 'django_app_token_model_table'

    def __str__(self):
        return f"{self.user} | {self.created} | {self.updated}"

    @staticmethod
    def create_or_update_token(user: User) -> str:
        token = make_password(f"{user.username}{user.password}_{time.strftime('%Y-%m-%d %H:%M:%S')}")
        token_obj = TokenModel.objects.get_or_create(user=user)[0]
        token_obj.token_f = token
        token_obj.save()
        return token

    @staticmethod
    def check_token(token: str) -> User:
        token = TokenModel.objects.get(token=token)
        return token.user


class ResultList(models.Model):
    """
    Model Results
    """

    user = models.ForeignKey(  # OnetoOne unique=True,
        db_column='author_db_column',
        db_index=True,
        db_tablespace='author_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Пациент',
        help_text='<small class="text-muted">Пациент</small><hr><br>',

        to=User,
        on_delete=models.SET_NULL,  # CASCADE - удалять, SET_NULL - занулять
    )
    # TODO ссылка на врача, который вынес диагноз
    # user = models.ForeignKey(  # OnetoOne unique=True,
    #     db_column='author_db_column',
    #     db_index=True,
    #     db_tablespace='author_db_tablespace',
    #     error_messages=False,
    #     primary_key=False,
    #     unique=False,
    #     editable=True,
    #     blank=True,
    #     null=True,
    #     default=None,
    #     verbose_name='Пациент',
    #     help_text='<small class="text-muted">Пациент</small><hr><br>',
    #
    #     to=User,
    #     on_delete=models.SET_NULL,  # CASCADE - удалять, SET_NULL - занулять
    # )
    title = models.CharField(
        db_column='title_db_column',
        db_index=True,
        db_tablespace='title_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Заголовок',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    description = models.TextField(
        db_column='description_db_column',
        db_index=True,
        db_tablespace='description_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name='Описание',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    is_pay = models.BooleanField(
        db_column='is_pay_db_column',
        db_index=True,
        db_tablespace='is_pay_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='Статус оплаты',
        help_text='<small class="text-muted">BooleanField</small><hr><br>',
    )
    addiction_file_field = models.FileField(
        db_column='addiction_file_field_db_column',
        db_index=True,
        db_tablespace='addiction_file_field_db_tablespace',
        error_messages=False,
        unique_for_date=False,
        unique_for_month=False,
        unique_for_year=False,
        validators=[FileExtensionValidator(['docx', 'doc', 'pdf'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,  # 'uploads/analizi/files/',
        verbose_name='Файл-приложение',
        help_text='<small class="text-muted">addiction_file_field</small><hr><br>',

        upload_to='uploads/analizi/files/',
        max_length=200,
    )
    created = models.DateTimeField(
        db_column='created_db_column',
        db_index=True,
        db_tablespace='created_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время создания',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    updated = models.DateTimeField(
        db_column='updated_db_column',
        db_index=True,
        db_tablespace='updated_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время обновления',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'django_app'
        ordering = ('-updated', 'created')
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'
        # db_table = 'django_app_model_table'

    def __str__(self):
        if self.is_pay:
            completed = "Оплачено"
        else:
            completed = "Не оплачено"
        return f"{self.title} | {self.description[0:30]}... | {completed} | {self.updated}"

    def is_done(self):
        return self.is_pay


class UserModel(models.Model):
    """
    Модель, которая содержит расширение для стандартной модели пользователя веб-платформы
    """

    user = models.OneToOneField(
        db_column='user_db_column',
        db_index=True,
        db_tablespace='user_db_tablespace',
        error_messages=False,
        primary_key=False,
        # unique=True,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Пользователь',
        help_text='<small class="text-muted">ForeignKey</small><hr><br>',
        to=User,
        on_delete=models.SET_NULL,
        related_name='profile',
    )
    is_active_account = models.BooleanField(
        db_column='is_active_account_db_column',
        db_index=True,
        db_tablespace='is_active_account_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=True,
        verbose_name='Активность аккаунта',
        help_text='<small class="text-muted">BooleanField</small><hr><br>',
    )
    email = models.EmailField(
        db_column='email_db_column',
        db_index=True,
        db_tablespace='email_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Почта',
        help_text='<small class="text-muted">EmailField [0, 300]</small><hr><br>',

        max_length=300,
    )
    secret_question = models.CharField(
        db_column='secret_question_db_column',
        db_index=True,
        db_tablespace='secret_question_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Секретный вопрос',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    secret_answer = models.CharField(
        db_column='secret_answer_db_column',
        db_index=True,
        db_tablespace='secret_answer_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Секретный ответ',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    is_temp_password = models.BooleanField(
        db_column='is_temp_password_db_column',
        db_index=True,
        db_tablespace='is_temp_password_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=True,
        verbose_name='Пароль не изменён',
        help_text='<small class="text-muted">BooleanField</small><hr><br>',
    )
    last_name = models.CharField(
        db_column='last_name_db_column',
        db_index=True,
        db_tablespace='last_name_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Фамилия',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    first_name = models.CharField(
        db_column='first_char_db_column',
        db_index=True,
        db_tablespace='first_char_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Имя',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    patronymic = models.CharField(
        db_column='patronymic_db_column',
        db_index=True,
        db_tablespace='patronymic_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Отчество',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    personnel_number = models.SlugField(
        db_column='personnel_number_db_column',
        db_index=True,
        db_tablespace='personnel_number_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Табельный номер',
        help_text='<small class="text-muted">SlugField [0, 300]</small><hr><br>',

        max_length=300,
        allow_unicode=False,
    )
    subdivision = models.CharField(
        db_column='subdivision_db_column',
        db_index=True,
        db_tablespace='subdivision_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Подразделение',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    workshop_service = models.CharField(
        db_column='workshop_service_db_column',
        db_index=True,
        db_tablespace='workshop_service_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Цех/Служба',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    department_site = models.CharField(
        db_column='department_site_db_column',
        db_index=True,
        db_tablespace='department_site_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Отдел/Участок',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    position = models.CharField(
        db_column='position_db_column',
        db_index=True,
        db_tablespace='position_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Должность',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    category = models.CharField(
        db_column='category_db_column',
        db_index=True,
        db_tablespace='category_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Категория',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    education = models.TextField(
        db_column='education_db_column',
        db_index=True,
        db_tablespace='education_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Образование',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    achievements = models.TextField(
        db_column='achievements_db_column',
        db_index=True,
        db_tablespace='achievements_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Достижения',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    biography = models.TextField(
        db_column='biography_db_column',
        db_index=True,
        db_tablespace='biography_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Биография',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    hobbies = models.TextField(
        db_column='hobbies_db_column',
        db_index=True,
        db_tablespace='hobbies_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Увлечения',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    image = models.ImageField(
        db_column='image_db_column',
        db_index=True,
        db_tablespace='image_db_tablespace',
        error_messages=False,
        validators=[FileExtensionValidator(['jpg', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='default/account/default_avatar.jpg',
        verbose_name='Изображение',
        help_text='<small class="text-muted"ImageField [jpg, png]</small><hr><br>',

        upload_to='uploads/admin/account/avatar',
        max_length=200,
    )

    class Meta:
        app_label = 'auth'
        ordering = ('-id',)
        verbose_name = 'Пользователь расширение'
        verbose_name_plural = 'Admin 1, Пользователи расширение'
        db_table = 'user_extend_model_table'

    def __str__(self):
        if self.is_active_account:
            is_active_account = 'Активен'
        else:
            is_active_account = 'Неактивен'
        return f'{self.last_name} | {self.first_name} | {is_active_account} | {self.personnel_number} | ' \
               f'{self.position} | {self.id} | {self.user}'


# User
# Pacient ONETOONE (User) # Med Worker ONETOONE (User)

@receiver(post_save, sender=User)
def create_user_model(sender, instance, created, **kwargs):
    # if created:
    try:
        UserModel.objects.get_or_create(user=instance)
        # profile = django_models.UserModel.objects.get_or_create(user=instance)[0]  # (user, True)
        # profile.email = user.email
        # profile.save()
    except Exception as error:
        pass


class Todo(models.Model):
    """
    Model Todo
    """

    title = models.CharField(
        db_column='title_db_column',
        db_index=True,
        db_tablespace='title_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(300), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='',
        verbose_name='Заголовок',
        help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>',

        max_length=300,
    )
    description = models.TextField(
        db_column='description_db_column',
        db_index=True,
        db_tablespace='description_db_tablespace',
        error_messages=False,
        primary_key=False,
        validators=[MinLengthValidator(0), MaxLengthValidator(3000), ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name='Описание',
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',

        max_length=3000,
    )
    avatar = models.ImageField(
        db_column='avatar_db_column',
        db_index=True,
        db_tablespace='avatar_image_field_db_tablespace',
        error_messages=False,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default='uploads/todo/default_todo.jpg',
        verbose_name='Аватарка',
        help_text='<small class="text-muted">>image_field</small><hr><br>',

        upload_to='uploads/todo/',
        max_length=100,
    )
    is_completed = models.BooleanField(
        db_column='is_completed_db_column',
        db_index=True,
        db_tablespace='is_completed_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=False,
        default=False,
        verbose_name='Статус выполнения',
        help_text='<small class="text-muted">BooleanField</small><hr><br>',
    )
    created = models.DateTimeField(
        db_column='created_db_column',
        db_index=True,
        db_tablespace='created_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время создания',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )
    updated = models.DateTimeField(
        db_column='updated_db_column',
        db_index=True,
        db_tablespace='updated_db_tablespace',
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name='Дата и время обновления',
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',

        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = 'django_app'
        ordering = ('-updated',)
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'
        db_table = 'django_app_todo_list_model_table'

    def __str__(self):
        if self.is_completed:
            completed = "Активно"
        else:
            completed = "Неактивно"
        return f"{self.title} | {self.description[0:30]}... | {completed} | {self.updated}"

# from backend.models import UserModel, GroupModel, ActionModel, LoggingModel
#
#
# class IdeaTestModel(models.Model):
#     """
#     Idea Model
#     """
#     author = models.ForeignKey(
#         db_column='author_db_column',
#         db_index=True,
#         db_tablespace='author_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Автор',
#         help_text='<small class="text-muted">author</small><hr><br>',
#
#         to=UserModel,
#         on_delete=models.SET_NULL,
#     )
#     name_char_field = models.CharField(
#         db_column='name_char_field_db_column',
#         db_index=True,
#         db_tablespace='name_char_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[MinLengthValidator(0), MaxLengthValidator(32), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='',
#         verbose_name='Название',
#         help_text='<small class="text-muted">name_char_field</small><hr><br>',
#
#         max_length=32,
#     )
#     LIST_DB_VIEW_CHOICES = [
#         ('innovation', 'Инновации'),
#         ('optimization', 'Оптимизации'),
#         ('industry', 'Индустрия 4.0'),
#         ('other', 'Другое'),
#     ]
#     category_slug_field = models.SlugField(
#         db_column='category_slug_field_db_column',
#         db_index=True,
#         db_tablespace='category_slug_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         choices=LIST_DB_VIEW_CHOICES,
#         validators=[MinLengthValidator(0), MaxLengthValidator(16), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='',
#         verbose_name='Категория',
#         help_text='<small class="text-muted">category_slug_field</small><hr><br>',
#
#         max_length=16,
#         allow_unicode=False,
#     )
#     short_description_char_field = models.CharField(
#         db_column='short_description_char_field_db_column',
#         db_index=True,
#         db_tablespace='short_description_char_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[MinLengthValidator(0), MaxLengthValidator(64), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='',
#         verbose_name='Краткое описание',
#         help_text='<small class="text-muted">short_description_char_field</small><hr><br>',
#
#         max_length=64,
#     )
#     full_description_text_field = models.TextField(
#         db_column='full_description_text_field_db_column',
#         db_index=True,
#         db_tablespace='full_description_text_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[MinLengthValidator(0), MaxLengthValidator(1024), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='',
#         verbose_name='Полное описание',
#         help_text='<small class="text-muted">full_description_text_field</small><hr><br>',
#
#         max_length=1024,
#     )
#     avatar_image_field = models.ImageField(
#         db_column='avatar_image_field_db_column',
#         db_index=True,
#         db_tablespace='avatar_image_field_db_tablespace',
#         error_messages=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[FileExtensionValidator(['jpg', 'png'])],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='uploads/idea/default_avatar.jpg',
#         verbose_name='Аватарка-заставка для идеи',
#         help_text='<small class="text-muted">>avatar_image_field</small><hr><br>',
#
#         upload_to='uploads/idea/avatar/',
#         max_length=100,
#     )
#     addiction_file_field = models.FileField(
#         db_column='addiction_file_field_db_column',
#         db_index=True,
#         db_tablespace='addiction_file_field_db_tablespace',
#         error_messages=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[FileExtensionValidator(['xlsx', 'xls', 'docx', 'doc', 'pdf'])],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Файл-приложение',
#         help_text='<small class="text-muted">addiction_file_field</small><hr><br>',
#
#         upload_to='uploads/idea/files/',
#         max_length=100,
#     )
#     is_visible = models.BooleanField(
#         db_column='is_visible_db_column',
#         db_index=True,
#         db_tablespace='is_visible_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=False,
#         default=False,
#         verbose_name='Видимость идеи в общем списке',
#         help_text='<small class="text-muted">is_visible</small><hr><br>',
#     )
#     created_datetime_field = models.DateTimeField(
#         db_column='created_datetime_field_db_column',
#         db_index=True,
#         db_tablespace='created_datetime_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=timezone.now,
#         verbose_name='Дата создания',
#         help_text='<small class="text-muted">created_datetime_field</small><hr><br>',
#
#         auto_now=False,
#         auto_now_add=False,
#     )
#     register_datetime_field = models.DateTimeField(
#         db_column='register_datetime_field_db_column',
#         db_index=True,
#         db_tablespace='register_datetime_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=timezone.now,
#         verbose_name='Дата регистрации',
#         help_text='<small class="text-muted">register_datetime_field</small><hr><br>',
#
#         auto_now=False,
#         auto_now_add=False,
#     )
#
#     class Meta:
#         app_label = 'backend_native'
#         ordering = ('-id',)
#         verbose_name = 'Идея'
#         verbose_name_plural = '0_Идеи'
#         db_table = 'idea_test_model_table'
#
#     def __str__(self):
#         return f'{self.name_char_field} : {self.category_slug_field} : {self.author}'
#
#     @staticmethod
#     def get_all_category():
#         return IdeaTestModel.LIST_DB_VIEW_CHOICES
#
#     def get_category(self):
#         dict_key_val = dict(self.LIST_DB_VIEW_CHOICES)
#         return [self.category_slug_field, dict_key_val[self.category_slug_field]]
#
#     def get_total_comment_value(self):
#         return IdeaTestCommentModel.objects.filter(idea_foreign_key_field=self.id).count()
#
#     def get_like_count(self):
#         return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count()
#
#     def get_dislike_count(self):
#         return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()
#
#     def get_total_rating_value(self):
#         return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() + \
#                IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()
#
#     def get_total_rating(self):
#         return IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=True).count() - \
#                IdeaTestRatingModel.objects.filter(idea_foreign_key_field=self, status_boolean_field=False).count()
#
#
# class IdeaTestCommentModel(models.Model):
#     """
#     Ideas Comment Model
#     """
#     author = models.ForeignKey(
#         db_column='author_db_column',
#         db_index=True,
#         db_tablespace='author_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Автор',
#         help_text='<small class="text-muted">author</small><hr><br>',
#
#         to=UserModel,
#         on_delete=models.SET_NULL,
#     )
#     idea_foreign_key_field = models.ForeignKey(
#         db_column='idea_foreign_key_field_db_column',
#         db_index=True,
#         db_tablespace='idea_foreign_key_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Идея',
#         help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>',
#
#         to=IdeaTestModel,
#         on_delete=models.SET_NULL,
#     )
#     text_field = models.TextField(
#         db_column='text_field_db_column',
#         db_index=True,
#         db_tablespace='text_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         validators=[MinLengthValidator(0), MaxLengthValidator(512), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default='',
#         verbose_name='Комментарий',
#         help_text='<small class="text-muted">text_field</small><hr><br>',
#
#         max_length=512,
#     )
#     datetime_field = models.DateTimeField(
#         db_column='datetime_field_db_column',
#         db_index=True,
#         db_tablespace='datetime_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         # choices=LIST_DB_VIEW_CHOICES,
#         # validators=[MinValueValidator(8), MaxValueValidator(12), ],
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=timezone.now,
#         verbose_name='Дата создания',
#         help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',
#
#         auto_now=False,
#         auto_now_add=False,
#     )
#
#     class Meta:
#         app_label = 'backend_native'
#         ordering = ('-id',)
#         verbose_name = 'Комментарий'
#         verbose_name_plural = '1_Идеи_Комментарии'
#         db_table = 'idea_test_comment_model_table'
#
#     def __str__(self):
#         return f'{self.author} :: {self.idea_foreign_key_field} :: {self.text_field[:10]}... ' \
#                f':: {self.datetime_field}'
#
#
# class IdeaTestRatingModel(models.Model):
#     """
#     Idea Rating Model
#     """
#     author = models.ForeignKey(
#         db_column='author_db_column',
#         db_index=True,
#         db_tablespace='author_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Автор',
#         help_text='<small class="text-muted">author</small><hr><br>',
#
#         to=UserModel,
#         on_delete=models.SET_NULL,
#     )
#     idea_foreign_key_field = models.ForeignKey(
#         db_column='idea_foreign_key_field_db_column',
#         db_index=True,
#         db_tablespace='idea_foreign_key_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=None,
#         verbose_name='Идея',
#         help_text='<small class="text-muted">idea_foreign_key_field</small><hr><br>',
#
#         to=IdeaTestModel,
#         on_delete=models.SET_NULL,
#     )
#     status_boolean_field = models.BooleanField(
#         db_column='status_boolean_field_db_column',
#         db_index=True,
#         db_tablespace='status_boolean_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=False,
#         default=True,
#         verbose_name='Лайк / дизлайк',
#         help_text='<small class="text-muted">status_boolean_field</small><hr><br>',
#     )
#     datetime_field = models.DateTimeField(
#         db_column='datetime_field_db_column',
#         db_index=True,
#         db_tablespace='datetime_field_db_tablespace',
#         error_messages=False,
#         primary_key=False,
#         unique_for_date=False,
#         unique_for_month=False,
#         unique_for_year=False,
#         unique=False,
#         editable=True,
#         blank=True,
#         null=True,
#         default=timezone.now,
#         verbose_name='Дата создания',
#         help_text='<small class="text-muted">Дата и время, example: "31.12.2021Т23:59:59"</small><hr><br>',
#
#         auto_now=False,
#         auto_now_add=False,
#     )
#
#     class Meta:
#         app_label = 'backend_native'
#         ordering = ('-id',)
#         verbose_name = 'Рейтинг'
#         verbose_name_plural = '1_Идеи_Рейтинги'
#         db_table = 'idea_test_rating_model_table'
#
#     def __str__(self):
#         return f'{self.author} :: {self.idea_foreign_key_field} :: {self.status_boolean_field} ' \
#                f':: {self.datetime_field}'
