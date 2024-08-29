# In your urls.py file
from django.urls import path
from .views import GradeCreateView, GradeUpdateView, GradeDeleteView, HierarchicalGradeFilterView, AddGradeView, BulkGradeCreateView, GradeFilterView, GradeUploadView, EditGradeView

urlpatterns = [
    path('create-grade/', GradeCreateView.as_view(), name='create-grade'),
    path('bulk_create/', BulkGradeCreateView.as_view(), name='bulk-grade-create'),
    path('update-grade/<int:grade_id>/', GradeUpdateView.as_view(), name='update-grade'),
    path('delete-grade/<int:grade_id>/', GradeDeleteView.as_view(), name='delete-grade'),
    path('filter-hierarchical-grades/', HierarchicalGradeFilterView.as_view(), name='filter-hierarchical-grades'),
    path('filter/', GradeFilterView.as_view(), name='grade-filter'),
    path('upload/', GradeUploadView.as_view(), name='grade-upload'),
    path('<int:assignment_id>/assignment/<int:user_id>/user/add-grade', AddGradeView.as_view(), name='add_grade'),
    path('edit-grade/<int:grade_id>/<int:user_id>/', EditGradeView.as_view(), name='edit-grade'),

]
