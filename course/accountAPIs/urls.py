from django.urls import path
from .views import AccountView,AccountViewwPk,BlacklistTokenUpdateView,UsersView, AccountViewDashboardcourses, AccountViewNoticeIds, ProfileImageUploadAPIView, CreateAccountBasicView, UserCheckFromUserNameView, GeneralMeetingsView, AccountViewNoticeIdRemove, ChangeUserTypeView,InstituteSearchView
from .views import CreateOTPAccountWithPhoneView, UserProfileGETPUTView, OfficeIDUploadAPIView, GovtID1UploadAPIView, GovtID2UploadAPIView, DOBCertUploadAPIView, EduDegreeView, SearchUserView, ContactAddPUTView, EduDegreeCreateView, DegreeNamesView, InstituteNamesView, EduDegreeDeleteView,AchievementsView, AddressView, VerifyCaptchaView, FewUsersView, UserSearchView, CheckUsedAddedView, GeneralChatGroupView, CourseChatGroupView, SearchCourseChatGroupView
from .views import  CreateUseFullLinkView, GetUseFullLinksView, EditDeleteUseFullLinkView, ContactUsersSearchView, MyContactsView
from .views import CreateAccountView, UserCheckFromUserInputView,  CreateOTPForEmailLoginView, CreateOTPForPhoneLoginView, UpdateUsersNameView
from .views import AddAcademicDetailView, EditAcademicDetailView, DeleteAcademicDetailView, RemoveSkillFromAcademicDetailView, GetAcademicDetailsForUserView
from .views import AddAboutUsForUserView, EditAboutUsView,GetAboutUsByUserIdView, AddExperienceForUserView, EditExperienceForUserView
from .views import DeleteExperienceView, GetExperienceByUserIdView, AddPublicationView, EditPublicationView, DeletePublicationView, GetPublicationsByUserIdView
from .views import AddLicenseOrCertificateView, EditLicenseOrCertificateView,DeleteLicenseOrCertificateView, GetLicensesByUserIdView
from .views import UpdateUserContactView, RaiseDeleteRequestView, AccountListView
from .views import AddAddressForUserView, UpdateAddressForUserView, DeleteAddressForUserView, GetAddressesForUserView
from django.conf.urls import include, url
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CustomTokenObtainPairView, trigger_tasks
from .views import upload_video, video_detail
from .views import GenerateJWTView
from .views import AddParentDetailsView, UpdateParentDetailsView, DeleteParentDetailsView, GetParentDetailsView
from .views import UpdateHealthDataForUserView, GetHealthDataForUserView, DeleteHealthDataForUserView
from .views import EditAboutUserView, SendContactRequestView, RespondContactRequestView, UserContactRequestsView

from .views import DeleteContactView
#DashboardNoticesView
app_name= 'accountAPIs'
#router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)
#router.register(r'groups', GroupViewSet)

