# from django.db.models.signals import pre_save
# from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from django_app import models as django_models


# def updateUser(instanse, **kwargs):
#     user = instanse
#     if user.email == '':
#         user.email = 'example@gmail.com'
#
#
# pre_save.connect(updateUser, sender=User)

@receiver(post_save, sender=User)
def create_user_model(sender, user, created, **kwargs):
    # if created:
    try:
        django_models.UserModel.objects.get_or_create(user=user)
        # profile = django_models.UserModel.objects.get_or_create(user=user)[0]  # (user, True)
        # profile.email = user.email
        # profile.save()
    except Exception as error:
        pass
