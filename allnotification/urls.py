from django.urls import path
from . import views


urlpatterns = [
    path('', views.notification, name='allnotifications'),

]

