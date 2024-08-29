from django.urls import path,re_path
from .views import SyllabusView, SyllabusByIdView, ChapterView, ChapterByIdView, SectionView, SectionByIdView, TopicView, TopicByIdView,ChapterNumberView, CreateSyllabusView, SectionEditByIdView, EditChapterByIdView, DeleteChapterView

urlpatterns = [
    path('createsyllabus/', CreateSyllabusView.as_view(),name="create_syllabus_view"),
    path('names/', SyllabusView.as_view(),name='syllabus_view'),
    path('names/<int:pk>/',SyllabusByIdView.as_view(),name="syllabusById_view"),
    path('chapter/', ChapterView.as_view(),name='chapter_view'),
    path('chapter/<int:pk>/', ChapterByIdView.as_view(),name="chapterById_view"),
    path('editchapter/<int:pk>/', EditChapterByIdView.as_view(),name="EditchapterById_view"),
    path('deletechapter/<int:sid>/<int:cid>/', DeleteChapterView.as_view(),name="Delete_ChapterView" ),
    path('chapternumber/', ChapterNumberView.as_view(), name='chapter_number_view'),
    path('section/', SectionView.as_view(),name='section_view'),
    path('section/<int:pk>/', SectionByIdView.as_view(),name="sectionById_view"),
    path('editsection/<int:pk>/', SectionEditByIdView.as_view(),name="sectionEditbyId_view"),
    path('topic/', TopicView.as_view(),name='topic_view'),
    path('topic/<int:pk>/', TopicByIdView.as_view(),name="topicById_view"),

]
