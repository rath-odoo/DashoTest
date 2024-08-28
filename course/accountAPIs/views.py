from django.shortcuts import render
# Create your views here.
from rest_framework import generics,status
from django.db import IntegrityError
from django.urls import reverse
from .serializers import AccountSerializers,UserSerializer, UserSerializerDashboardCourses, UserSerializerNoticeIds,  ProfileImageUploadSerializer, CreateAccountWithPhoneSerializer, GetUserFromUserNameSerializer, UserSerializerNoticeIdRemove, InstituteSerializerForSearch
#DashboardNoticeSerializer
from .serializers import CreateOTPAccountWithPhoneSerializer, UserProfileSerializer, OfficeIDUploadSerializer, GovtID1UploadSerializer, GovtID2UploadSerializer, DOBCertUploadSerializer, EduDegreeSerializer, UserSearchSerializer, ContactAddSerializer,EduDegreeCreateSerializer, DegreeNameSerializer, InstituteSerializer, AchievementsSerializer,AddressSerializer, GeneralMeetingsSerializer, UserSerializerFew
from .serializers import GeneralChatGroupsSerializer, GeneralChatGroupsSerializer2, UseFullLinkSerializer
from .serializers import CreateAccountSerializer, CreateOTPPhoneSerializer, CreateOTPEmailSerializer
from .serializers import MyContactsSerializer, UsersNameUpdateSerializer
from account.models import AcademicDetail, Skill, AboutUs, Experience, Publication, LicenseOrCertificate, Account
from .serializers import AcademicDetailSerializer, SkillSerializer, AcademicDetailEditSerializer, AboutUsSerializer, EditAboutUsSerializer
from .serializers import PublicationSerializer, EditPublicationSerializer
from .serializers import ExperienceSerializer, EditExperienceSerializer, LicenseOrCertificateSerializer, EditLicenseOrCertificateSerializer
from .serializers import UpdateUserContactSerializer, UserSerializerToken, ContactRequestSerializer
from course.models import Course
from chat.models import ChatGroup
from account.models import Account, EduDegree, DegreeName, Institute,Achievements, Address,UserType, UsefullLink, ContactRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
import requests
from django.http import Http404
from rest_framework import filters
from rest_framework import pagination
from django.utils import timezone
from django.db.models import Q
from django_ratelimit.decorators import ratelimit
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
#from django_filters import FilterSet, AllValuesFilter
#from django_filters.rest_framework import FilterSet, filters
User = get_user_model()
#authentication_classes = (TokenAuthentication, SessionAuthentication)
#permission_classes = (IsAuthenticated,)
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.core.exceptions import MultipleObjectsReturned
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .tasks import delete_old_profiles, send_test_email, upload_video_to_s3
from institute.tasks import create_daily_attendance, create_institute_batch_attendance, update_attendance_status
from course.tasks import create_class_attendance
from assignment.tasks import update_assignment_status
from .models import Video
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from datetime import datetime, timedelta, timezone
from django.contrib.auth import get_user_model
import os
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from account.models import ParentDetails
from .serializers import ParentDetailsSerializer
from account.models import HealthData
from .serializers import HealthDataSerializer

