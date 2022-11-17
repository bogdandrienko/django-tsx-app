from rest_framework import serializers
from django_drf_todo_list import models


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = '__all__'  # ['id', 'title']
