from django.contrib import admin
from django.conf import settings
from django.urls import path


from dashboardapp.views import (
    dashboardapp_view,

)




urlpatterns = [


path("",dashboardapp_view,name='dashboardapp_view'),



]




















