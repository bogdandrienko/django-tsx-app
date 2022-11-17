# Generated by Django 4.1.2 on 2022-11-04 09:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('django_app', '0003_alter_settingsmodel_type_alter_usermodel_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='user',
            field=models.OneToOneField(blank=True, db_column='user_db_column', db_tablespace='user_db_tablespace', default=None, error_messages=False, help_text='<small class="text-muted">ForeignKey</small><hr><br>', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_model_extend', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
    ]
