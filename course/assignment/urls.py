from django.urls import path

from .views import GetAssignmentView, CreateAssignmentView
from .views import AssignmentCreateView, AssignmentUpdateView, AssignmentDeleteView, AssignmentFilterView
from .views import CreatorAssignmentsView, SubmitAnswerFilesView, AssignmentSubmissionsView
from .views import AssignmentSubmissionReplaceView, AssignmentAttachmentDeleteView, AssignmentDetailView, SubmitAnswerFilesQuestionView
app_name = 'assignments_api'

urlpatterns = [
    path('get/<int:courseId>/', GetAssignmentView.as_view(), name='list_assignment'),
    #path('create/<int:pk>/', CreateAssignmentView.as_view(), name='create_assignment'), to be depreciated
    path('create-assignments/create/<int:user_id>/', AssignmentCreateView.as_view(), name='create-assignment'),
    path('update/<int:pk>/user/<int:user_id>/', AssignmentUpdateView.as_view(), name='update-assignment'),
    path('assignments-delete/<int:pk>/', AssignmentDeleteView.as_view(), name='assignment-delete'),
    path('attachments/<int:attachment_id>/', AssignmentAttachmentDeleteView.as_view(), name='assignment-attachment-delete'),
    path('assignment-details/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),
    path('filter/', AssignmentFilterView.as_view(), name='assignment-filter'),
    path('creator/assignments/', CreatorAssignmentsView.as_view(), name='creator-assignments'),
    path('<int:assignment_id>/submit/<int:user_id>', SubmitAnswerFilesView.as_view(), name='submit-answer-files'),
    path('<int:course_id>/assignments/<int:assignment_id>/submissions/', AssignmentSubmissionsView.as_view(), name='assignment-submissions'),
    path('<int:assignment_id>/users/<int:user_id>/updatesubmissions/<int:attachment_id>', AssignmentSubmissionReplaceView.as_view(), name='replace-assignment-submissions'),
    path('submit-answer-files/<int:assignment_id>/<int:user_id>/<int:question_file_id>/', SubmitAnswerFilesQuestionView.as_view(), name='submit-answer-files')

]
