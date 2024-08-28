from django.urls import path,re_path
from .views import CourseDesignedForView,  ClassObjbyId ,ClassViewPk, SubjectView, CourseViewTeacherId,CourseViewValueTeacherId, CourseDesignedForViewId, AddCourseToDashboardView, CourseExistsInDashboardView, CourseDeleteView, CourseRemoveView, CourseViewIdEnrollReject, EditOneDashboardCourseView, AddCourseLinkCourseView, GetCourseLinksByCourseIdView, GetCourseFilesByCourseIdView
from .views import CourseViewByGlobalCode,CourseViewId, CourseUpdateViewByGlobalCode,CourseViewIdEnrollRequest, CourseViewIdEnroll, CreateCourseView, AddYoutubeVideoCourseView, GetVideosByCourseIdView, AddCourseFileView, CourseCardImageUploadAPIView, CreateNewCourseView, CourseSummaryViewId, PublicCourseSearchView, PublishCourseView, UnPublishCourseView
from .views import AddPeopleToCourseView, SearchCourseView, RemovePeopleFromCourseView, CourseEnrollmentCountView, AddTeachersToCourseView, RemoveTeachersFromCourseView, GetTeachersForCourseView
from .views import CourseMemberListView, EnrolmentRequestListView
from .views import AddAdminToCourseView, RemoveAdminFromCourseView 
from .views import UserSearchForAddingPeopleToCourseView, GetAdminsForCourseView
from .views import DeleteYoutubeVideoView, DeleteCourseLinkView, DeleteCourseFileView
from .views import AdminCoursesView
from .views import UserSearchForAddingTeacherToCourseView, UserSearchForAddingAdminToCourseView, UserSearchForAddingStudentToCourseView





