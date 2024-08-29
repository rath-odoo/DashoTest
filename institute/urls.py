from django.urls import path,re_path

from .views import CreateInstituteView, GetMyInstitutesView, GetOneInstituteByIdView, InstituteDeleteView, EditInstituteNameLogoView, EditInstituteWebUrlView, EditInstituteAddressView, AddDocumentView, AddInstituteMembers,DeleteInstituteMember,AddTypeToInstitute
from .views import InstituteMembersAttendanceView, UpdateAttendanceView, FilterAttendanceView, LinkCourseToInstituteView, LeaveCreateView, LeaveUpdateView, LeavesApprovalView, UserLeavesListView, DelinkCourseFromInstituteView, CreateAttendanceView
from .views import LeaveDeleteView, LeaveEditView, UpdateLeaveStatusView, ApproverListView, EditUserRoleView,AssetCreateView, AssetUpdateView, AssetListView, AssetDeleteView
from .views import TimeTableCreateView, TimeTableUpdateView, TimeTableDeleteView, TimetableFilterView
from .views import GetInstituteCoursesView, CreateInstituteOfficialView, EditInstituteOfficialView, DeleteInstituteOfficialView, GetInstituteOfficialsByInstituteIDView,CreateGroupForInstituteView, GetAllMembersInGroupView
from .views import AddPostToGroupView,EditPostView,DeletePostView, AddCommentToPostView, EditCommentView, DeleteCommentView, PostListView, LikePostView, GetInstituteMembers
from .views import SchedulePaymentView, EditScheduledPaymentView, DeleteScheduledPaymentView, GetFeePaymentsView, ProcessScheduledPaymentView, ProcessDirectPaymentView, DeleteFeeView, DeleteTransactionView, DeleteDocumentView , DeleteSocialMediaIconView
from .views import UpdateMultipleInstituteMembers, UserListByInstituteView, UserListByCourseInInstituteView, ArchiveCourseView, UnarchiveCourseView, CourseListView
from .views import CreateCourseAttendanceView, UpdateCourseAttendanceView, DeleteCourseAttendanceView, AttendanceCourseListView, InstituteCourseSessionView
from .views import EditSocialMediaLinkInstituteView,GetSocailMediaLinkInInstituteView, CombinedAttendanceAndLeaveView, SummaryView, SummaryViewInstituteWise, SummaryViewUserWise,LeaveBalanceView
from .views import CreateLeavePolicyView, UpdateLeavePolicyView, DeleteLeavePolicyView, GetLeavePolicyListView, GetDetailPaymentReportView, DeleteMemberLeavePolicyView
from .views import InstituteBankDetailsCreateView, InstituteBankDetailsUpdateView, InstituteBankDetailsDeleteView,InstituteBankDetailsListView
from .views import MemberInstituteDetailsAPIView, InstituteTransactionListView, ApproverAttendanceListView
from .views import DocumentCreateView, DocumentUpdateView, DocumentGetView, DocumentDeleteView
from .views import UploadStudents, UploadStudentsToCourse
from .views import CreateBatchView, EditBatchView, DeleteBatchView, ListBatchView, LinkCourseToBatchView, DelinkCourseFromBatchView,AddMembersToBatchView, RemoveMembersFromBatchView
from .views import BatchMemberListView, AddGradeView, UploadGradesView, BatchGradesView, BatchAttendanceUpdateView, BatchAttendanceUpdateByIdView, BatchAttendanceListView, ClassCourseAttendanceCreateView, ClassCourseAttendanceUpdateView, ClassCourseAttendanceListView
from .views import ListBatchTimeTableView,BatchEnrolledStudentsCourseView, BatchEnrolledStudentsCourseExamView
from .views import BatchTimetableCreateView, BatchTimetableUpdateView, BatchTimetableDeleteView, BatchTimetableDetailView, BatchTimetableListView, BatchExcelDownloadView, BatchEnrolledStudentsView, BatchExamSubExamGradesView


from .views import InstituteBatchTimeTableListView, EditGradeView, DeleteGradeView, UploadBatchMembers


