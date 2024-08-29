from django.urls import path,re_path

from .views import NoticeBoardView, NoticeBoardViewId, DashboardNoticesView,NoticeDeleteViewId, NoticeRemoveViewId 
from .views import CreateNoticeView, EditNoticeView, DeleteNoticeView,ListNoticesView, CourseNoticesView
urlpatterns = [

path('create-notice/<int:user_id>/users/', CreateNoticeView.as_view(), name='create_notice_with_user'),
path('edit-notice/<int:pk>/<int:user_id>/', EditNoticeView.as_view(), name='edit_notice'),
path('delete-notice/<int:pk>/<int:user_id>/', DeleteNoticeView.as_view(), name='delete_notice'),
path('list-notices/', ListNoticesView.as_view(), name='list_notices'),

path('all/',NoticeBoardView.as_view(), name='noticeboard/'),
path('all/<int:pk>/',NoticeBoardViewId.as_view(), name='noticeboard_byid'),
path('dashboardpersonalnotices/', DashboardNoticesView.as_view(), name='DashboardPersonalNoticesView'),

path('delete/<int:pk>/',NoticeDeleteViewId.as_view(), name='noticeboard_delete_byid'),
path('remove/<int:pk>/',NoticeRemoveViewId.as_view(), name='noticeboard_remove_byid'),
path('notices/course/<int:course_id>/', CourseNoticesView.as_view(), name='course-notices'),




]
