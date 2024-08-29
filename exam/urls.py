from django.urls import path
from .views import CreateExamView,  EditBasicExamView
from .views import ExamCreateView, ExamUpdateView, ExamDeleteView, HierarchicalFilterView, ExamSubExamCreateView, ExamSubExamUpdateView, ExamSubExamDeleteView, ExamSubExamDetailView

app_name = 'exam_api'

urlpatterns = [
        #path('get/<int:courseId>/', GetAssignmentView.as_view(), name='exam_list_assignment'),
        path('create/', CreateExamView.as_view(), name='create_exam'),
        path('delete/<int:examId>/', EditBasicExamView.as_view(),name="delete_exam"),
        path('editbasic/<int:examId>/', EditBasicExamView.as_view(), name="edit_basic_examinfo"),
        path('create-exam/<int:user_id>/', ExamCreateView.as_view(), name='create-exam'),
        path('update-exam/<int:exam_id>/', ExamUpdateView.as_view(), name='update-exam'),
        path('delete-exam/<int:exam_id>/', ExamDeleteView.as_view(), name='delete-exam'),
        path('institute-course-class-exam/', HierarchicalFilterView.as_view(), name='hierarchical-filter'),
        path('create-exam-sub-exam/<int:user_id>/', ExamSubExamCreateView.as_view(), name='create-exam-sub-exam'),
        path('update-exam-sub-exam/<int:exam_id>/', ExamSubExamUpdateView.as_view(), name='update-exam'),
        path('delete-exam-sub-exam/<int:exam_id>/', ExamSubExamDeleteView.as_view(), name='delete-exam'),
        path('exam-details/', ExamSubExamDetailView.as_view(), name='exam-subexam-detail'),

]
