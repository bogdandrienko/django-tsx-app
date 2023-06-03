from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_app import models as django_models


@receiver(post_save, sender=User)
def create_user_model(sender, instance, created, **kwargs):
    try:
        # if created:
        user_model = django_models.UserModel.objects.get_or_create(user=instance)[0]  # (user_model, True)
        # user_model.email = user.email
        # user_model.save()
    except Exception as error:
        pass


def register_all_signals():
    pass
