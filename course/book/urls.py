from django.urls import path,re_path

from .views import BookView,ImageUploadTestView,ImageUploadTestAPIView, BookAPIView


urlpatterns = [

path('objects/', BookAPIView.as_view(),name='book_view'),

path('uploadtest/', ImageUploadTestView.as_view(),name='upload_test'),


path('upload/', ImageUploadTestAPIView.as_view(),name='upload_test2'),
]