urlpatterns = [
    
    path('coursecategories/',CourseDesignedForView.as_view(), name='coursecategories/'),
    path('classnamebyId/<int:pk>/',CourseDesignedForViewId.as_view(), name='CourseDesignedForViewId'),
    #path('comments/<int:groupId>/', ChatCommentsbyGroupId.as_view(), name='chatcommentsbygroupId'),
    #path('names/', CourseView.as_view(),name='courses'),
    path('create/',CreateCourseView.as_view(),name='create_course'),

    path('publish/<int:courseId>/',PublishCourseView.as_view(), name='publish_course'),
    path('unpublish/<int:courseId>/',UnPublishCourseView.as_view(), name='unpublish_course'),
    path('publiccoursesearch/',PublicCourseSearchView.as_view(), name='PublicCourseSearchView'),
    path('createnewcourse/',CreateNewCourseView.as_view(),name='create_course'),
    path('editonedashboardcourse/<int:pk>/',EditOneDashboardCourseView.as_view(),name='edit_course'),
    path('addyoutubevideo/<int:pk>/', AddYoutubeVideoCourseView.as_view(),name='add_youtube_video'),
    path('addlinktocourse/<int:pk>/',AddCourseLinkCourseView.as_view(),name="add_course_link"),
    path('addfiletocourse/<int:pk>/',AddCourseFileView.as_view(),name="add_file_tocourse"),


    path('deleteyoutubevideo/<int:pk>/', DeleteYoutubeVideoView.as_view(),name='Delete_youtube_video'),
    path('deletelinktocourse/<int:pk>/',DeleteCourseLinkView.as_view(),name="Delete_course_link"),
    path('deletefiletocourse/<int:pk>/',DeleteCourseFileView.as_view(),name="Delete_file_tocourse"),


    path('getvideosbycourseId/<int:pk>/', GetVideosByCourseIdView.as_view(),name='get_videos_by_courseId'),
    path('getlinksbycourseId/<int:pk>/', GetCourseLinksByCourseIdView.as_view(),name='get_link_by_courseId'),
    path('getfilesbycourseId/<int:pk>/', GetCourseFilesByCourseIdView.as_view(),name='get_coursefiles_by_courseId'),
    path('names/<int:teacherId>/', CourseViewTeacherId.as_view(),name="courseViewTeacherId"),
    path('code/<int:courseGlobalCode>/', CourseViewByGlobalCode.as_view(),name="CourseViewByGlobalCode" ),
    path('update/<int:courseGlobalCode>/', CourseUpdateViewByGlobalCode.as_view(),name="CourseUpdateViewByGlobalCode" ),
    path('addcourse/<int:pk>/', AddCourseToDashboardView.as_view(),name="addCourseStudent"),
    #to be used for student account only
    path('courseexistindashboard/<int:pk>/', CourseExistsInDashboardView.as_view(),name="CheckIf course Exist in dash"),
    path('value/', CourseViewValueTeacherId.as_view(),name="courseViewValueTeacherId"),
    path('class/<int:pk>/', ClassViewPk.as_view(), name='classobjbyid'),
    path('subjects/<int:classname>/<str:board>/', SubjectView.as_view(),name='subjectsbyclassnoard'),
    path('object/<int:pk>/', CourseViewId.as_view()),
    path('objectsummary/<int:pk>/',CourseSummaryViewId.as_view(), name='CourseSummaryViewId'),
    path('enrollrequest/<int:pk>/', CourseViewIdEnrollRequest.as_view(), name='CourseViewIdEnrollRequest'),
    path('enroll/<int:pk>/', CourseViewIdEnroll.as_view(), name='CourseViewIdEnroll'),
    path('enrollrequestreject/<int:pk>/', CourseViewIdEnrollReject.as_view(), name='CourseViewIdEnrollReject'),
    path('delete/<int:pk>/', CourseDeleteView.as_view(), name="course_delete"),
    path('remove/<int:pk>/', CourseRemoveView.as_view(), name="course_remove"),
    path('coursecardimageupload/<int:courseId>/',CourseCardImageUploadAPIView.as_view(), name='CourseCardImageUploadAPIView'),
    path('<int:course_id>/add-people/', AddPeopleToCourseView.as_view(), name='add_people_to_course'),
    path('<int:course_id>/add-teachers/', AddTeachersToCourseView.as_view(), name='add-teachers-to-course'),
    path('<int:course_id>/add-admins/', AddAdminToCourseView.as_view(), name='add-admin-to-course'),
    path('<int:course_id>/remove-people/', RemovePeopleFromCourseView.as_view(), name='remove_people_from_course'),
    path('<int:course_id>/remove-admins/', RemoveAdminFromCourseView.as_view(), name='remove_admin_from_course'),
    path('<int:course_id>/remove-teachers/', RemoveTeachersFromCourseView.as_view(), name='remove-teachers-from-course'),
    path('search/', SearchCourseView.as_view(), name='search_courses'),
    path('<int:course_id>/enrollment_count/', CourseEnrollmentCountView.as_view(), name='course_enrollment_count'),
    path('<int:course_id>/teachers/', GetTeachersForCourseView.as_view(), name='get-teachers-for-course'),
    path('<int:course_id>/admins/', GetAdminsForCourseView.as_view(), name='get-admins-for-course'),
    path('<int:course_id>/members/', CourseMemberListView.as_view(), name='course-member-list'),
    path('<int:course_id>/enrolment-requests/', EnrolmentRequestListView.as_view(), name='enrolment-requests-list'),

    path('usersearch/<int:course_id>/',UserSearchForAddingPeopleToCourseView.as_view(), name='UserSearchForAddingPeopleToCourseView'),

    path('usersearchforaddingteacher/<int:course_id>/',UserSearchForAddingTeacherToCourseView.as_view(), name='UserSearchForAddingTeacherToCourseView'),
    path('usersearchforaddingadmin/<int:course_id>/',UserSearchForAddingAdminToCourseView.as_view(), name='UserSearchForAddingAdminToCourseView'), 
    path('usersearchforaddingstudent/<int:course_id>/',UserSearchForAddingStudentToCourseView.as_view(), name='UserSearchForAddingStudentToCourseView'),
    path('admincourses/',AdminCoursesView.as_view(), name="dashboard_courses_admin_owner_teacher"),

   



    ]