urlpatterns = [
    path('create/', CreateInstituteView.as_view(),name='create_institute_view'),
    path('getmyinstitutes/', GetMyInstitutesView.as_view(),name='get_myinstitutes_view'),
    path('getoneinstitutebyid/<int:instId>/', GetOneInstituteByIdView.as_view(),name='get_oneInstitute_by_id'),
    path('delete/<int:instId>/', InstituteDeleteView.as_view(), name="delete_institute_view"),
    path('editinstitutenamelogo/<int:instId>/', EditInstituteNameLogoView.as_view(),name="edit_institute_name_logo"),
    path('editinstituteweburl/<int:instId>/', EditInstituteWebUrlView.as_view(),name="edit_institute_weburl"),
    path('editinstituteaddress/<int:instId>/', EditInstituteAddressView.as_view(),name="edit_institute_address"),
    path('adddocument/<int:institute_id>/by/<int:user_id>/', AddDocumentView.as_view(), name="document_add"),
    path('deletedocument/<int:document_id>/', DeleteDocumentView.as_view(),name="delete_doc_view"),
    path('<int:institute_id>/<int:socialmediaicon_id>/delete/', DeleteSocialMediaIconView.as_view(), name='delete_institute_social_media'),
    path('addmember/<int:instId>/by/<int:addingUserId>/', AddInstituteMembers.as_view(), name="member_add"),
    path('<int:instId>/update-member/<int:userId>/', UpdateMultipleInstituteMembers.as_view(), name='update-institute-member'),
    path('<int:instId>/deletemember/<int:userId>/by/<int:deletingUserId>/', DeleteInstituteMember.as_view(), name='delete_member'),
    path('<int:institute_id>/addtype/by/<int:adding_user_id>/', AddTypeToInstitute.as_view(), name='add_institute_type'),
    path('<int:institute_id>/attendance/', InstituteMembersAttendanceView.as_view(), name='institute_members_attendance'),
    path('attendance/update/<int:institute_id>/<int:updater_user_id>/<int:attendance_id>/', UpdateAttendanceView.as_view(), name='update_attendance'),
    path('<int:institute_id>/filterattendance/', FilterAttendanceView.as_view(), name='filter_attendance'),
    path('<int:institute_id>/linkcourse/by/<int:user_id>/', LinkCourseToInstituteView.as_view(), name='link_course_to_institute'),
    path('<int:institute_id>/user/<int:user_id>/course/delink/', DelinkCourseFromInstituteView.as_view(), name='delink-course'),
    path('<int:institute_id>/courses/', GetInstituteCoursesView.as_view(), name='get-institute-courses'),
    path('<int:institute_id>/create_leave/by/<int:user_id>/', LeaveCreateView.as_view(), name='create_leave'),
    path('<int:institute_id>/<int:user_id>/update_leave/<int:leave_id>/', LeaveUpdateView.as_view(), name='update_leave'),
    path('<int:institute_id>/leave_approvals/<int:user_id>/', LeavesApprovalView.as_view(), name='pending_approvals'),
    path('<int:institute_id>/user_leaves/<int:user_id>/', UserLeavesListView.as_view(), name='user_leaves'),
    path('institute/<int:institute_id>/edit_leave/<int:leave_id>/', LeaveEditView.as_view(), name='edit_leave'),
    path('<int:institute_id>/delete_leave/<int:leave_id>/by/<int:user_id>/', LeaveDeleteView.as_view(), name='delete_leave'),
    path('<int:institute_id>/leaves/<int:leave_id>/update_status/<int:user_id>/', UpdateLeaveStatusView.as_view(), name='update_leave_status'),
    path('<int:institute_id>/approvers/<int:user_id>/', ApproverListView.as_view(), name='approver_list'),
    path('<int:inst_id>/memberships/<int:user_id>/', EditUserRoleView.as_view(), name='edit_user_role'),
    path('<int:institute_id>/create_asset/by/<int:user_id>/', AssetCreateView.as_view(), name='add_asset'),
    path('<int:institute_id>/asset/<int:asset_id>/user/<int:user_id>/update/', AssetUpdateView.as_view(), name='update-asset'),
    path('assets/', AssetListView.as_view(), name='asset-list'),  # URL to get all assets with filtering
    path('<int:institute_id>/asset/<int:asset_id>/user/<int:user_id>/delete/',AssetDeleteView.as_view(), name='delete-asset'),
    path('<int:institute_id>/user/<int:user_id>/create-pdf/',TimeTableCreateView.as_view(), name='create-timetabe'),
    path('<int:institute_id>/user/<int:user_id>/update-timetable/<int:timetable_id>/',TimeTableUpdateView.as_view(), name='create-timetabe'),
    path('<int:institute_id>/user/<int:user_id>/delete-timetable/<int:timetable_id>/', TimeTableDeleteView.as_view(), name='pdf-delete'),
    path('timetables/filter/', TimetableFilterView.as_view(), name='timetable-filter'),
    path('<int:institute_id>/user/<int:user_id>/official/create/', CreateInstituteOfficialView.as_view(), name='create-institute-official'),
    path('<int:institute_id>/official/<int:official_id>/user/<int:user_id>/edit/', EditInstituteOfficialView.as_view(), name='edit-institute-official'),
    path('<int:institute_id>/official/<int:official_id>/user/<int:user_id>/delete/', DeleteInstituteOfficialView.as_view(), name='delete-institute-official'),
    path('<int:institute_id>/officials/', GetInstituteOfficialsByInstituteIDView.as_view(), name='get-institute-officials-by-institute-id'),
    path('<int:institute_id>/by/<int:user_id>/create-group/', CreateGroupForInstituteView.as_view(), name='create-group'),
    path('groups/<int:group_id>/members/', GetAllMembersInGroupView.as_view(), name='get-all-members-in-group'),  # URL for retrieving all group members
    path('<int:institute_id>/group/<int:group_id>/user/<int:user_id>/add-post/', AddPostToGroupView.as_view(), name='add-post-to-group'),  # URL for adding post to group
    path('<int:institute_id>/post/<int:post_id>/user/<int:user_id>/edit/', EditPostView.as_view(), name='edit-post'),  # URL to edit a post
    path('<int:institute_id>/post/<int:post_id>/user/<int:user_id>/delete/', DeletePostView.as_view(), name='delete-post'),  # URL for deleting a post
    path('<int:institute_id>/post/<int:post_id>/user/<int:user_id>/add-comment/', AddCommentToPostView.as_view(), name='add-comment-to-post'),  # URL for adding a comment to a post
    path('<int:institute_id>/comment/<int:comment_id>/user/<int:user_id>/edit/', EditCommentView.as_view(), name='edit-comment'),  # URL for editing a comment
    path('<int:institute_id>/comment/<int:comment_id>/user/<int:user_id>/delete/', DeleteCommentView.as_view(), name='delete-comment'),  # URL for deleting a comment
    path('posts/', PostListView.as_view(), name='post-list'),
    path('<int:institute_id>/group/<int:group_id>/post/<int:post_id>/user/<int:user_id>/like/', LikePostView.as_view(), name='like-post'),  # URL for liking a post
    path('<int:instId>/members/', GetInstituteMembers.as_view(), name='institute-members'),
    path('<int:institute_id>/user/<int:admin_user_id>/schedule_payment/', SchedulePaymentView.as_view(), name='schedule_payment'),
    path('<int:institute_id>/user/<int:user_id>/fee/<int:fee_id>/edit/', EditScheduledPaymentView.as_view(), name='edit_scheduled_payment'),
    path('<int:institute_id>/fee/<int:fee_id>/user/<int:user_id>/deleteschedule/', DeleteScheduledPaymentView.as_view(), name='delete_scheduled_payment'),
    path('<int:institute_id>/fee/<int:fee_id>/user/<int:user_id>/installment/<int:installment_id>/deleteinstallmentpayment/', DeleteScheduledPaymentView.as_view(), name='delete_payment_installment'),
    path('user/fees/', GetFeePaymentsView.as_view(), name='get_fee_payments_with_date_range'),
    path('<int:institute_id>/user/<int:user_id>/fee/<int:fee_id>/processscheduled/', ProcessScheduledPaymentView.as_view(), name='process_scheduled_payment'),
    path('<int:institute_id>/user/<int:user_id>/processdirect/', ProcessDirectPaymentView.as_view(), name='process_direct_payment'),
    path('<int:institute_id>/user/<int:user_id>/transaction/<int:transaction_id>/delete/', DeleteTransactionView.as_view(), name='delete_transaction'),
    path('<int:institute_id>/user/<int:user_id>/fee/<int:fee_id>/deletedetailed/', DeleteFeeView.as_view(), name='delete_fee'),
    # path('<int:institute_id>/user/<int:user_id>/fee/<int:fee_id>/edit/', EditFeeView.as_view(), name='edit_fee'),
    path('users/', UserListByInstituteView.as_view(), name='user-list-by-institute'),
    path('users/institute-course', UserListByCourseInInstituteView.as_view(), name='user-list-by-institute-course'),
    path('payment/<int:fee_id>/', GetDetailPaymentReportView.as_view(),name="get_detail_payment_report"),
    path('transactions/', InstituteTransactionListView.as_view(), name='institute-transaction-list'),
    path('<int:institute_id>/course/<int:course_id>/user/<int:user_id>/attendance/', CreateCourseAttendanceView.as_view(), name='create-attendance'),
    path('attendance/update/', UpdateCourseAttendanceView.as_view(), name='update-attendance'),
    path('attendance/delete/', DeleteCourseAttendanceView.as_view(), name='delete-attendance'),
    path('attendance/list/', AttendanceCourseListView.as_view(), name='list-attendance'),
    path('details/', InstituteCourseSessionView.as_view(), name='details'),
    path('archive-course/<int:institute_id>/<int:course_id>/<int:user_id>/', ArchiveCourseView.as_view(), name='archive-course'),
    path('unarchive-course/<int:institute_id>/<int:course_id>/<int:user_id>/', UnarchiveCourseView.as_view(), name='unarchive-course'),
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('attendance/create/<int:institute_id>/<int:creator_user_id>/', CreateAttendanceView.as_view(), name='create_attendance'),
    path('<int:institute_id>/edit_type/<int:editing_user_id>/<int:type_id>/', EditSocialMediaLinkInstituteView.as_view(),name='edit_type_in_institute'),
    path('<int:institute_id>/social_media_links/<int:user_id>/', GetSocailMediaLinkInInstituteView.as_view(), name='get_type_in_institute'),
    path('<int:institute_id>/combined_attendance_leave/', CombinedAttendanceAndLeaveView.as_view(), name='combined-attendance-leave'),
    path('<int:user_id>/<int:institute_id>/summary/', SummaryView.as_view(), name='summary'),
    path('<int:user_id>/summary-user/', SummaryViewUserWise.as_view(), name='summary_institute'),
    path('<int:institute_id>/summary-institute/', SummaryViewInstituteWise.as_view(), name='summary_user'),
    path('<int:institute_id>/user/<int:user_id>/leave_balance/', LeaveBalanceView.as_view(), name='leave_balance'),
    path('<int:institute_id>/user/<int:user_id>/leave_policy/', CreateLeavePolicyView.as_view(), name='update_leave_policy'),
    path('<int:institute_id>/users/<int:user_id>/leave-types/<int:leave_type_id>/update-policy/', UpdateLeavePolicyView.as_view(), name='update-leave-policy'),
    path('<int:institute_id>/user/<int:user_id>/leave_policy/<int:leave_type_id>/', DeleteLeavePolicyView.as_view(), name='delete_leave_policy'),
    path('<int:institute_id>/user/<int:user_id>/leave_policy/<int:leave_type_id>/member/<int:member_type_id>/', DeleteMemberLeavePolicyView.as_view(), name='delete_leave_policy'),
    path('<int:institute_id>/leave_policy/', GetLeavePolicyListView.as_view(), name='list_leave_policy'),
    path('<int:institute_id>/users/<int:user_id>/bank-details/', InstituteBankDetailsCreateView .as_view(), name='create_bank_details'),
    path('<int:institute_id>/users/<int:user_id>/bank-details/<int:bank_details_id>/',  InstituteBankDetailsUpdateView.as_view(), name='update_bank_details'),
    path('<int:institute_id>/users/<int:user_id>/delete-bank-details/<int:bank_details_id>/', InstituteBankDetailsDeleteView.as_view(), name='delete-bank-details'),
    path('bank-details/', InstituteBankDetailsListView.as_view(), name='list-bank-details'),
    path('member/<int:member_id>/institute/<int:institute_id>/', MemberInstituteDetailsAPIView.as_view(), name='member-institute-details'),
    path('<int:institute_id>/approver/<int:approver_id>/attendance/', ApproverAttendanceListView.as_view(), name='approver-attendance-list'),
    path('<int:institute_id>/users/<int:user_id>/add-document/', DocumentCreateView.as_view(), name='add-document'),
    path('<int:document_id>/update-document/', DocumentUpdateView.as_view(), name='update-document'),
    path('documents/', DocumentGetView.as_view(), name='list-documents'),  # For listing all documents
    path('<int:document_id>/delete-documents/', DocumentDeleteView.as_view(), name='delete-document'),
    path('<int:instId>/users/<int:userId>/upload-students/', UploadStudents.as_view(), name='upload-student'),
    path('<int:instId>/<int:courseId>/<int:userId>/upload-students-to-course/', UploadStudentsToCourse.as_view(), name='upload_students_to_course'),
    path('create-batch/', CreateBatchView.as_view(), name='create_batch'),
    path('edit-batch/<int:pk>/<int:user_id>/', EditBatchView.as_view(), name='edit_batch'),
    path('delete-batch/<int:pk>/<int:user_id>/', DeleteBatchView.as_view(), name='delete_batch'),
    path('list-batches/', ListBatchView.as_view(), name='list_batches'),
    path('list-batches-timetable/', ListBatchTimeTableView.as_view(), name='list_batches-timetable'),
    path('link-courses-to-batch/<int:pk>/<int:user_id>/', LinkCourseToBatchView.as_view(), name='link_courses_to_batch'),
    path('delink-courses-from-batch/<int:pk>/<int:user_id>/', DelinkCourseFromBatchView.as_view(), name='delink_courses_from_batch'),
    path('batches/<int:batch_id>/add-members/<int:user_id>/', AddMembersToBatchView.as_view(), name='add-members-to-batch'),
    path('batches/<int:batch_id>/remove-members/<int:user_id>/', RemoveMembersFromBatchView.as_view(), name='remove-members-from-batch'),
    path('batches/<int:batch_id>/members/', BatchMemberListView.as_view(), name='batch-members'),
    path('batches/add-grade/<int:user_id>/', AddGradeView.as_view(), name='add-grade'),
    path('batches/<int:batch_id>/upload-grades/<int:user_id>/', UploadGradesView.as_view(), name='upload-grades'),
    path('batches/<int:batch_id>/grades/', BatchGradesView.as_view(), name='batch-grades'),
    path('batches/<int:batch_id>/attendance/<int:user_id>/', BatchAttendanceUpdateView.as_view(), name='batch-attendance-update'),
    path('batches/<int:user_id>/batch/<int:batch_id>/attendance/<int:attendance_id>/', BatchAttendanceUpdateByIdView.as_view(), name='batch-attendance-update-by-id'),
    path('batches/', BatchAttendanceListView.as_view(), name='attendance-list'),
    path('classcourseattendances/<int:user_id>/attendances/create/', ClassCourseAttendanceCreateView.as_view(), name='attendance-create'),
    path('classcourseattendances/<int:user_id>/attendances/update/', ClassCourseAttendanceUpdateView.as_view(), name='attendance-update'),
    path('classcourseattendances/', ClassCourseAttendanceListView.as_view(), name='attendance-list'),
    path('batches/<int:institute_id>/', InstituteBatchTimeTableListView.as_view(), name='batchtimetable-list'),
    path('batch/download_excel/', BatchExcelDownloadView.as_view(), name='batch-excel-download'),
    path('batches/<int:batch_id>/enrolled-students/', BatchEnrolledStudentsView.as_view(), name='batch-enrolled-students'),
    path('batches/<int:batch_id>/course-enrolled-students/', BatchEnrolledStudentsCourseView.as_view(), name='batch-enrolled-students'),
    path('batches/<int:batch_id>/course-exam-enrolled-students/', BatchEnrolledStudentsCourseExamView.as_view(), name='batch-enrolled-students'),
    path('batches/edit-grade/<int:user_id>/<int:pk>/', EditGradeView.as_view(), name='edit-grade'),
    path('batches/delete-grade/<int:user_id>/<int:pk>/', DeleteGradeView.as_view(), name='delete-grade'),
    path('batches/<int:batch_id>/exam-subexam-grades/', BatchExamSubExamGradesView.as_view(), name='batch-exam-subexam-grades'),
    path('batches/<int:batchId>/users/<int:userId>/upload-batch-members/', UploadBatchMembers.as_view(), name='upload_students_to_batch'),


    # List of time tables added by Bibhu
    path('batchtimetables/create/<int:user_id>/', BatchTimetableCreateView.as_view(), name='batchtimetable-create'),
    path('batchtimetables/update/<int:pk>/<int:user_id>/', BatchTimetableUpdateView.as_view(), name='batchtimetable-update'),
    path('batchtimetables/delete/<int:pk>/<int:user_id>/', BatchTimetableDeleteView.as_view(), name='batchtimetable-delete'),
    path('batchtimetables/<int:pk>/<int:user_id>/', BatchTimetableDetailView.as_view(), name='batchtimetable-detail'),
    path('batchtimetables/', BatchTimetableListView.as_view(), name='batchtimetable-list'),
    
]