urlpatterns = [
        path('account/',AccountView.as_view(), name='account_view'),

        # path('', AccountView.as_view()),
        path('customtoken/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),        
        path('createaccount/', CreateAccountView.as_view(),name="createaccount_any"),
        path('dashboardcourses/', AccountViewDashboardcourses.as_view()),# depreciated , dont use this
        path('noticeids/',AccountViewNoticeIds.as_view(), name='AccountViewNoticeIds'),
        path('noticeidremove/',AccountViewNoticeIdRemove.as_view()),
        path('<int:pk>/',AccountViewwPk.as_view()),
        path('logout/blacklist/',  BlacklistTokenUpdateView.as_view(),name='blacklist'),
        path('allusers/',UsersView.as_view()),
        path('fewusers/<int:num>/',FewUsersView.as_view()),
        path('updateusersname/', UpdateUsersNameView.as_view(), name='updateusersname'),
        path('usersearch/',UserSearchView.as_view(), name='usersearch'),
        path('mycontacts/',MyContactsView.as_view(), name='mycontacts'),

        path('deletecontact/<int:pk>/', DeleteContactView.as_view()),

        path('editabout/',EditAboutUserView.as_view()),
        path('contactuserssearch/<str:searchstring>/', ContactUsersSearchView.as_view()),
        path('institutesearch/',InstituteSearchView.as_view(), name='InstituteSearchView'),
        path('checkifuserisadded/<int:pk>/',CheckUsedAddedView.as_view(), name='CheckUsedAddedView'),
        #path('dashboardnotices/', DashboardNoticesView.as_view()),     
        path('generalmeetings/',GeneralMeetingsView.as_view(), name='generalmeetings'),
        path('profileimageupload/',ProfileImageUploadAPIView.as_view(), name='profileimageupload'),
        path('officeidupload/', OfficeIDUploadAPIView.as_view()),
        path('govtid1upload/', GovtID1UploadAPIView.as_view()),
        path('govtid2upload/', GovtID2UploadAPIView.as_view()),
        path('dobcertupload/', DOBCertUploadAPIView.as_view(), name='DOBCertUploadAPIView'),
        path('edudegreecreate/', EduDegreeCreateView.as_view(), name='EduDegreeCreateView'),
        path('edudegreedelete/<int:pk>/', EduDegreeDeleteView.as_view(), name='EduDegreeDeleteView'),
        path('degreenames/', DegreeNamesView.as_view(), name='DegreeNamesView'),
        path('institutenames/', InstituteNamesView.as_view(), name='InstituteNamesView'),
        #path('sendotpforfirsttime/', SendOTPfirsttimeView().as_view()),
        path('createaccountwithphonenum/',CreateAccountBasicView.as_view(), name='CreateAccountBasicView'),
        path('setotpaspswd/<username>/',CreateOTPAccountWithPhoneView.as_view(), name='CreateOTPAccountWithPhoneView'),
        path('sendotpemail/<str:userinput>/',CreateOTPForEmailLoginView.as_view(),name="send_otp_for_email"),
        path('sendotpphone/<str:userinput>/',CreateOTPForPhoneLoginView.as_view(),name="send_otp_for_phone"),
        path('getuserfromusername/<username>', UserCheckFromUserNameView.as_view(), name='getuserfromusername'),
        path('getuserfromuserinput/<str:userinput>', UserCheckFromUserInputView.as_view(), name='getuserfromuserinput'),
        path('userprofilegetput/',UserProfileGETPUTView.as_view(), name='userprofilegetput'),
        path('searchusersstr/<str:speakername>/',SearchUserView.as_view(), name ='SearchUserView'),
        path('addcontact/',ContactAddPUTView.as_view(),name='addcontact_view'),
        path('createachievement/',AchievementsView.as_view(), name='AchievementsView'),
        path('addnewaddress/', AddressView.as_view(), name='AddressView'),
        path('verifycaptcha/',VerifyCaptchaView.as_view(), name='VerifyCaptchaView'),
        path('getgeneralchatgroups/', GeneralChatGroupView.as_view()),
        path('getcoursechatgroups/<int:courseId>/', CourseChatGroupView.as_view()),
        path('searchcoursechatgroup/<int:courseId>/<str:namestring>/', SearchCourseChatGroupView.as_view()),
        path('changeusertype/<int:usertypeId>/', ChangeUserTypeView.as_view(),name="changeUsertype_view"),
        #path('user', include(router.urls)),
        #path('auth/', include('rest_framework.urls', namespace='rest_framework'))
        #path('snippets/', snippet_list),
        #path('snippets/<int:pk>/', snippet_detail),
        #path('snippetlist',SnippetList.as_view()),
        #path('snippetdetail/<int:pk>/',SnippetDetail.as_view()),
        path('createusefulllink/', CreateUseFullLinkView.as_view(), name="create_personal_link"),
        path('getusefulllinks/', GetUseFullLinksView.as_view(),name="personal_useful_links"),
        path('editdeletelink/<int:linkId>/',EditDeleteUseFullLinkView.as_view(), name="create_usefull_link"),
        #path('deletelink/<int:linkId>/', EditDeleteUseFullLinkView.as_view(),name="delete_usefull_link"),
        path('<int:user_id>/academic_details/add/', AddAcademicDetailView.as_view(), name='add_academic_detail'),
        path('<int:user_id>/academic_details/<int:academic_detail_id>/edit/', EditAcademicDetailView.as_view(), name='edit_academic_detail'),
        path('<int:user_id>/academic_details/<int:academic_detail_id>/delete/', DeleteAcademicDetailView.as_view(), name='delete_academic_detail'),
        path('<int:user_id>/academic_details/<int:academic_detail_id>/skills/<int:skill_id>/remove/', RemoveSkillFromAcademicDetailView.as_view(), name='remove_skill_from_academic_detail'),
        path('<int:user_id>/academic_details/', GetAcademicDetailsForUserView.as_view(), name='get_academic_details_for_user'),
        path('<int:user_id>/about_us/add/', AddAboutUsForUserView.as_view(), name='add_about_us_for_user'), #done # Endpoint for adding "About Us" with user context
        path('<int:user_id>/about_us/<int:about_us_id>/edit/', EditAboutUsView.as_view(), name='edit_about_us'),
        path('<int:user_id>/about_us/', GetAboutUsByUserIdView.as_view(), name='get_about_us_by_user_id'),
        path('<int:user_id>/experience/add/', AddExperienceForUserView.as_view(), name='add_experience_for_user'),  # Endpoint to create new experiences
        path('<int:user_id>/experience/<int:experience_id>/edit/', EditExperienceForUserView.as_view(), name='edit_experience_for_user'),  # Endpoint for editing experience
        path('<int:user_id>/experience/<int:experience_id>/delete/',DeleteExperienceView.as_view(),name='delete_experience'),  # Endpoint for deleting an experience
        path('<int:user_id>/experience/', GetExperienceByUserIdView.as_view(), name='get_experience_by_user_id'),  # Endpoint to get all experiences for a user
        path('<int:user_id>/publications/add/', AddPublicationView.as_view(), name='add_publication'),  # Endpoint for creating new publications
        path('<int:user_id>/publications/<int:publication_id>/edit/', EditPublicationView.as_view(), name='edit_publication'),  # Endpoint for editing a publication
        path('<int:user_id>/publications/<int:publication_id>/delete/', DeletePublicationView.as_view(), name='delete_publication'),  # Endpoint for deleting a publication
        path('<int:user_id>/publications/', GetPublicationsByUserIdView.as_view(), name='get_publications_by_user_id'),  
        path('<int:user_id>/licenses_certificates/add/', AddLicenseOrCertificateView.as_view(), name='add_license_certificate'),  # Endpoint for creating new licenses or certificates
        path('<int:user_id>/certificates/<int:certificate_id>/edit/',EditLicenseOrCertificateView.as_view(), name='edit_license_or_certificate'),  # Endpoint for editing a certificate
        path('certificates/<int:certificate_id>/by/<int:user_id>/delete/',DeleteLicenseOrCertificateView.as_view(),name='delete_license_or_certificate'),  # Endpoint for deleting a certificate
        path('<int:user_id>/certificates/', GetLicensesByUserIdView.as_view(), name='get_licenses_by_user_id'),  # Endpoint to get all certificates for a user
        path('update-contact/<int:user_id>/', UpdateUserContactView.as_view(), name='update-contact'),



        path('raise-delete-request/<int:user_id>/', RaiseDeleteRequestView.as_view(), name='raise_delete_request'),
        path('trigger-tasks/', trigger_tasks, name='trigger_tasks'),
        path('upload/', upload_video, name='upload_video'),
        path('video/<int:video_id>/', video_detail, name='video_detail'),
        path('accounts/', AccountListView.as_view(), name='account-list'),
        path('generate-jwt/<int:user_id>/', GenerateJWTView.as_view(), name='generate-jwt'),
        path('add-parent-details/<int:user_id>/', AddParentDetailsView.as_view(), name='add-parent-details'),
        path('update-parent-details/<int:user_id>/', UpdateParentDetailsView.as_view(), name='update-parent-details'),
        path('delete-parent-details/<int:user_id>/', DeleteParentDetailsView.as_view(), name='delete-parent-details'),
        path('get-parent-details/<int:user_id>/', GetParentDetailsView.as_view(), name='get-parent-details'),
        path('<int:user_id>/add_address/', AddAddressForUserView.as_view(), name='add-address-for-user'),
        path('<int:user_id>/addresses/<int:address_id>/', UpdateAddressForUserView.as_view(), name='update-address-for-user'),
        path('<int:user_id>/addresses/<int:address_id>/delete/', DeleteAddressForUserView.as_view(), name='delete-address-for-user'),
        path('<int:user_id>/addresses/', GetAddressesForUserView.as_view(), name='get-addresses-for-user'),
        path('update-health-data/<int:user_id>/', UpdateHealthDataForUserView.as_view(), name='update-health-data'),
        path('health-data/<int:user_id>/', GetHealthDataForUserView.as_view(), name='get-health-data'),
        path('delete-health-data/<int:user_id>/', DeleteHealthDataForUserView.as_view(), name='delete-health-data'),
        path('contact-request/send/<int:from_user_id>/<int:to_user_id>/', SendContactRequestView.as_view(), name='send-contact-request'),
        path('contact-request/respond/<int:to_user_id>/<int:request_id>/', RespondContactRequestView.as_view(), name='respond-contact-request'),
        path('contact-request/user/<int:user_id>/', UserContactRequestsView.as_view(), name='user-contact-requests'),

]

urlpatterns = format_suffix_patterns(urlpatterns)




