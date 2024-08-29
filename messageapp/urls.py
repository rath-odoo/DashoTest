from django.contrib import admin
from django.conf import settings
from django.urls import path
from messageapp import views




from messageapp.views import (
    base_view,

)



urlpatterns = [


path("",base_view,name='base_view'),



]







