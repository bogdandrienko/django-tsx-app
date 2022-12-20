# Generated by Django 4.1.2 on 2022-11-04 09:08

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('django_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='loggingmodel',
            name='user',
            field=models.ForeignKey(blank=True, db_column='user_db_column', db_tablespace='user_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">ForeignKey</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.AlterField(
            model_name='settingsmodel',
            name='type',
            field=models.CharField(blank=True, choices=[('logging_action', 'Логирование действий ("logging_action=True/False")'), ('print_action', 'Вывод в консоль действий'), ('logging_error', 'Логирование ошибок'), ('print_error', 'Вывод в консоль ошибок'), ('logging_response', 'Логирование ответов'), ('print_response', 'Вывод в консоль ответов'), ('scheduler_personal', 'Планировщик обновления персонала из 1С'), ('scheduler_superuser', 'Планировщик создания стандартных суперпользователей'), ('scheduler_group', 'Планировщик создания стандартных групп')], db_index=True, default='', help_text='<small class="text-muted">CharField [0, 300]</small><hr><br>', max_length=300, null=True, unique=True, validators=[django.core.validators.MinLengthValidator(0), django.core.validators.MaxLengthValidator(300)], verbose_name='Тип'),
        ),
    ]