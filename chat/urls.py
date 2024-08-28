from django.urls import path
from . import views
from .views import ChatCommentsAll,ChatCommentsbyGroupId, ChatGroups, GroupInfoByIdView,  SearchPersonalChatGroupView


urlpatterns = [
    path('temp/', views.chatindex, name='chatindex'),
    path('temp/<str:room_name>/', views.room, name='room'),
    path('comments/',ChatCommentsAll.as_view(), name='chatcomments'),
    path('comments/<int:groupId>/', ChatCommentsbyGroupId.as_view(), name='chatcommentsbygroupId'),#dont use this method, will be slow 
    path('groups/', ChatGroups.as_view(),name='chatgroups'), 
    path('groups/<int:groupId>/',GroupInfoByIdView.as_view(),name="groupInfoById_view"),    
    path('searchpersonalchatgroup/<str:namestring>/', SearchPersonalChatGroupView.as_view()),

]








