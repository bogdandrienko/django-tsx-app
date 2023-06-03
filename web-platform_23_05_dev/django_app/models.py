from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.db import models
from django.utils import timezone


# Create your models here.


class LoggingModel(models.Model):
    """
    Модель, которая содержит логирование действий и ошибок django
    """

    user = models.ForeignKey(
        db_column="user_db_column",
        db_index=True,
        db_tablespace="user_db_tablespace",
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name="Пользователь",
        help_text='<small class="text-muted">ForeignKey</small><hr><br>',
        to=User,
        on_delete=models.SET_NULL,
    )
    username = models.SlugField(
        db_column="username_db_column",
        db_index=True,
        db_tablespace="username_db_tablespace",
        error_messages=False,
        primary_key=False,
        validators=[
            MinLengthValidator(0),
            MaxLengthValidator(300),
        ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name="Имя пользователя",
        help_text='<small class="text-muted">SlugField [0, 300]</small><hr><br>',
        max_length=300,
        allow_unicode=False,
    )
    ip = models.GenericIPAddressField(
        db_column="ip_db_column",
        db_index=True,
        db_tablespace="ip_db_tablespace",
        error_messages=False,
        primary_key=False,
        validators=[
            MinLengthValidator(0),
            MaxLengthValidator(300),
        ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name="Ip адрес",
        help_text='<small class="text-muted">ip[0, 300]</small><hr><br>',
        max_length=300,
        protocol="both",
        unpack_ipv4=False,
    )
    path = models.SlugField(
        db_column="path_field_db_column",
        db_index=True,
        db_tablespace="path_field_db_tablespace",
        error_messages=False,
        primary_key=False,
        validators=[
            MinLengthValidator(0),
            MaxLengthValidator(300),
        ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name="Путь",
        help_text='<small class="text-muted">SlugField [0, 300]</small><hr><br>',
        max_length=300,
        allow_unicode=False,
    )
    method = models.SlugField(
        db_column="method_field_db_column",
        db_index=True,
        db_tablespace="method_field_db_tablespace",
        error_messages=False,
        primary_key=False,
        validators=[
            MinLengthValidator(0),
            MaxLengthValidator(300),
        ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name="Метод",
        help_text='<small class="text-muted">SlugField [0, 300]</small><hr><br>',
        max_length=300,
        allow_unicode=False,
    )
    text = models.TextField(
        db_column="text_db_column",
        db_index=True,
        db_tablespace="text_db_tablespace",
        error_messages=False,
        primary_key=False,
        validators=[
            MinLengthValidator(0),
            MaxLengthValidator(3000),
        ],
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name="Текст ошибки/исключения/ответа",
        help_text='<small class="text-muted">TextField [0, 3000]</small><hr><br>',
        max_length=3000,
    )
    created = models.DateTimeField(
        db_column="created_db_column",
        db_index=True,
        db_tablespace="created_db_tablespace",
        error_messages=False,
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name="Дата и время создания",
        help_text='<small class="text-muted">DateTimeField</small><hr><br>',
        auto_now=False,
        auto_now_add=False,
    )

    class Meta:
        app_label = "django_app"
        ordering = ("-created",)
        verbose_name = "Лог"
        verbose_name_plural = "Admin 5, Логи"

    def __str__(self):
        if self.username:
            try:
                username = User.objects.get(username=self.username)
            except Exception as error:
                username = ""
        else:
            username = ""
        return f"{self.created} | {username} | {self.path}"