from .serializers import EditAboutUserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class AccountView(APIView): #ListCreateAPIView
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    #parser_classes = [MultiPartParser, FormParser]
    #queryset = Account.objects.all()
    #serializer_class = AccountSerializers
    def get(self, request):
        #context={'request':request}
        serializer = UserSerializer(instance=request.user, context={'request': request})
        #print ("-------------------", serializer.context['request'].user)
        return Response(serializer.data)
    def put(self, request):
        print(request.data)
        serializer = UserSerializer(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUsersNameView(APIView):
      permission_classes = [IsAuthenticated]
      def put(self, request):
        print(request.data)
        serializer = UsersNameUpdateSerializer(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GeneralMeetingsView(APIView):
      permission_classes = [IsAuthenticated]
      def get(self, request):
          serializer = GeneralMeetingsSerializer(request.user)
          return Response(serializer.data)

class UserCheckFromUserNameView(APIView):

     def get(self , request, username, format=None):
          #userObj = User.objects.get(username=username);
          #serializer = GetUserFromUserNameSerializer(userObj)
          try:
            user = User.objects.get(username=username) # retrieve the user using username
          except User.DoesNotExist:
               return Response(data={'message':False}) # return false as user does not exist
          else:
            return Response(data={'message':True}) 

class UserCheckFromUserInputView(APIView):
      def get(self, request, userinput, format=None):
        try:
            user = User.objects.get(Q(email=userinput) | Q(phoneno=userinput))
        except User.DoesNotExist:
            return Response(data={'message': False})
        else:
            return Response(data={'message': True})

class ChangeUserTypeView(APIView):
      def put(self, request, usertypeId):
          userObject = request.user;
          #print ('userObject: ', userObject.usertype);
          userTypeObject=UserType.objects.get(name="Teacher");
          if usertypeId==2:
             userTypeObject=UserType.objects.get(name="Student");
          if usertypeId==1:
              userTypeObject=UserType.objects.get(name="Teacher");
          #print ("user Type Object: ", type(userTypeObject));
          userObject.usertype=userTypeObject;
          userObject.save();
          #print ("userObject.usertype: ",userObject.usertype)

          return Response(data={'message':True})

'''
@api_view(['POST'])
def VerifyCaptchaView(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6LdtMAghAAAAAKB-sPXWT106ULFGW9s0dzLJTXDj',
        'response': request.data['captcha_value'],
      }
    )

    return Response({'captcha': r.json()})    
'''


class VerifyCaptchaView(APIView):
    def post(self, request):
        try:
             r = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                'secret': '6LdtMAghAAAAAKB-sPXWT106ULFGW9s0dzLJTXDj',
                'response': request.data['captcha_value'],
                }
             )
             return Response({'captcha': r.json()})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfileGETPUTView(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    def put(self, request):
        #print(request.data)
        serializer = UserProfileSerializer(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactAddPUTView(APIView):
      permission_classes = [IsAuthenticated]
      def get(self, request):
        serializer = ContactAddSerializer(request.user)
        return Response(serializer.data)
      def put(self, request):
        #print("request.data: ",request.data)
        serializer = ContactAddSerializer(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SendContactRequestView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, from_user_id, to_user_id):
        from_user = get_object_or_404(User, id=from_user_id)
        to_user = get_object_or_404(User, id=to_user_id)

        if from_user == to_user:
            return Response({"error": "You cannot send a contact request to yourself."}, status=status.HTTP_400_BAD_REQUEST)

        contact_request, created = ContactRequest.objects.get_or_create(from_user=from_user, to_user=to_user)
        
        if created:
            return Response({"message": "Contact request sent successfully."}, status=status.HTTP_201_CREATED)
        elif contact_request.status == 'pending':
            return Response({"message": "Contact request already sent."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": f"Contact request was previously {contact_request.status}."}, status=status.HTTP_200_OK)
        
class RespondContactRequestView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, to_user_id, request_id):
        to_user = get_object_or_404(User, id=to_user_id)
        contact_request = get_object_or_404(ContactRequest, id=request_id, to_user=to_user)

        action = request.data.get('action')
        if action == 'accept':
            contact_request.status = 'accepted'
            to_user.contacts.add(contact_request.from_user)
            contact_request.from_user.contacts.add(to_user)
            contact_request.save()
            return Response({"message": "Contact request accepted."}, status=status.HTTP_200_OK)
        elif action == 'reject':
            contact_request.status = 'rejected'
            contact_request.save()
            return Response({"message": "Contact request rejected."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

class UserContactRequestsView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        status_param = request.query_params.get('status', None)
        if status_param:
            contact_requests = ContactRequest.objects.filter(to_user=user, status=status_param)
        else:
            contact_requests = ContactRequest.objects.filter(to_user=user)
        
        serializer = ContactRequestSerializer(contact_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#class MyContactsView(APIView):
#      def get(self, request):
#        contactObjects = request.user.contacts.all()
#        serializer = MyContactsSerializer(contactObjects, many=True)
#        return Response(serializer.data)

class MyContactsView(APIView):
    def get(self, request):
        contact_objects = request.user.contacts.all()
        
        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 1000  # You can set the number of items per page here
        contacts_page = paginator.paginate_queryset(contact_objects, request)
        
        serializer = MyContactsSerializer(contacts_page, many=True)
        
        return paginator.get_paginated_response(serializer.data)

class ProfileImageUploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, format=None):
          serializer = ProfileImageUploadSerializer(request.user, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# OfficeIDUploadSerializer, GovtID1UploadSerializer, GovtID2UploadSerializer, DOBCertUploadSerializer

class OfficeIDUploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, format=None):
          #print ("office Id doc upload: ", request.data)
          serializer = OfficeIDUploadSerializer(request.user, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GovtID1UploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, format=None):
          serializer = GovtID1UploadSerializer(request.user, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GovtID2UploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, format=None):
          serializer = GovtID2UploadSerializer(request.user, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DOBCertUploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, format=None):
          serializer = DOBCertUploadSerializer(request.user, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountViewDashboardcourses(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializerDashboardCourses(request.user)
        return Response(serializer.data)
    def put(self, request):
        #print(request.data)
        serializer = UserSerializerDashboardCourses(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountViewNoticeIds(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializerNoticeIds(request.user)
        return Response(serializer.data)
    def put(self, request):
        #print(request.data)
        serializer = UserSerializerNoticeIds(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountViewNoticeIdRemove(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializerNoticeIdRemove(request.user)
        return Response(serializer.data)
    def put(self, request):
        #print(request.data)
        serializer = UserSerializerNoticeIdRemove(request.user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserChatGroupsSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50

class GeneralChatGroupView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = GeneralChatGroupsSerializer
    pagination_class = UserChatGroupsSetPagination
    def get_queryset(self):
          #print ("personal chat groups: ", self.request.user.generalchatgroups.all())
          #testUserObject = User.objects.get(id=1);
          chatgroups = self.request.user.generalchatgroups.all().order_by('-lastmsgTime');
          return chatgroups;

class CourseChatGroupsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500

#following queries donot work properly, needs to be fixed in future for efficiency
class CourseChatGroupView(generics.ListAPIView):
    serializer_class = GeneralChatGroupsSerializer
    pagination_class = CourseChatGroupsSetPagination
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['groupType']
    def get_queryset(self):
          loggedInUserId = self.request.user.id;
          courseId = self.kwargs['courseId']
          courseObj= Course.objects.get(pk=courseId);
          displayCourseChatGroups=courseObj.coursechatgroups.all().filter(groupuserObjects__id=loggedInUserId).order_by('-lastmsgTime');
          return displayCourseChatGroups

class AccountViewwPk(APIView):
    #permission_classes = [IsAuthenticated]    
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        UserObject = self.get_object(pk)
        serializer = UserSerializerFew(UserObject)
        return Response(serializer.data)

class EduDegreeDeleteView(APIView):
      def get_object(self, pk):
        try:
            return EduDegree.objects.get(pk=pk)
        except EduDegree.DoesNotExist:
            raise Http404

      def delete(self, request, pk, format=None):
        Object = self.get_object(pk)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeleteContactView(APIView):

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        contact_object = self.get_object(pk)
        user_object = request.user
        user_object.contacts.remove(contact_object)
        contact_object.contacts.remove(user_object)

        # Delete any existing contact requests between these two users
        ContactRequest.objects.filter(
            from_user=user_object, to_user=contact_object
        ).delete()
        ContactRequest.objects.filter(
            from_user=contact_object, to_user=user_object
        ).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 13
    page_size_query_param = 'page_size'
    max_page_size = 100

class UsersView(generics.ListCreateAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #pagination_class = StandardResultsSetPagination

class FewUsersView(generics.ListAPIView):#generics.ListAPIView
    permission_classes = [IsAuthenticated]    
    #def get_objects(self, num):
    #    try:
    #        #return User.objects.get(pk=num)
    #        return User.objects.filter(firstname__icontains="b") #order_by("-date_joined")[:10]
    #    except User.DoesNotExist:
    #        raise Http404

    #def get(self, request, num, format=None):
    #    UserObject = self.get_objects(num)
    #    serializer = UserSerializerFew(UserObject)
    #    return Response(serializer.data)

    serializer_class = UserSerializerFew
    def get_queryset(self):
          loggedInUserId = self.request.user.id;
          chatgroups = self.request.user.generalchatgroups;

          print ("loggedInUser: ", loggedInUserId)
          num = self.kwargs['num']
          #return User.objects.order_by("-date_joined")[num:num+10];
          return User.objects.filter(firstname__icontains="b")[num:num+10];
          #return 

class ContactUsersSearchView(generics.ListAPIView):
    serializer_class = UserSerializerFew
    pagination_class = StandardResultsSetPagination 
    def get_queryset(self):

        user = self.request.user
        contactObjects = user.contacts.all();
        searchstring = self.kwargs['searchstring']
        print ("contactObjects: ",contactObjects)
        queryset = contactObjects.filter(
                Q(username__icontains=searchstring) |
                Q(email__icontains=searchstring) |
                Q(firstname__icontains=searchstring) |
                Q(lastname__icontains=searchstring)
            )
        return queryset

class InstituteSearchView(generics.ListAPIView):
    queryset = Institute.objects.all().filter(dummy="no") #dummy="no"
    serializer_class = InstituteSerializerForSearch
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    pagination_class = StandardResultsSetPagination

class UserSearchView(generics.ListAPIView):
    queryset = User.objects.all()
    queryset = queryset.exclude(firstname__isnull=True).exclude(firstname__exact="")
    serializer_class = UserSerializerFew
    filter_backends = [filters.SearchFilter]
    search_fields = ['firstname','lastname']
    pagination_class = StandardResultsSetPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context




class CheckUsedAddedView(APIView):
      def get_object(self, pk):
         try:
            return User.objects.get(pk=pk)
         except User.DoesNotExist:
            raise Http404

      def get(self, request, pk, format=None):
         chatgroups = self.request.user.generalchatgroups.all();
         #print ("chat groups: ", chatgroups)
         userAdded=False;
         groupId=None;
         for group in chatgroups:
            if group.groupType == "oneoone":
                #print ( "OneOOneGroups: ", group.groupuserObjects.all())
                for oneChatgroupuser in group.groupuserObjects.all():
                    #print ("userId: ", oneChatgroupuser.id)
                    if oneChatgroupuser.id == pk:
                       groupId=group.id;
                       userAdded=True
         if userAdded:              
             return Response(data={'exists':True, 'groupId':groupId})
         else:
            return Response(data={'exists':False, 'groupId':groupId})

class AchievementsView(generics.ListCreateAPIView):
      queryset = Achievements.objects.all()
      serializer_class = AchievementsSerializer

class AddressView(generics.ListCreateAPIView):
      queryset = Address.objects.all()
      serializer_class = AddressSerializer

class EduDegreeView(generics.ListCreateAPIView):
      queryset = EduDegree.objects.all()
      serializer_class = EduDegreeSerializer

class EduDegreeCreateView(generics.ListCreateAPIView):
      queryset = EduDegree.objects.all()
      serializer_class = EduDegreeCreateSerializer

class DegreeNamesView(generics.ListCreateAPIView):
      queryset = DegreeName.objects.all()
      serializer_class = DegreeNameSerializer

class InstituteNamesView(generics.ListCreateAPIView):
      queryset = Institute.objects.all()
      serializer_class = InstituteSerializer

#@ratelimit(key='ip', rate='1/m', block=True)
class CreateAccountBasicView(generics.ListCreateAPIView):
      queryset = User.objects.all()
      serializer_class = CreateAccountWithPhoneSerializer

#@ratelimit(key='ip', rate='1/m', block=True)
class CreateAccountView(generics.ListCreateAPIView):
      queryset = User.objects.all()
      serializer_class = CreateAccountSerializer 

class CreateOTPAccountWithPhoneView(APIView):
     queryset = User.objects.all()
     serializer_class = CreateOTPAccountWithPhoneSerializer
     
     def put(self, request, username, format=None):
        print("DiracAI::::::::::::::::::::::::",request.data)
        userObj = User.objects.get(username=username);
        serializer = CreateOTPAccountWithPhoneSerializer(userObj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     def get(self , request, username, format=None):
         userObj = User.objects.get(username=username);
         serializer = CreateOTPAccountWithPhoneSerializer(userObj)
         return Response(serializer.data)

class CreateOTPForEmailLoginView(APIView):
     serializer_class = CreateOTPEmailSerializer

     def put(self, request, userinput, format=None):
        print("DiracAI::::::::::::::::::::::::",request.data)
        userObj = User.objects.get(email=userinput);
        serializer = CreateOTPEmailSerializer(userObj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateOTPForPhoneLoginView(APIView):
      serializer_class = CreateOTPPhoneSerializer
      def put(self, request, userinput, format=None):
        print("DiracAI::::::::::::::::::::::::",request.data)
        userObj = User.objects.get(phoneno=userinput);
        serializer = CreateOTPPhoneSerializer(userObj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)




#class DashboardNoticesView(APIView):
#    permission_classes = [IsAuthenticated]
#    #queryset = User.objects.all()
#    serializer_class = DashboardNoticeSerializer
#    def get(self, request):
#        serializer = DashboardNoticeSerializer(request.user)
#        #return Response(data={'exists':True})
#        return Response(serializer.data)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SearchUserView(generics.ListAPIView):
      
      serializer_class = UserSearchSerializer
      def get_queryset(self):
          firstname = self.kwargs['speakername']
          return User.objects.filter(firstname__icontains=firstname)



      
      #def get(self, request, *args, **kwargs):
      #    author = kwargs.get('speakername', None)
      #    print ("fffffffffffffffffffffff:  ", author)
      #
      #    userObjects = User.objects.filter(firstname='Bibhuprasad');
      #    serializer = UserSearchSerializer(userObjects)
      #    return Response(serializer.data)
      
class CreateUseFullLinkView(APIView):
      permission_classes = [IsAuthenticated]
      def get_object(self, linkId):
        try:
            return UsefullLink.objects.get(pk=linkId)
        except UsefullLink.DoesNotExist:
            raise Http404

      #def get(self, request, format=None):
      #  loggedInUser = request.user;
      #  usefull_linkObjects = loggedInUser.usefull_links.all();
      #  return usefull_linkObjects

      def post(self, request, format=None):
        serializer = UseFullLinkSerializer(data=request.data, context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LinksPageSetPagination(pagination.PageNumberPagination):
      page_size = 100
      page_size_query_param = 'page_size'
      max_page_size = 500

class GetUseFullLinksView(generics.ListAPIView):
      serializer_class = UseFullLinkSerializer
      pagination_class = LinksPageSetPagination

      def get_queryset(self):
        loggedInUser = self.request.user;
        #courseId = self.kwargs['pk']
        #courseObj=self.get_object(pk=courseId)
        #linkObjs=courseObj.courselinks.all()
        usefull_linkObjects = loggedInUser.usefull_links.all().order_by('id');
        return usefull_linkObjects

class EditDeleteUseFullLinkView(APIView):
      def get_object(self, linkId):
        try:
            return UsefullLink.objects.get(pk=linkId)
        except UsefullLink.DoesNotExist:
            raise Http404

      def get(self, request, linkId, format=None):
        Object = self.get_object(linkId)
        serializer = UseFullLinkSerializer(Object)
        return Response(serializer.data)

      def put(self, request, linkId, format=None):
        Object = self.get_object(linkId)
        serializer = UseFullLinkSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      def delete(self, request, linkId, format=None):
        linkObject = self.get_object(linkId)
        linkObject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PersonalChatGroupsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500
    def get_paginated_response(self, data):
        return Response({

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })

class SearchCourseChatGroupView(APIView):
    pagination_class = PersonalChatGroupsSetPagination
    def get(self, request, courseId, namestring):
        # Get the search query from the request
        #search_query = request.GET.get('namestring', '')
        searchstring = self.kwargs['namestring']
        courseId = self.kwargs['courseId']
        courseObj= Course.objects.get(pk=courseId);
        #print ("search query: ", search_query)
        # Perform the search using the search query

        results = courseObj.coursechatgroups.all().filter(
            Q(displayname__icontains=searchstring) |
            Q(groupuserObjects__firstname__icontains = searchstring) |
            Q(groupuserObjects__lastname__icontains = searchstring) |
            Q(groupuserObjects__username__icontains = searchstring)
        )

        # Serialize the search results and return the response
        serializer = GeneralChatGroupsSerializer(results, many=True)
        return Response(serializer.data)

class AddAcademicDetailView(APIView):
    def post(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create the academic detail
        academic_detail_serializer = AcademicDetailSerializer(data=request.data)
        
        if academic_detail_serializer.is_valid():
            academic_detail = academic_detail_serializer.save(user=user)  # Link to the user
            return Response(
                {
                    "message": "Academic detail added successfully.",
                    "academic_detail_id": academic_detail.id,
                    "academic_detail": AcademicDetailSerializer(academic_detail).data  # Serialize with updated data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message": "Failed to add academic detail.",
                    "errors": academic_detail_serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST  # If validation fails
            )
        
class EditAcademicDetailView(APIView):
    def put(self, request, user_id, academic_detail_id, format=None):
        # Retrieve the academic detail to be edited
        academic_detail = get_object_or_404(AcademicDetail, id=academic_detail_id)

        # Check if the academic detail belongs to the given user
        if academic_detail.user.id != user_id:
            raise PermissionDenied("You are not allowed to edit this academic detail.")

        # Validate and update the academic detail
        serializer = AcademicDetailEditSerializer(academic_detail, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated academic detail
            return Response(
                {
                    "message": "Academic detail edited successfully.",
                    "academic_detail_id": academic_detail.id,
                    "academic_detail": serializer.data  # Return the updated academic detail
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to edit academic detail.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # If validation fails
            )

class DeleteAcademicDetailView(APIView):
    def delete(self, request, user_id, academic_detail_id, format=None):
        # Retrieve the academic detail to be deleted
        academic_detail = get_object_or_404(AcademicDetail, id=academic_detail_id)

        # Check if the academic detail belongs to the given user
        if academic_detail.user.id != user_id:
            raise PermissionDenied("You are not allowed to delete this academic detail.")

        # Attempt to delete the academic detail
        try:
            academic_detail.delete()  # Delete the record
            return Response(
                {"message": "Academic detail deleted successfully."},
                status=status.HTTP_200_OK
            )
        except IntegrityError:
            return Response(
                {"message": "Failed to delete academic detail."},
                status=status.HTTP_400_BAD_REQUEST
            )



class RemoveSkillFromAcademicDetailView(APIView):
    def delete(self, request, user_id, academic_detail_id, skill_id, format=None):
        # Retrieve the academic detail to update
        academic_detail = get_object_or_404(AcademicDetail, id=academic_detail_id)

        # Check if the academic detail belongs to the given user
        if academic_detail.user.id != user_id:
            raise PermissionDenied("You are not allowed to modify this academic detail.")

        # Retrieve the skill to be removed
        skill = get_object_or_404(Skill, id=skill_id)

        # Attempt to remove the skill from the academic detail
        academic_detail.skills.remove(skill)  # Remove the skill

        return Response(
            {"message": "Skill removed successfully."},
            status=status.HTTP_200_OK
        )

class GetAcademicDetailsForUserView(generics.ListAPIView):
    serializer_class = AcademicDetailSerializer

    def get_queryset(self):
        # Fetch academic details for the given user_id
        user_id = self.kwargs.get('user_id')  # Get the user_id from the URL
        return AcademicDetail.objects.filter(user_id=user_id)  # Filter academic details by user_id

class AddAboutUsForUserView(APIView):
    def post(self, request, user_id, format=None):
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        request_data = request.data.copy()

        # Convert 'skills' to primary key IDs
        if 'skills' in request_data and isinstance(request_data['skills'], list):
            skill_ids = []
            for skill in request_data['skills']:
                if isinstance(skill, int):
                    skill_ids.append(skill)
                elif isinstance(skill, str):
                    skill_obj, _ = Skill.objects.get_or_create(name=skill)
                    skill_ids.append(skill_obj.id)
            request_data['skills'] = skill_ids
        
        request_data['user'] = user_id

        try:
            # Check if an "About Us" section already exists for the user
            about_us = AboutUs.objects.get(user=user)
            serializer = AboutUsSerializer(about_us, data=request_data)
            if serializer.is_valid():
                about_us = serializer.save()
                return Response(
                    {
                        "message": "About Us section updated successfully.",
                        "about_us_id": about_us.id,
                        "about_us": AboutUsSerializer(about_us).data
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {
                        "message": "Failed to update 'About Us' section.",
                        "errors": serializer.errors
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
        except AboutUs.DoesNotExist:
            serializer = AboutUsSerializer(data=request_data)
            if serializer.is_valid():
                about_us = serializer.save()
                return Response(
                    {
                        "message": "About Us section created successfully.",
                        "about_us_id": about_us.id,
                        "about_us": AboutUsSerializer(about_us).data
                    },
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {
                        "message": "Failed to create 'About Us' section.",
                        "errors": serializer.errors
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

class EditAboutUsView(APIView):
    def put(self, request, user_id, about_us_id, format=None):
        # Retrieve the "About Us" section to be edited
        about_us = get_object_or_404(AboutUs, id=about_us_id)

        # Check if the "About Us" section belongs to the specified user
        if about_us.user.id != user_id:
            raise PermissionDenied("You are not allowed to edit this 'About Us' section.")

        # Convert skill names to skill objects
        if 'skills' in request.data:
            skill_names = request.data['skills']
            skills = []
            for skill_name in skill_names:
                skill, created = Skill.objects.get_or_create(name=skill_name)  # Get or create skill by name
                skills.append(skill)

            # Replace skill names with actual skill objects
            request.data['skills'] = [skill.id for skill in skills]

        # Validate and update the "About Us" section
        serializer = EditAboutUsSerializer(about_us, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            updated_about_us = serializer.save()  # Save the updated "About Us" section
            updated_about_us.skills.set(skills)  # Update the skills relationship

            return Response(
                {
                    "message": "About Us section updated successfully.",
                    "about_us_id": updated_about_us.id,
                    "about_us": serializer.data  # Return the updated data
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "message": "Failed to update 'About Us'.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
class GetAboutUsByUserIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id, format=None):
        # Retrieve all "About Us" sections for the specified user_id
        about_us_entries = AboutUs.objects.filter(user_id=user_id)

        if about_us_entries.exists():
            # Serialize the data for the response
            serializer = AboutUsSerializer(about_us_entries, many=True)

            return Response(
                {
                    "message": "'About Us' section(s) retrieved successfully.",
                    "about_us": serializer.data
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "'About Us' section not found for this user."},
                status=status.HTTP_404_NOT_FOUND
            )

class AddExperienceForUserView(APIView):
    def post(self, request, user_id, format=None):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        request_data = request.data.copy()
        request_data['user'] = user_id

        serializer = ExperienceSerializer(data=request_data)

        if serializer.is_valid():
            experience = serializer.save()
            return Response(
                {
                    "message": "Experience created successfully.",
                    "experience_id": experience.id,
                    "experience": ExperienceSerializer(experience).data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message": "Failed to create experience.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
class EditExperienceForUserView(APIView):
    def put(self, request, user_id, experience_id, format=None):
        # Retrieve the experience to be edited
        experience = get_object_or_404(Experience, id=experience_id)

        # Ensure the experience belongs to the specified user
        if experience.user.id != user_id:
            raise PermissionDenied("You are not allowed to edit this experience.")

        # Validate and update the experience
        serializer = EditExperienceSerializer(experience, data=request.data, partial=True)  # Allow partial updates

        if serializer.is_valid():
            updated_experience = serializer.save()  # Save the changes
            return Response(
                {
                    "message": "Experience updated successfully.",
                    "experience_id": updated_experience.id,
                    "experience": serializer.data  # Return the updated data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to update experience.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # If validation fails
            )
        
class DeleteExperienceView(APIView):
    def delete(self, request, user_id, experience_id, format=None):
        # Retrieve the experience to be deleted
        experience = get_object_or_404(Experience, id=experience_id)

        # Ensure the experience belongs to the specified user
        if experience.user.id != user_id:
            raise PermissionDenied("You are not allowed to delete this experience.")

        # Attempt to delete the experience
        experience.delete()  # Perform the deletion
        return Response(
            {"message": "Experience deleted successfully."},
            status=status.HTTP_200_OK
        )
    
class GetExperienceByUserIdView(generics.ListAPIView):
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        # Get all experiences for the specified user_id
        user_id = self.kwargs.get('user_id')  # Retrieve user_id from URL
        return Experience.objects.filter(user_id=user_id)  # Filter by user_id


class AddPublicationView(APIView):
    def post(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)  # Ensure the user exists
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Prepare the request data and ensure correct user association
        request_data = request.data.copy()  # Copy to avoid mutation
        request_data['user'] = user_id  # Ensure correct user ID
        
        # Convert author names to primary key IDs
        if 'authors' in request_data and isinstance(request_data['authors'], list):
            author_ids = []
            for author in request_data['authors']:
                if isinstance(author, int):  # Already a primary key ID
                    author_ids.append(author)
                elif isinstance(author, str):  # Convert name to ID
                    author_obj, _ = Account.objects.get_or_create(username=author)  # Get or create by name
                    author_ids.append(author_obj.id)  # Use the Account's ID
            request_data['authors'] = author_ids  # Replace with primary key IDs

        # Initialize the PublicationSerializer with corrected data
        serializer = PublicationSerializer(data=request_data)
        
        # Handle validation and save the publication
        if serializer.is_valid():
            publication = serializer.save()  # Save the publication with the user

            # Check if the publication has authors and fetch their details
            if 'authors' in request_data:
                authors = [account.username for account in publication.authors.all()]  # Get author names

            return Response(
                {
                    "message": "Publication created successfully.",
                    "publication_id": publication.id,
                    "publication": PublicationSerializer(publication).data,  # Serialized data for the created publication
                    "authors": authors  # Include author details
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message": "Failed to create publication.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class EditPublicationView(APIView):
    def put(self, request,user_id, publication_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)  # Ensure the user exists
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        # Retrieve the publication to be edited
        publication = get_object_or_404(Publication, id=publication_id)

        # Validate and update the publication
        serializer = EditPublicationSerializer(publication, data=request.data, partial=True)  # Allow partial updates
        
        if serializer.is_valid():
            updated_publication = serializer.save()  # Save the changes
            return Response(
                {
                    "message": "Publication updated successfully.",
                    "publication_id": updated_publication.id,
                    "publication": serializer.data  # Return the updated data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to update publication.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # If validation fails
            )

class DeletePublicationView(APIView):
    def delete(self, request, user_id, publication_id, format=None):
        # Retrieve the publication to be deleted
        publication = get_object_or_404(Publication, id=publication_id)

        # Check if the user has permission to delete
        if publication.user.id != user_id:
            raise PermissionDenied("You are not allowed to delete this experience.")

        # Delete the publication
        publication.delete()  # Perform the deletion
        return Response(
            {"message": "Publication deleted successfully."},
            status=status.HTTP_200_OK  # Successful deletion
        )

class GetPublicationsByUserIdView(generics.ListAPIView):
    serializer_class = PublicationSerializer  # Use the serializer with nested author details
    
    def get_queryset(self):
        # Get the user ID from the URL
        user_id = self.kwargs.get('user_id')
        # Fetch publications where the user is an author
        return Publication.objects.filter(user_id=user_id)  # Filter by author ID

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()  # Get the relevant publications
        serializer = self.get_serializer(queryset, many=True)  # Serialize the queryset
        
        # Extract the serialized data from the serializer
        serialized_data = serializer.data
        # Process each publication to include author usernames
        for data, publication in zip(serialized_data, queryset):
            # Get author usernames from the publication
            author_usernames = [author.username for author in publication.authors.all()]
            
            # Add the author usernames to the serialized data
            data['author_usernames'] = author_usernames
        
        return Response(serialized_data, status=status.HTTP_200_OK)  # Return the serialized data with author usernames

class AddLicenseOrCertificateView(APIView):
    def post(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create the license or certificate with the provided data and link it to the user
        serializer = LicenseOrCertificateSerializer(data=request.data)
        
        if serializer.is_valid():
            license_certificate = serializer.save(user=user)  # Link to the user
            return Response(
                {
                    "message": "License or certificate created successfully.",
                    "license_certificate_id": license_certificate.id,
                    "license_certificate": serializer.data  # Serialized data for the created license/certificate
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message": "Failed to create license or certificate.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # If validation fails
            )

class EditLicenseOrCertificateView(APIView):
    def put(self, request, user_id, certificate_id, format=None):  # Correct the parameter order
        # Ensure the user exists
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Get the certificate to be edited
        certificate = get_object_or_404(LicenseOrCertificate, id=certificate_id)
        
        # Validate and update the certificate
        serializer = EditLicenseOrCertificateSerializer(certificate, data=request.data, partial=True)  # Allow partial updates
        
        if serializer.is_valid():
            updated_certificate = serializer.save()  # Save the changes
            return Response(
                {
                    "message": "License or certificate updated successfully.",
                    "certificate_id": updated_certificate.id,
                    "certificate": serializer.data  # Return the updated data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to update license or certificate.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
class DeleteLicenseOrCertificateView(APIView):
    def delete(self, request, certificate_id, user_id, format=None):
        # Retrieve the license or certificate to be deleted
        certificate = get_object_or_404(LicenseOrCertificate, id=certificate_id)

        # Ensure the certificate belongs to the requesting user
        if certificate.user.id != user_id:
            raise PermissionDenied("You are not allowed to delete this license or certificate.")

        # Delete the certificate
        certificate.delete()  # Perform the deletion
        return Response(
            {"message": "License or Certificate deleted successfully."},
            status=status.HTTP_200_OK  # Successful deletion
        )
    
class GetLicensesByUserIdView(generics.ListAPIView):
    serializer_class = LicenseOrCertificateSerializer

    def get_queryset(self):
        # Return all licenses or certificates for the given user ID
        user_id = self.kwargs.get('user_id')  # Get the user ID from the URL
        return LicenseOrCertificate.objects.filter(user_id=user_id)  # Filter by user ID





class EditAboutUserView(generics.UpdateAPIView):
    queryset = User.objects.all()  # Adjust to your actual user model
    serializer_class = EditAboutUserSerializer
    #permission_classes = [permissions.IsAuthenticated]  # Adjust permissions as needed

    def get_object(self):
        # Assuming you want to edit the "about" field of the current user
        return self.request.user


class UpdateUserContactView(APIView):
    def put(self, request, user_id, format=None):
        user = get_object_or_404(Account, id=user_id)

        # Validate and update user contact info
        serializer = UpdateUserContactSerializer(user, data=request.data, partial=True)  # Allow partial updates
        
        if serializer.is_valid():
            updated_user = serializer.save()  # Save the changes
            return Response(
                {
                    "message": "Contact information updated successfully.",
                    "user_id": updated_user.id,
                    "user_contact": serializer.data  # Return the updated data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to update contact information.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class RaiseDeleteRequestView(APIView):
    def delete(self, request, user_id, format=None):
        
        # authentication_classes = [SessionAuthentication, BasicAuthentication]
        # permission_classes = [IsAuthenticated]

        # Retrieve the user account to be marked for deletion
        user = get_object_or_404(Account, id=user_id)

        # Ensure the requesting user is the same as the user to be deleted
        if request.user.id != user_id:
            raise PermissionDenied("You are not allowed to raise a delete request for this user.")

        # Raise the delete request
        user.is_delete_request_raised = True
        user.delete_request_raised_at = timezone.now()
        user.save()

        return Response(
            {"message": "Delete request raised successfully."},
            status=status.HTTP_200_OK  # Successful update
        )
    



def trigger_tasks(request):
    delete_old_profiles.delay()
    send_test_email.delay()
    create_daily_attendance.delay()
    create_class_attendance.delay()
    update_assignment_status.delay()
    create_institute_batch_attendance.delay()
    update_attendance_status.delay()
    return JsonResponse({"message": "Tasks have been triggered"})


# @csrf_exempt
# def upload_video(request):
#     if request.method == 'POST' and request.FILES.get('file'):
#         file = request.FILES['file']
#         user_id = request.POST.get('user_id')
        
#         # Create a new Video object
#         video = Video.objects.create(file=file, uploaded_by_id=user_id)
        
#         # Trigger the Celery task to upload the video to S3
#         upload_video_to_s3.delay(video.id)
        
#         return JsonResponse({})
#     return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def upload_video(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        user_id = request.POST.get('user_id')
        
        # Create a new Video object
        video = Video.objects.create(file=file, uploaded_by_id=user_id)
        
        # Trigger the Celery task to upload the video to S3
        upload_video_to_s3.delay(video.id)
        
        # Return the video details including the signed URL
        response_data = {
            'id': video.id,
            'name': video.file.name,
            'processed': video.processed,
            'uploaded_by': video.uploaded_by.username if video.uploaded_by else None,
            'created_at': video.created_at,
            'updated_at': video.updated_at,
        }
        
        return JsonResponse(response_data)
    return JsonResponse({"error": "Invalid request"}, status=400)

def video_detail(request, video_id):
    video = get_object_or_404(Video, id=video_id)    
    response_data = {
        'id': video.id,
        'name': video.file.name,
        'url': video.signed_url,
        'processed': video.processed,
        'uploaded_by': video.uploaded_by.username if video.uploaded_by else None,
        'created_at': video.created_at,
        'updated_at': video.updated_at,
    }
    
    return JsonResponse(response_data)

class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'  # Query parameter to specify page size
    max_page_size = 10000  # Maximum page size allowed

class AccountListView(APIView):
    def get(self, request, format=None):
        accounts = Account.objects.all()
        paginator = CustomPagination()
        page = paginator.paginate_queryset(accounts, request)
        if page is not None:
            serializer = AccountSerializers(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = AccountSerializers(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GenerateJWTView(APIView):
    def get(self, request, user_id, format=None):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found with the provided ID."}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the user data
        user_data = UserSerializerToken(user).data

        # Generate JWT using serialized data
        token = self.generate_jwt(user_data)

        return Response({"message": "JWT generated successfully.", "jwt_token": token}, status=status.HTTP_201_CREATED)

    def generate_jwt(self, user_data):
        secret_key = os.getenv('JWT_SECRET_KEY', 'my_jitsi_app_secret')
        app_id = os.getenv('JWT_APP_ID', 'my_jitsi_app_id')
        subject = os.getenv('JWT_SUBJECT', 'https://localhost:8443')
        payload = {
            'context': {
                'user': user_data,  # Use serialized user data here
            },
            'aud': 'jitsi',
            'iss': app_id,
            'sub': subject,
            'room': '*',
            'exp': datetime.now(timezone.utc) + timedelta(days=2)
        }

        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token

class AddParentDetailsView(APIView):
    def post(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create the parent details with the provided data and link it to the user
        serializer = ParentDetailsSerializer(data=request.data)
        
        if serializer.is_valid():
            parent_details = serializer.save(account=user)  # Link to the user
            return Response(
                {
                    "message": "Parent details created successfully.",
                    "parent_details_id": parent_details.id,
                    "parent_details": serializer.data  # Serialized data for the created parent details
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message": "Failed to create parent details.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class UpdateParentDetailsView(APIView):
    def put(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Fetch the parent details associated with the user
        try:
            parent_details = ParentDetails.objects.get(account=user)
        except ParentDetails.DoesNotExist:
            return Response(
                {"error": "Parent details not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update the parent details with the provided data
        serializer = ParentDetailsSerializer(parent_details, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Parent details updated successfully.",
                    "parent_details": serializer.data  # Serialized data for the updated parent details
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "message": "Failed to update parent details.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class DeleteParentDetailsView(APIView):
    def delete(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Fetch the parent details associated with the user
        try:
            parent_details = ParentDetails.objects.get(account=user)
        except ParentDetails.DoesNotExist:
            return Response(
                {"error": "Parent details not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Delete the parent details
        parent_details.delete()
        return Response(
            {
                "message": "Parent details deleted successfully."
            },
            status=status.HTTP_200_OK 
        )

class GetParentDetailsView(APIView):
    def get(self, request, user_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Fetch the parent details associated with the user
        parent_details = ParentDetails.objects.filter(account=user)
        if not parent_details.exists():
            return Response(
                {"error": "Parent details not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Serialize and return the parent details
        serializer = ParentDetailsSerializer(parent_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AddAddressForUserView(APIView):
    def post(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prepare request data
        request_data = request.data.copy()

        # Initialize the AddressSerializer with the request data
        serializer = AddressSerializer(data=request_data)

        # Validate the serializer and handle the result
        if serializer.is_valid():
            address = serializer.save()  # Save the address
            user.addresses.add(address)  # Associate the address with the user
            return Response(
                {
                    "message": "Address created successfully.",
                    "address_id": address.id,
                    "address": AddressSerializer(address).data  # Return serialized address
                },
                status=status.HTTP_201_CREATED
            )
        else:
            # Handle validation errors
            return Response(
                {
                    "message": "Failed to create address.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class UpdateAddressForUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, user_id, address_id, format=None):
        # Ensure the user_id in the URL matches the current authenticated user
        if request.user.id != user_id:
            return Response(
                {"error": "You do not have permission to update this user's address."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Fetch the address and handle exceptions
        try:
            address = user.addresses.get(id=address_id)
        except Address.DoesNotExist:
            return Response(
                {"error": "Address not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Initialize the AddressSerializer with the existing address and request data
        serializer = AddressSerializer(address, data=request.data, partial=True)

        # Validate the serializer and handle the result
        if serializer.is_valid():
            address = serializer.save()  # Save the updated address
            return Response(
                {
                    "message": "Address updated successfully.",
                    "address_id": address.id,
                    "address": AddressSerializer(address).data  # Return serialized address
                },
                status=status.HTTP_200_OK
            )
        else:
            # Handle validation errors
            return Response(
                {
                    "message": "Failed to update address.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class DeleteAddressForUserView(APIView):
    def delete(self, request, user_id, address_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Fetch the address and handle exceptions
        try:
            address = user.addresses.get(id=address_id)
        except Address.DoesNotExist:
            return Response(
                {"error": "Address not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Remove the address association from the user and delete the address
        user.addresses.remove(address)
        address.delete()

        return Response(
            {
                "message": "Address deleted successfully."
            },
            status=status.HTTP_200_OK
        )

class GetAddressesForUserView(APIView):
    def get(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        address_id = request.query_params.get('address_id', None)
        
        if address_id:
            # Fetch the specific address and handle exceptions
            try:
                address = user.addresses.get(id=address_id)
            except Address.DoesNotExist:
                return Response(
                    {"error": "Address not found with the provided ID."},
                    status=status.HTTP_404_NOT_FOUND
                )
            # Serialize the specific address
            serializer = AddressSerializer(address)
            return Response(
                {
                    "address": serializer.data
                },
                status=status.HTTP_200_OK
            )
        else:
            # Fetch all addresses associated with the user
            addresses = user.addresses.all()
            # Serialize the addresses
            serializer = AddressSerializer(addresses, many=True)
            return Response(
                {
                    "addresses": serializer.data
                },
                status=status.HTTP_200_OK
            )

class UpdateHealthDataForUserView(APIView):
    def put(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Fetch the health data and handle exceptions
        try:
            health_data = user.health_data
        except HealthData.DoesNotExist:
            return Response(
                {"error": "Health data not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Initialize the HealthDataSerializer with the existing health data and request data
        serializer = HealthDataSerializer(health_data, data=request.data, partial=True)

        # Validate the serializer and handle the result
        if serializer.is_valid():
            health_data = serializer.save()  # Save the updated health data
            return Response(
                {
                    "message": "Health data updated successfully.",
                    "health_data": HealthDataSerializer(health_data).data  # Return serialized health data
                },
                status=status.HTTP_200_OK
            )
        else:
            # Handle validation errors
            return Response(
                {
                    "message": "Failed to update health data.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
class GetHealthDataForUserView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Fetch the health data and handle exceptions
        try:
            health_data = user.health_data
        except HealthData.DoesNotExist:
            return Response(
                {"error": "Health data not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Serialize the health data
        serializer = HealthDataSerializer(health_data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteHealthDataForUserView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, user_id, format=None):
        # Fetch the user and handle exceptions
        try:
            user = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Fetch the health data and handle exceptions
        try:
            health_data = user.health_data
        except HealthData.DoesNotExist:
            return Response(
                {"error": "Health data not found for the provided user ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Set the fields to empty values
        health_data.blood_group = ""
        health_data.height = 0.0
        health_data.weight = 0.0
        # Update other fields as necessary

        health_data.save()

        return Response(
            {"message": "Health data has been cleared."},
            status=status.HTTP_200_OK
        )
