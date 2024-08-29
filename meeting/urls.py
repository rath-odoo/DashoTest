from django.urls import path,re_path

from .views import MeetingView, MeetingMultiCreateView, MeetingViewPk, EditMeetingView, PresentationCreateView,TalkUploadAPIView, PresentationViewPk, PresentationPUTViewPk, DashboardMeetingView, MeetingMultiCreateView, MeetingMultiCreatePersonalView


from .views import CreateOneMeetingView 
#, CreateMultiMeetingView


urlpatterns = [

  #to be depreciated      
  #path('all/', MeetingView.as_view(),name='meeting_view'),
  #path('multicreate/', MeetingMultiCreateView.as_view(), name='meetingmulti_view'),
  #path('allpersonal/', DashboardMeetingView.as_view(), name="Dashboard_Personal_Meetings"),
  #path('multicreatepersonal/', MeetingMultiCreatePersonalView.as_view(), name="meetingmultipersonal_view"),
   
  path('createone/',CreateOneMeetingView.as_view(), name="create_one_meeting_view"),
  #path('createmulti',CreateMultiMeetingView.as_view(), name="create_multi_meeting_view"),

  path('object/<int:pk>/', MeetingViewPk.as_view(), name='meetingobjbyid'),
  path('editmeeting/<int:pk>',EditMeetingView.as_view(),name="editmeetingurls"),
  path('createpresentation/',PresentationCreateView.as_view(), name = "create_presentation"),
  path('uploadtalk/', TalkUploadAPIView.as_view(),name="upload_talk"),
  path('presentation/delete/<int:pk>', PresentationViewPk.as_view(),name="ppt_delete"),
  path('presentation/put/<int:pk>', PresentationPUTViewPk.as_view(),name='ppt_put'),
  path('dashboardmeetings/', DashboardMeetingView.as_view(),name='dashboardmeeting_view'),




]
