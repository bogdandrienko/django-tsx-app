from django.urls import path
from django_mvt_todo_list import views

app_name = 'django_mvt_todo_list'
urlpatterns = [
    path('', views.home, name=''),
    path('index/', views.home, name='index'),
    path('home/', views.home, name='home'),

    path('create/', views.create, name='create'),
    path('<int:pk>/', views.read, name='read'),
    path('list/', views.read_list, name='read_list'),
    path('<int:pk>/update/', views.update, name='update'),
    path('<int:pk>/delete/', views.delete, name='delete'),
]
