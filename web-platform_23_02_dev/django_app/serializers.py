from django.contrib.auth.models import User
from rest_framework import serializers
from django_app import models as django_models, utils as django_utils


# from backend_api import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # ['id', 'username']


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_models.UserModel
        fields = '__all__'  # ['id', 'username']


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_models.Todo
        fields = '__all__'  # ['id', 'title']


class ResultListSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_models.ResultList
        # fields = '__all__'  # ['id', 'title']
        fields = ['id', 'user', 'title', 'is_pay']

# class ReceiptCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.ReceiptCategory
#         fields = '__all__'


# class ReceiptSerializer(serializers.ModelSerializer):
#     # category = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = models.Receipt
#         fields = ['id', 'title', 'author']
# fields = '__all__'

# def get_category(self, obj) -> list:
#     print(self)
#     print(type(self))
#
#     print(obj)
#     print(type(obj))


# categories = models.Receipt.objects.all()
# categories_serialized = serializers.ReceiptSerializer(instance=receipts, many=True).data
#
# ReceiptCategorySerializer

# return []
