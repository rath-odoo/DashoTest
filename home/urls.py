from django.contrib import admin
from django.urls import path,include
from home import views


app_name = 'home'


urlpatterns = [

#react app

path("",views.reactapp,name='home'),

path("createaccount/",views.reactapp,name='redirect0'),


path("tgrwaregister/",views.reactapp,name='redirect_tgrwa_register'),
path("tgrwamembers/",views.reactapp,name='redirect_tgrwa_members'),

path("connect",views.reactapp,name='redirect_connect'),
path("classes/",views.reactapp,name='redirect_classes'),

path("classes/<int:pk>",views.reactappPar,name='redirect_classes_detail'),
path("exams/",views.reactapp,name='redirect_exams'),
path("notices/",views.reactapp,name='redirect_notices'),
path("meetings/",views.reactapp,name='redirect_meetings'),
path("meetings/<int:pk>/",views.reactappPar,name='redirect_Onemeeting'),

path("chat/",views.reactapp,name='redirect_generalchat'),
path("calender/",views.reactapp,name='redirect_home_calender'),
path("institute/",views.reactapp,name='redirect_home_institute'),
path("tasks/",views.reactapp,name='redirect_home_tasks'),
path("contacts/",views.reactapp,name='redirect_home_contacts'),
path("links/",views.reactapp,name='redirect_home_usefullinks'),

path("account/userprofile/",views.reactapp,name='redirect_account_userprofile'),
path("account/settings/",views.reactapp,name='redirect_account_settings'),
path("account/billing/",views.reactapp,name='redirect_account_billing'),



path("video/<str:meetingroomstring>/",views.reactappvideomeet, name='redirect_videoApp'),




path("course/summary/",views.reactapp,name='redirect_course_summary'),
path("course/chat/",views.reactapp,name='redirect_course_chat'),
path("course/classes/",views.reactapp,name='redirect_course_classes'),
path("course/grades/",views.reactapp,name='redirect_course_grades'),



path("dashboard/subject/",views.reactapp,name='redirect2'),
path("dashboard/news/",views.reactapp,name='redirect3'),



path("messages/chat/",views.reactapp,name='redirect4'),
path("messages/email/",views.reactapp,name='redirect5'),
path("messages/tickets/",views.reactapp,name='redirect6'),





path("class/overview/",views.reactapp,name='redirect8'),
path("class/detail/",views.reactapp,name='redirect9'),
path("class/specifics/",views.reactapp,name='redirect10'),




]






