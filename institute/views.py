from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView
from django.http import Http404
from rest_framework import status
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
# Create your views here.
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db import transaction
from course.models import Course
from eclass.models import Class
from connect.models import Post, Comment
from .models import InstituteFee, InstituteTransaction, InstituteFeeInstallment, LeaveType, BatchAttendance
from account.models import AcademicDetail, Experience, ParentDetails, Publication, LicenseOrCertificate
from .models import InstituteMemberDocument, InstitueMemberTypes, LinkedCourseMembers
from .serializers import InstituteMemberDocumentSerializer, BatchCourseSerializers, SubExamSerializer, AttendanceCourseClassSerializer
from grade.serializers import GradeListSerializer, BatchGradeSerializer
from grade.models import Grade
from django.core.files.storage import default_storage
from rest_framework import views, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from grade.serializers import GradeSerializers
User = get_user_model()

from datetime import datetime
from django.utils import timezone
from django.utils.dateparse import parse_date
from exam.models import Exam, SubExam
from .models import Institute, Document, InstitueMemberTypes, InstituteMembership, socialMediaLink, Attendance, Asset, Timetable, InstituteOfficial, Group, GroupMembership, UserLeaveBalance, InstituteLeavePolicy, InstituteBankDetails
from .serializers import CreateInstituteSerializer, GetMyInstitutesSerializer, GetOneInstituteSerializer, AddDocumentInstituteSerializer, AddTypeSerializer, AttendanceComprehensiveSerializer
from .serializers import EditInstituteNameLogoSerializer, EditInstituteWebUrlSerializer, EditInstituteAddressSerializer, AddInstituteMemberSerializer, AddMultipleInstituteMembersSerializer
from .serializers import AttendanceSerializer, AttendanceCreateSerializer, AttendanceUpdateSerializer, LinkCourseSerializer, Leave, LeaveCreateUpdateSerializer, LeaveSerializer
from .serializers import LeaveListSerializer, LeaveEditSerializer, UserSerializer, AssetSerializer
from .serializers import TimetableSerializer, CourseReferenceSerializer
from .serializers import InstituteOfficialSerializer, InstituteOfficialUpdateSerializer, GroupMembershipSerializer, GroupSerializer, CreateGroupSerializer, InstituteMemberSerializer
from .serializers import FeeSerializer, FeeViewSerializer, FeeEditSerializer, TransactionFeeSerializer, InstallmentSerializer, InstituteMemberLeavePolicySerializer
from .serializers import UpdateInstituteMemberSerializer, UserMembershipSerializer, AttendanceCourseSerializer, AttendanceCourseUpdateSerializer, ClassSessionSerializer, CourseSerializer, InstituteSerializer
from .serializers import UserCourseSerializer, EditSocialMediaLinkSerializer, GetSocialMediaLinkSerializer, LeaveTypeSerializer, InstituteMemberTypesSerializer
from .serializers import  InstituteOneFeeSerializer
from .serializers import InstituteBankDetailsSerializer, InstituteTransactionSerializer
from .serializers import UserProfileSerializer, InstituteProfileSerializer, CourseProfileSerializer, AttendanceProfileSerializer, InstituteMembershipProfileSerializer, ParentDetailsProfileSerializer, LicenseOrCertificateProfileSerializer
from .serializers import PublicationProfileSerializer, ExperienceProfileSerializer, AcademicDetailProfileSerializer
from connect.serializers import PostSerializer, PostWithCommentsSerializer, EditPostSerializer, CommentSerializer, EditCommentSerializer
from .serializers import BatchAttendanceSerializer
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from .utils import create_default_attendance
from django.utils.dateparse import parse_datetime
from .pagination import StandardResultsPagination
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from dateutil import parser as dateutil_parser
from django.contrib.postgres.search import TrigramSimilarity
from django.db.models import Sum
import mimetypes
from django.core.files.storage import default_storage
from django.db.models import Q
import csv
from account.models import Account

from .serializers import BatchWithTimeTableSerializer,  BatchTimetableSerializer, InstituteBatchTimeTableSerializer
from grade.serializers import ExamSerializer, BatchCourseSerializer, CourseWithGradesSerializer

from .models import BatchTimetable
import openpyxl
from django.http import HttpResponse
from django.db.models import Prefetch
from .serializers import UserSerializerBatch

try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.units import inch
except ImportError:
    import pip
    pip.main(['install', 'reportlab'])
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.units import inch


try:
    import pandas as pd
except ImportError:
    import pip
    pip.main(['install', 'pandas'])
    import pandas as pd

from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.base import ContentFile
import io
import uuid  # To generate unique transaction IDs
from io import BytesIO
from django.core.mail import EmailMessage, EmailMultiAlternatives
import logging
from .models import Batch
from .serializers import BatchSerializer, LinkCourseToBatchSerializer, DelinkCourseFromBatchSerializer
logger = logging.getLogger(__name__)

class CreateInstituteView(generics.ListCreateAPIView):
    queryset = Institute.objects.all()
    serializer_class = CreateInstituteSerializer
    def get_serializer_context(self):
        return {'request': self.request}

class GetMyInstitutesView(APIView):
      def get(self, request, format=None):
          user = self.request.user
          myinstitutes = user.myinstitutes.all()
          serializer = GetMyInstitutesSerializer( myinstitutes, many=True,context={"request":request} )
          return Response(serializer.data)

class GetOneInstituteByIdView(APIView):
      def get(self, request, instId, format=None):
          instituteObject = Institute.objects.get(pk=int(instId))          
          #serializer = GetOneInstituteSerializer( instituteObject, context={"request":request} )
          serializer = GetOneInstituteSerializer(instance=instituteObject, context={'request': request, 'institute': instituteObject})
          return Response(serializer.data)

class AddDocumentView(APIView):
    def put(self, request, institute_id, user_id, format=None):
        # Fetch the user attempting the addition
        adding_user = get_object_or_404(User, pk=user_id)

        # Ensure the user has 'Owner' or 'Admin' permissions for this institute
        if not InstituteMembership.objects.filter(
            user=adding_user,
            user_type__name__in=["Owner", "Admin",'Staff'],
            institute__id=institute_id
        ).exists():
            raise PermissionDenied("You do not have permission to add documents to this institute.")

        # Fetch the institute
        institute = get_object_or_404(Institute, pk=institute_id)

        # Validate the incoming data with the serializer
        serializer = AddDocumentInstituteSerializer(institute, data=request.data)
        if serializer.is_valid():
            serializer.save()  # The update method will add the document to the institute
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteDocumentView(APIView):
      def get_object(self, document_id):
        try:
            return Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            raise Http404
      def delete(self, request, document_id, format=None):
        Object = self.get_object(document_id)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class InstituteDeleteView(APIView):
      def get_object(self, instId):
        try:
            return Institute.objects.get(pk=instId)
        except Institute.DoesNotExist:
            raise Http404
      def delete(self, request, instId, format=None):
        Object = self.get_object(instId)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EditInstituteNameLogoView(APIView):
     def get_object(self, instId):
        try:
            return Institute.objects.get(pk=instId)
        except Institute.DoesNotExist:
            raise Http404
     def put(self, request, instId,format=None):
         Object = self.get_object(instId)
         serializer = EditInstituteNameLogoSerializer(Object, data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class EditInstituteWebUrlView(APIView):
      def get_object(self, instId):
        try:
            return Institute.objects.get(pk=instId)
        except Institute.DoesNotExist:
            raise Http404
      def put(self, request, instId,format=None):
         Object = self.get_object(instId)
         serializer = EditInstituteWebUrlSerializer(Object, data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditInstituteAddressView(APIView):
      def get_object(self, instId):
        try:
            return Institute.objects.get(pk=instId)
        except Institute.DoesNotExist:
            raise Http404
      def put(self, request, instId,format=None):
         Object = self.get_object(instId)
         serializer = EditInstituteAddressSerializer(Object, data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddInstituteMembers(APIView):
    def get_object(self, instId):
        return get_object_or_404(Institute, pk=instId)

    def put(self, request, instId, addingUserId, format=None):
        adding_user = get_object_or_404(User, pk=addingUserId) 

        # Check if the adding user is an 'Owner' or 'Admin'
        if not InstituteMembership.objects.filter(
            user=adding_user,
            user_type__name__in=["Owner", "Admin"],
            institute__id=instId).exists():
            raise PermissionDenied("You do not have permission to add members.")

        institute = self.get_object(instId)
        serializer = AddMultipleInstituteMembersSerializer(data=request.data, context={'institute': institute, 'request': request})
       
        if serializer.is_valid():
            members = serializer.save()
            for userObj in request.data:
              
              userId = userObj['userId']
              addedUser = User.objects.get(pk=int(userId))
              addedUser.myinstitutes.add(institute)
              addedUser.save()

            return Response({
                'message': 'Members added successfully',
                'members_details': [{
                    'user_id': member.user.id,
                    'user_type': member.user_type.name,
                    'institute_name': institute.name,
                    'status': member.status,
                    'employee_id': member.employee_id
                } for member in members]
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListByInstituteView(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserMembershipSerializer
    pagination_class = StandardResultsPagination  # Use the pagination class

    def get_serializer_context(self):
        context = super(UserListByInstituteView, self).get_serializer_context()
        context['institute_id'] = self.request.query_params.get('institute_id')
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        institute_id = self.request.query_params.get('institute_id')
        is_member = self.request.query_params.get('is_member', None)
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        first_name_null = self.request.query_params.get('first_name_null', None)
        last_name_null = self.request.query_params.get('last_name_null', None)

        if institute_id:
            membership_ids = InstituteMembership.objects.filter(
                institute_id=institute_id
            ).values_list('user_id', flat=True)

            if is_member is not None:
                if is_member.lower() == 'true':
                    queryset = queryset.filter(id__in=membership_ids)
                elif is_member.lower() == 'false':
                    queryset = queryset.exclude(id__in=membership_ids)

        if first_name:
            queryset = queryset.filter(firstname__icontains=first_name)

        if last_name:
            queryset = queryset.filter(lastname__icontains=last_name)

        if first_name_null is not None:
            if first_name_null.lower() == 'null':
                queryset = queryset.filter(firstname__isnull=True)
            elif first_name_null.lower() == 'not null':
                queryset = queryset.filter(firstname__isnull=False)

        if last_name_null is not None:
            if last_name_null.lower() == 'null':
                queryset = queryset.filter(lastname__isnull=True)
            elif last_name_null.lower() == 'not null':
                queryset = queryset.filter(lastname__isnull=False)
    
        return queryset

class StandardResultsPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class UserListByCourseInInstituteView(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    pagination_class = StandardResultsPagination

    def get_serializer_class(self):
        if self.request.query_params.get('course_id'):
            return UserMembershipSerializer  # Used when course_id is also provided
        return UserCourseSerializer  # Used when only institute_id is provided

    def get_queryset(self):
        queryset = super().get_queryset()
        institute_id = self.request.query_params.get('institute_id')
        course_id = self.request.query_params.get('course_id')
        is_member = self.request.query_params.get('is_member', None)

        if institute_id:
            if course_id:
                # Ensure that the course is within the specified institute
                if Institute.objects.filter(id=institute_id, courses__id=course_id).exists():
                    user_ids = InstituteMembership.objects.filter(
                        institute_id=institute_id,
                        institute__courses__id=course_id
                    ).values_list('user_id', flat=True)
                    
                    if is_member is not None:
                        if is_member.lower() == 'true':
                            queryset = queryset.filter(id__in=user_ids)
                        else:
                            queryset = queryset.exclude(id__in=user_ids)
                    else:
                        queryset = queryset.filter(id__in=user_ids)
                else:
                    queryset = queryset.none()  # No users if the course is not in the institute
            else:
                # Filter users based on institute membership when only institute_id is provided
                user_ids = InstituteMembership.objects.filter(
                    institute_id=institute_id
                ).values_list('user_id', flat=True)

                queryset = queryset.filter(id__in=user_ids).distinct()

        return queryset
        
class UpdateMultipleInstituteMembers(APIView):
    def put(self, request, instId, userId):
        # Get the institute and validate it
        institute = get_object_or_404(Institute, pk=instId)

        # Validate the operator user
        operator = get_object_or_404(User, pk=userId)
        if not InstituteMembership.objects.filter(
            user=operator,
            user_type__name__in=["Owner", "Admin",'Staff'],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to modify members.")

        # Deserialize data and update each specified member
        updates = request.data.get('members', [])
        updated_members = []
        errors = []

        for update in updates:
            user_id = update.get('user_id')
            member_user = get_object_or_404(User, pk=user_id)
            membership = InstituteMembership.objects.filter(user=member_user, institute=institute).first()

            # Check if the member is part of the same institute
            if not membership:
                errors.append(f"User {user_id} is not part of the institute {instId}.")
                continue

            serializer = UpdateInstituteMemberSerializer(membership, data=update, partial=True)
            if serializer.is_valid():
                serializer.save()
                updated_members.append(serializer.data)
            else:
                errors.append(serializer.errors)

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Members updated successfully',
            'updated_members': updated_members
        }, status=status.HTTP_200_OK)
    
class InstituteMemberPagination(PageNumberPagination):
    page_size = 1000  # Define the number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 2000

class GetInstituteMembers(generics.ListAPIView):
    serializer_class = InstituteMemberSerializer
    pagination_class = InstituteMemberPagination

    def get_queryset(self):
        inst_id = self.kwargs.get('instId')
        user_type = self.request.query_params.get('user_type')
        status = self.request.query_params.get('status')  # Fetch the status from query parameters

        institute = get_object_or_404(Institute, pk=inst_id)
        
        # Initial check for permission can remain as is or be adjusted based on actual permission logic
        if not InstituteMembership.objects.filter(
            user_type__name__in=["Owner", "Admin", "Student", "Teacher",'Staff'],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to view members.")

        # queryset = InstituteMembership.objects.filter(institute=institute)

        queryset = InstituteMembership.objects.filter(
            institute=institute
        ).exclude(
            Q(user__firstname__isnull=True) | Q(user__firstname=''),
            Q(user__lastname__isnull=True) | Q(user__lastname='')
        )


        # Filter by user_type if provided
        if user_type:
            queryset = queryset.filter(user_type__name=user_type)

        # Filter by status if provided
        if status:
            queryset = queryset.filter(status=status)

        return queryset
    
class EditUserRoleView(APIView):
    def get_institute(self, inst_id):
        return get_object_or_404(Institute, pk=inst_id)

    def put(self, request, inst_id, user_id, format=None):
        institute = self.get_institute(inst_id)

        # Ensure the specified user_id has permission to edit user roles
        user = get_object_or_404(User, pk=user_id)  # Fetch user based on URL parameter
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to edit user roles.")

        print ("request.data: ", request.data)
        # Validate request data
        serializer = AddInstituteMemberSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate 'user_type' from request.data
        allowed_user_types = ["Student", "Owner", "Admin", "Teacher","Staff"]
        # Get 'userType' from the request data
        user_type_name = request.data.get('userType')  # Retrieve new user type
        member_user_id = request.data.get('userId')
        member_user_object = User.objects.get(pk=member_user_id)
        if user_type_name not in allowed_user_types:
            raise ValidationError({
                'error': f"Invalid user_type: {user_type_name}. Must be one of {', '.join(allowed_user_types)}."
            })
        
        # Fetch the existing InstituteMembership for this user and institute
        membership = get_object_or_404(InstituteMembership, user=member_user_id, institute=institute)

        # Update the user_type based on the new role from request.data
        new_user_type = InstitueMemberTypes.objects.get(name=user_type_name)  # Fetch the role by name
     
        membership.user_type = new_user_type  # Set the new user type
        membership.save()  # Save changes

          

        return Response({
            'message': 'User role updated successfully',
            'updated_role': {
                'user_id': membership.user.id,
                'user_type': membership.user_type.name,
                'institute_name': institute.name,
                'status': membership.status
            }
        }, status=status.HTTP_200_OK)
        
class DeleteInstituteMember(APIView):
    def delete(self, request, instId, userId, deletingUserId, format=None):
        # Check if the user attempting to delete has 'Owner' or 'Admin' permissions
        deleting_user = get_object_or_404(User, pk=deletingUserId)
        deletedUser = get_object_or_404(User, pk=userId)

        if not InstituteMembership.objects.filter(
            user=deleting_user,
            user_type__name__in=["Owner", "Admin",'Staff'],
            institute__id=instId).exists():
            raise PermissionDenied("You do not have permission to delete members.")

        # Retrieve the membership that needs to be deleted
        membership = InstituteMembership.objects.filter(
            institute__id=instId,
            user_id=userId
        ).first()

        if not membership:
            return Response({'message': 'No membership exists for this user in the specified institute'}, status=status.HTTP_404_NOT_FOUND)

        # Remove the user from all batches in the institute
        batches = Batch.objects.filter(institute__id=instId, users=deletedUser)
        for batch in batches:
            batch.users.remove(deletedUser)
            # Remove the user from the enrolled students of the courses in the batch
            for course in batch.courses.all():
                if deletedUser in course.enrolled_students.all():
                    course.enrolled_students.remove(deletedUser)

        # Delete the membership
        membership.delete()

        instituteObject = Institute.objects.get(pk=instId)
        deletedUser.myinstitutes.remove(instituteObject)          

        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class AddTypeToInstitute(APIView):
    def put(self, request, institute_id, adding_user_id, format=None):
        # Get the institute and the user attempting the addition
        institute = get_object_or_404(Institute, pk=institute_id)
        adding_user = get_object_or_404(User, pk=adding_user_id)

        # Check if the user has 'Owner' or 'Admin' permissions
        if not InstituteMembership.objects.filter(
            user=adding_user,
            user_type__name__in=["Owner", "Admin",'Staff'],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to add types to this institute.")

        # Validate the request data with the serializer
        serializer = AddTypeSerializer(data=request.data)
        if serializer.is_valid():
            type_name = serializer.validated_data["type_name"]
            type_url = serializer.validated_data.get("type_url", "")
         
            if institute.socialmedialinks.filter(name=type_name).exists():
                return Response({'error': f'Social media link with name "{type_name}" already exists within the institute.'}, status=status.HTTP_400_BAD_REQUEST)


            # Create a new type or use an existing one (e.g., SocialMediaLink)
            social_media_link = socialMediaLink.objects.create(
                name=type_name,
                link=type_url
            )
            institute.socialmedialinks.add(social_media_link)

            return Response({
                'type_id': social_media_link.id,
                'message': 'Type added successfully',
                'institute_name': institute.name,
                'type_name': type_name,
                'type_url': type_url
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class EditSocialMediaLinkInstituteView(APIView):
    def put(self, request, institute_id, editing_user_id, type_id, format=None):
        # Get the institute, user, and the specific type (e.g., SocialMediaLink) to be edited
        institute = get_object_or_404(Institute, pk=institute_id)
        editing_user = get_object_or_404(User, pk=editing_user_id)
        social_media_link = get_object_or_404(institute.socialmedialinks, pk=type_id)

        # Check if the user has 'Owner' or 'Admin' permissions
        if not InstituteMembership.objects.filter(
            user=editing_user,
            user_type__name__in=["Owner", "Admin",'Staff'],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to edit types for this institute.")

        # Validate the request data with the serializer
        serializer = EditSocialMediaLinkSerializer(social_media_link, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Type updated successfully',
                'institute_name': institute.name,
                'type_id': social_media_link.id,
                'type_name': serializer.data.get("name"),
                'type_url': serializer.data.get("link")
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteSocialMediaIconView(APIView):
    def delete(self, request, institute_id, socialmediaicon_id, format=None):
        # Get the institute and the user attempting the addition
        institute = get_object_or_404(Institute, pk=institute_id)
        adding_user = request.user

        # Check if the user has 'Owner' or 'Admin' permissions
        if not InstituteMembership.objects.filter(
            user=adding_user,
            user_type__name__in=["Owner", "Admin"],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to delete types to this institute.")

        # Get the social media object and delete it
        socialMediaObject = socialMediaLink.objects.get(pk=int(socialmediaicon_id))    
        socialMediaObject.delete()

        # Return a successful deletion response
        return Response({"message": "Social media icon successfully deleted."}, status=status.HTTP_200_OK)

class GetSocailMediaLinkInInstituteView(APIView):
    def get(self, request, institute_id, user_id, format=None):
        # Retrieve the Institute and verify the user's permission
        institute = get_object_or_404(Institute, pk=institute_id)
        user_membership = InstituteMembership.objects.filter(
            institute=institute,
            user_id=user_id
        )

        if not user_membership.exists():
            return Response({'error': "You do not have permission to access this institute's types."},
                            status=status.HTTP_403_FORBIDDEN)

        # Retrieve optional `type_id` parameter from the query parameters
        type_id = request.GET.get('type_id')

        if type_id:
            # If a specific `type_id` is provided, filter to return only that social media link
            social_media_link = get_object_or_404(institute.socialmedialinks, pk=type_id)
            serializer = GetSocialMediaLinkSerializer(social_media_link)
            return Response({
                'message': 'Type retrieved successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            # Otherwise, return all social media links associated with this institute
            social_media_links = institute.socialmedialinks.all()
            serializer = GetSocialMediaLinkSerializer(social_media_links, many=True)
            return Response({
                'message': 'All types retrieved successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
    
class InstituteMembersAttendanceView(APIView):
    def get(self, request, institute_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)

        # Create default attendance records if they don't already exist
        create_default_attendance(institute)
        # Fetch all attendance records for the specified institute for today
        attendance_records = Attendance.objects.filter(
            institute=institute,
            # attendance_date__date=timezone.now().date()  # Ensure correct date
        )
        # If the list is empty, provide an appropriate response
        if not attendance_records.exists():
            return Response({"message": "No attendance records found for today"}, status=status.HTTP_200_OK)

        # Serialize the attendance data and return it
        serializer = AttendanceSerializer(attendance_records, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateAttendanceView(APIView):
    def post(self, request, institute_id, creator_user_id):
        # Fetch the relevant institute and user
        institute = get_object_or_404(Institute, id=institute_id)
        user = get_object_or_404(User, id=creator_user_id)

        # Check if the user has permission to create attendance records
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin", "Teacher",'Staff']
        ).exists():
            raise PermissionDenied("You do not have permission to create attendance records for this institute.")

        responses = []
        attendance_data_list = request.data.get('attendances', [])

        for data in attendance_data_list:
            member_id = data.get('member')
            member = get_object_or_404(User, id=member_id)
            attendance_date = data.get('attendance_date')
            start_date = data.get('start_date')
            end_date = data.get('end_date')

            # Check for existing leave requests
            leaves = Leave.objects.filter(
                user=member,
                institute=institute,
                start_date__lte=end_date,
                end_date__gte=start_date,
                status__in=['pending', 'approved']
            )
            if leaves.exists():
                responses.append({
                    'error': 'Cannot create attendance record as the member is on leave.',
                    'member_id': member_id
                })
                continue  # Skip to the next iteration

            # Prepare attendance data
            attendance_data = {
                'institute': institute.id,
                'member': member.id,
                'start_date': start_date,
                'end_date': end_date,
                'attendance_date': attendance_date,
                'in_time': data.get('in_time'),
                'out_time': data.get('out_time'),
                'status': data.get('status', 'na'),
                'approver': data.get('approver'),
                'remarks': data.get('remarks', '')
            }

            # Use AttendanceCreateSerializer to handle validation and creation
            serializer = AttendanceCreateSerializer(data=attendance_data)
            if serializer.is_valid():
                serializer.save()
                responses.append(serializer.data)
            else:
                responses.append({'errors': serializer.errors, 'member_id': member_id})

        return Response(
            responses,
            status=status.HTTP_201_CREATED if all('errors' not in r for r in responses) else status.HTTP_400_BAD_REQUEST
        )
      
class UpdateAttendanceView(APIView):
    def put(self, request, institute_id, updater_user_id, attendance_id, format=None):
        logger.info("Request data: %s", request.data)
        
        # Validate the user making the request
        updater_user = get_object_or_404(User, pk=updater_user_id)

        # Check if the updater has required permissions (Owner, Admin, Teacher)
        has_permission = InstituteMembership.objects.filter(
            user=updater_user,
            user_type__name__in=["Owner", "Admin", "Teacher",'Staff'],
            institute_id=institute_id
        ).exists()

        # Fetch the attendance object
        attendance = get_object_or_404(Attendance, pk=attendance_id, institute_id=institute_id)

        # Check if the user is allowed to update the attendance
        if 'approver_status' in request.data and not has_permission:
            raise PermissionDenied("You do not have permission to update the approver status.")

        if not has_permission and attendance.member != updater_user:
            raise PermissionDenied("You do not have permission to update this attendance.")

        # Use a serializer to validate the incoming data
        serializer = AttendanceUpdateSerializer(attendance, data=request.data, partial=True)

        if serializer.is_valid():
            # Save the updated attendance record
            serializer.save()
            logger.info("Updated attendance: %s", serializer.data)
            return Response({"message": "Attendance updated successfully", "attendance": serializer.data}, status=status.HTTP_200_OK)
        else:
            # Return errors if the update validation failed
            logger.error("Serializer errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
def get_attendance_record(institute, user_id):
    # Fetch the unique attendance record for the given institute and member
    return Attendance.objects.get(
        institute=institute,
        member_id=user_id,
        attendance_date__date=timezone.now().date()
    )

class FilterAttendanceView(ListAPIView):
    serializer_class = AttendanceComprehensiveSerializer
    pagination_class = StandardResultsPagination

    def get_queryset(self):
        # Extract parameters from the request
        institute_id = self.kwargs.get('institute_id')
        institute = get_object_or_404(Institute, pk=institute_id)

        # Start building the query
        query = Attendance.objects.filter(institute=institute)

        # Extract filtering criteria from query params
        attendance_id = self.request.query_params.get('id', None)
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        user_id = self.request.query_params.get('user_id', None)

        # Apply filtering by attendance ID
        if attendance_id:
            query = query.filter(id=attendance_id)

        # Apply date filtering
        if start_date and end_date:
            query = query.filter(attendance_date__gte=start_date, attendance_date__lte=end_date)
        elif start_date:
            query = query.filter(attendance_date__gte=start_date)
        elif end_date:
            query = query.filter(attendance_date__lte=end_date)

        # Apply user filtering
        if user_id:
            query = query.filter(member_id=user_id)

        # Order by attendance_date in descending order
        query = query.order_by('-attendance_date')

        return query


class CombinedAttendanceAndLeaveView(APIView):
    def get(self, request, institute_id):
        # Extract parameters from the request
        institute = get_object_or_404(Institute, pk=institute_id)
        user_id = request.query_params.get('user_id', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)

        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, pk=user_id)

        # Fetch attendance records
        attendance_query = Attendance.objects.filter(institute=institute, member=user)
        if start_date and end_date:
            attendance_query = attendance_query.filter(attendance_date__date__gte=start_date, attendance_date__date__lte=end_date)
        elif start_date:
            attendance_query = attendance_query.filter(attendance_date__date__gte=start_date)
        elif end_date:
            attendance_query = attendance_query.filter(attendance_date__date__lte=end_date)

        attendance_data = AttendanceComprehensiveSerializer(attendance_query, many=True).data

        # Fetch leave records
        leave_query = Leave.objects.filter(institute=institute, user=user)
        if start_date and end_date:
            leave_query = leave_query.filter(start_date__lte=end_date, end_date__gte=start_date)
        elif start_date:
            leave_query = leave_query.filter(end_date__gte=start_date)
        elif end_date:
            leave_query = leave_query.filter(start_date__lte=end_date)

        # leave_query = leave_query.order_by('start_date')
        leave_data = LeaveSerializer(leave_query, many=True).data

        # Combine and sort results by start_date
        combined_data = [
            {"type": "attendance", "data": record, "start_date": record["start_date"]} for record in attendance_data
        ] + [
            {"type": "leave", "data": record, "start_date": record["start_date"]} for record in leave_data
        ]

        # Filter out records with None start_date and sort by start_date
        filtered_combined_data = [record for record in combined_data if record["start_date"] is not None]
        sorted_combined_data = sorted(filtered_combined_data, key=lambda x: datetime.strptime(x["start_date"], '%Y-%m-%d'), reverse=True)

        return Response(sorted_combined_data, status=status.HTTP_200_OK)

class ApproverAttendanceListView(APIView):
    def get(self, request, institute_id, approver_id):
        # Extract parameters from the request
        approver_status = request.query_params.get('approver_status', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        
        institute = get_object_or_404(Institute, pk=institute_id)
        approver = get_object_or_404(User, pk=approver_id)

        # Fetch attendance records
        attendance_query = Attendance.objects.filter(institute=institute, approver=approver)
        
        if approver_status:
            attendance_query = attendance_query.filter(approver_status=approver_status)
        
        if start_date and end_date:
            attendance_query = attendance_query.filter(attendance_date__gte=parse_date(start_date), attendance_date__lte=parse_date(end_date))
        elif start_date:
            attendance_query = attendance_query.filter(attendance_date__gte=parse_date(start_date))
        elif end_date:
            attendance_query = attendance_query.filter(attendance_date__lte=parse_date(end_date))
        
        attendance_data = AttendanceComprehensiveSerializer(attendance_query, many=True).data

        return Response(attendance_data, status=status.HTTP_200_OK)

class ApproverAttendanceListView(APIView):
    def get(self, request, institute_id, approver_id):
        # Extract parameters from the request
        approver_status = request.query_params.get('approver_status', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        # Fetch institute and approver
        institute = get_object_or_404(Institute, pk=institute_id)
        approver = get_object_or_404(User, pk=approver_id)

        # Build the base query
        attendance_query = Attendance.objects.filter(institute=institute, approver=approver)

        # Apply approver_status filter using Q object
        if approver_status:
            approver_status = f"'{approver_status}'"  # Manually add single quotes around the status
            attendance_query = attendance_query.extra(where=[f"approver_status = {approver_status}"])

        # Date filtering
        if start_date and end_date:
            attendance_query = attendance_query.filter(
                Q(attendance_date__gte=parse_date(start_date)) & Q(attendance_date__lte=parse_date(end_date))
            )
        elif start_date:
            attendance_query = attendance_query.filter(attendance_date__gte=parse_date(start_date))
        elif end_date:
            attendance_query = attendance_query.filter(attendance_date__lte=parse_date(end_date))
            
        # Apply pagination
        paginator = StandardResultsPagination()
        paginated_query = paginator.paginate_queryset(attendance_query, request)

        attendance_data = AttendanceComprehensiveSerializer(paginated_query, many=True).data
        print(f"Serialized attendance data: {attendance_data}")

        return paginator.get_paginated_response(attendance_data)

              
def clone_course(original_course, institute):
    # Start by duplicating the main course record
    new_course = Course.objects.get(pk=original_course.pk)
    new_course.pk = None  # This tricks Django into creating a new instance
    new_course.instituteName = institute.name
    new_course.instituteCity = institute.address  # Example field
    new_course.instituteCountry = institute.country  # Example field
    new_course.save()

    # Duplicate many-to-many relationships
    for teacher in original_course.teachers.all():
        new_course.teachers.add(teacher)

    # Assuming other relationships like videos, files, etc. follow a similar pattern
    for video in original_course.videos.all():
        new_course.videos.add(video)

    new_course.save()
    return new_course

class LinkCloneCourseToInstituteView(APIView):
    # Permission check is commented out ensure you handle authentication as needed
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to link course to institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user_id = request.user.id  # Assuming you are using authentication and the user is logged in

        # Validate the course to be linked
        serializer = LinkCourseSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        course_id = serializer.validated_data["course_id"]
        course = get_object_or_404(Course, pk=course_id)

        # Check if the user is the owner of the institute or the creator of the course
        is_institute_owner = InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner","Admin",'Staff']
        ).exists()
        
        if not (is_institute_owner or course.creater_id == user_id):
            logger.error(f"User {user_id} does not have permission to link course {course_id} to institute {institute_id}")
            raise PermissionDenied("You do not have sufficient permission to link this course.")

        # Clone and link the course if not already linked
        if not institute.courses.filter(id=course_id).exists():
            cloned_course = clone_course(course, institute)
            institute.courses.add(cloned_course)
            logger.debug("Course cloned and linked successfully")
            return Response({
                'message': 'Course cloned and linked successfully',
                'original_course_id': course_id,
                'new_course_id': cloned_course.id
            }, status=status.HTTP_201_CREATED)
        else:
            logger.debug("Course is already linked to this institute")
            return Response({
                'message': 'Course is already linked to this institute'
            }, status=status.HTTP_200_OK)
    

class CreateCourseAttendanceView(APIView):

    def post(self, request, institute_id, course_id, user_id):
        institute = get_object_or_404(Institute, id=institute_id)
        course = get_object_or_404(Course, id=course_id)
        
        # Check if the course is part of the institute
        if not institute.courses.filter(id=course_id).exists():
            raise PermissionDenied("The specified course does not belong to this institute.")
       
        # Check if the user has permission to delink courses from this institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin",'Staff']
        ).exists():
            raise PermissionDenied("You do not have permission to delink courses from this institute.")

        responses = []
        member_data_list = request.data.get('members', [])
        
        for data in member_data_list:
            data['institute'] = institute_id
            data['course'] = course_id
            data['member'] = data.pop('user_member')
            
            # Handling class_session if provided
            class_session_id = data.get('class_session_id')
            if class_session_id:
                class_session = get_object_or_404(Class, id=class_session_id)
                data['class_session'] = class_session.id

            # Ensure date and time fields are in the correct format
            data['attendance_date'] = data.get('attendance_date', '').split('T')[0]
            data['in_time'] = data.get('in_time', '').split('T')[1].split('Z')[0] if data.get('in_time') else None
            data['out_time'] = data.get('out_time', '').split('T')[1].split('Z')[0] if data.get('out_time') else None

            serializer = AttendanceCourseSerializer(data=data)

            try:
                if serializer.is_valid():
                    serializer.save()
                    responses.append(serializer.data)
                else:
                    responses.append({'member_id': data['member'], 'errors': serializer.errors})
            except Attendance.DoesNotExist:
                responses.append({'member_id': data['member'], 'errors': 'Attendance matching query does not exist.'})
            except Exception as e:
                responses.append({'member_id': data['member'], 'errors': str(e)})
        
        return Response(responses, status=status.HTTP_201_CREATED if all('errors' not in r for r in responses) else status.HTTP_400_BAD_REQUEST)
                   
class UpdateCourseAttendanceView(APIView):
    def patch(self, request):
        data = request.data.get('updates', [])
        responses = []

        for update_data in data:
            try:
                attendance = get_object_or_404(Attendance, id=update_data.get('id'))
                serializer = AttendanceCourseUpdateSerializer(attendance, data=update_data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    responses.append(serializer.data)
                else:
                    responses.append({'id': update_data.get('id'), 'errors': serializer.errors})
            except Attendance.DoesNotExist:
                responses.append({'id': update_data.get('id'), 'errors': 'Attendance matching query does not exist.'})
            except Exception as e:
                responses.append({'id': update_data.get('id'), 'errors': str(e)})

        return Response(responses, status=status.HTTP_200_OK if all('errors' not in r for r in responses) else status.HTTP_400_BAD_REQUEST)

class DeleteCourseAttendanceView(APIView):
    def delete(self, request):
        # This assumes that you receive a list of attendance record IDs to delete.
        attendance_ids = request.data.get('ids', [])
        responses = []

        for attendance_id in attendance_ids:
            try:
                attendance = get_object_or_404(Attendance, id=attendance_id)
                attendance.delete()
                responses.append({'id': attendance_id, 'status': 'deleted'})
            except Exception as e:
                responses.append({'id': attendance_id, 'error': str(e)})

        return Response(responses, status=status.HTTP_200_OK)

class AttendanceCourseListView(APIView):
    def get(self, request):
        # Extract filters from query parameters
        course_id = request.query_params.get('course_id')
        class_session_id = request.query_params.get('class_session_id')
        institute_id = request.query_params.get('institute_id')
        member_id = request.query_params.get('member_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Start building the query
        query = Attendance.objects.all()

        if course_id:
            query = query.filter(course_id=course_id)
        if class_session_id:
            query = query.filter(class_session_id=class_session_id)
        if institute_id:
            query = query.filter(institute_id=institute_id)
        if member_id:
            query = query.filter(member_id=member_id)
        if start_date:
            start_date = parse_date(start_date)
            query = query.filter(start_date__gte=start_date)
        if end_date:
            end_date = parse_date(end_date)
            query = query.filter(end_date__lte=end_date)

        # Apply pagination
        paginator = StandardResultsPagination()
        paginated_query = paginator.paginate_queryset(query, request)

        # Serialize the queryset
        serializer = AttendanceCourseSerializer(paginated_query, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    
class InstituteCourseSessionView(APIView):
    def get(self, request):
        institute_id = request.query_params.get('institute_id')
        course_id = request.query_params.get('course_id')
        class_session_id = request.query_params.get('class_session_id')

        # Handle class_session_id
        if class_session_id:
            class_session = get_object_or_404(Class, id=class_session_id)
            serializer = ClassSessionSerializer(class_session)
            return Response(serializer.data)

        # Handle course_id
        if course_id:
            course = get_object_or_404(Course, id=course_id)
            institute = course.institutes.first()  # Assuming a course is linked to only one institute
            classes = Class.objects.filter(courseId=course.id)
            course_serializer = CourseSerializer(course)
            class_serializer = ClassSessionSerializer(classes, many=True)
            return Response({
                'institute': InstituteSerializer(institute).data,
                'course': course_serializer.data,
                'classes': class_serializer.data
            })

        # Handle institute_id
        if institute_id:
            institute = get_object_or_404(Institute, id=institute_id)
            courses = institute.courses.all()
            classes = Class.objects.filter(courseId__in=[course.id for course in courses])
            institute_serializer = InstituteSerializer(institute)
            course_serializer = CourseSerializer(courses, many=True)
            class_serializer = ClassSessionSerializer(classes, many=True)
            return Response({
                'institute': institute_serializer.data,
                'courses': course_serializer.data,
                'classes': class_serializer.data
            })

        # If no parameters are provided, return all institutes
        institutes = Institute.objects.all()
        serializer = InstituteSerializer(institutes, many=True)
        return Response(serializer.data)
        
class GetInstituteCoursesView(APIView):
    def get(self, request, institute_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)  # Retrieve the institute
        courses = institute.courses.all()  # Get all courses associated with this institute
        # Serialize the courses
        serializer = CourseReferenceSerializer(courses, many=True)
        
        return Response({
            'courses': serializer.data
        }, status=status.HTTP_200_OK)

class CreateMemberLeavePolicyView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to create leave policy in institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin",'Staff']
        ).exists():
            raise PermissionDenied("You do not have permission to create leave policies for this institute.")

        leave_types = request.data.get('leave_types', [])
        member_type_ids = request.data.get('member_type_ids', [])

        response_data = []

        for member_type_id in member_type_ids:
            # Ensure the member_type_id is a valid number
            try:
                member_type_id = int(member_type_id)
            except ValueError:
                return Response({"error": f"Invalid member_type_id: {member_type_id}"}, status=status.HTTP_400_BAD_REQUEST)

            member_type = get_object_or_404(InstitueMemberTypes, pk=member_type_id)
            leave_policy, created = InstituteLeavePolicy.objects.get_or_create(
                institute=institute,
                member_type=member_type
            )

            for leave_type_data in leave_types:
                name = leave_type_data.get('name')
                total_leaves = leave_type_data.get('total_leaves', 0)
                leave_type, created = LeaveType.objects.get_or_create(
                    institute=institute,
                    name=name,
                    defaults={'total_leaves': total_leaves}
                )
                if not created:
                    leave_type.total_leaves = total_leaves
                    leave_type.save()
                leave_policy.leave_types.add(leave_type)

            leave_policy.save()

            # Update UserLeaveBalance for users in the specified member type
            users = User.objects.filter(institutemembership__institute=institute, institutemembership__user_type=member_type)
            for user in users:
                for leave_type in leave_policy.leave_types.all():
                    user_balance, created = UserLeaveBalance.objects.update_or_create(
                        user=user,
                        institute=institute,
                        leave_type=leave_type,
                        leave_policy=leave_policy,
                        defaults={'total_paid_leaves': leave_type.total_leaves}
                    )
                    if not created:
                        user_balance.total_paid_leaves = leave_type.total_leaves
                        user_balance.save()

            # Serialize the created leave policy along with member details
            leave_policy_serializer = InstituteMemberLeavePolicySerializer(leave_policy)
            response_data.append({
                'leave_policy': leave_policy_serializer.data,
                'member_type': InstituteMemberTypesSerializer(member_type).data
            })

        return Response(response_data, status=status.HTTP_201_CREATED)
    
class UpdateMemberLeavePolicyView(APIView):
    def put(self, request, institute_id, user_id, format=None):
        logger.debug(f"PUT request to update leave policy in institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin",'Staff']
        ).exists():
            raise PermissionDenied("You do not have permission to update leave policies for this institute.")

        leave_types = request.data.get('leave_types', [])
        member_type_ids = request.data.get('member_type_ids', [])

        # Iterate over each member type and update the leave policies
        for member_type_id in member_type_ids:
            member_type = get_object_or_404(InstitueMemberTypes, pk=member_type_id)
            leave_policy = get_object_or_404(InstituteLeavePolicy, institute=institute, member_type=member_type)

            # Update or create leave types based on name
            for leave_type_data in leave_types:
                name = leave_type_data.get('name')
                total_leaves = leave_type_data.get('total_leaves', 0)
                leave_type, created = LeaveType.objects.update_or_create(
                    institute=institute,
                    name=name,
                    defaults={'total_leaves': total_leaves}
                )

                # Add the leave type to the policy if it's not already there
                if leave_type not in leave_policy.leave_types.all():
                    leave_policy.leave_types.add(leave_type)
                else:
                    # If the leave type exists, update the total leaves
                    leave_type.total_leaves = total_leaves
                    leave_type.save()

            leave_policy.save()

            # Update UserLeaveBalance for all users in the specified member type
            users = User.objects.filter(institutemembership__institute=institute, institutemembership__user_type=member_type)
            for user in users:
                for leave_type in leave_policy.leave_types.all():
                    user_balance, created = UserLeaveBalance.objects.update_or_create(
                        user=user,
                        institute=institute,
                        leave_type=leave_type,
                        leave_policy=leave_policy,
                        defaults={'total_paid_leaves': leave_type.total_leaves}
                    )
                    if not created:
                        user_balance.total_paid_leaves = leave_type.total_leaves
                    user_balance.save()

        return Response({'status': 'Leave policies updated and user balances adjusted'}, status=status.HTTP_200_OK)
             
class DeleteMemberLeavePolicyView(APIView):
    def delete(self, request, institute_id, user_id, leave_type_id, member_type_id, format=None):
        logger.debug(f"DELETE request to delete leave type {leave_type_id} for member type {member_type_id} in institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        leave_type = get_object_or_404(LeaveType, pk=leave_type_id, institute=institute)
        member_type = get_object_or_404(InstitueMemberTypes, pk=member_type_id)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to delete leave policies from this institute.")

        # Get the leave policy for the specified member type
        leave_policy = get_object_or_404(InstituteLeavePolicy, institute=institute, member_type=member_type)

        # Remove the leave type from the leave policy
        if leave_type in leave_policy.leave_types.all():
            leave_policy.leave_types.remove(leave_type)
            leave_policy.save()

            # Update UserLeaveBalance for all users in the specified member type
            users = User.objects.filter(institutemembership__institute=institute, institutemembership__user_type=member_type)
            for user in users:
                user_balances = UserLeaveBalance.objects.filter(user=user, institute=institute, leave_type=leave_type, leave_policy=leave_policy)
                user_balances.delete()

        return Response({'status': 'Leave type removed from leave policy and user balances updated'}, status=status.HTTP_204_NO_CONTENT)
            
class GetLeaveMemberPolicyListView(APIView):
    def get(self, request, institute_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)

        member_type_id = request.query_params.get('member_type_id')
        leave_type_id = request.query_params.get('leave_type_id')

        response_data = []

        if member_type_id:
            member_types = InstitueMemberTypes.objects.filter(id=member_type_id, leave_policies__institute=institute).distinct()
        else:
            member_types = InstitueMemberTypes.objects.filter(leave_policies__institute=institute).distinct()

        for member_type in member_types:
            leave_policies = InstituteLeavePolicy.objects.filter(institute=institute, member_type=member_type)
            
            if leave_type_id:
                leave_policies = leave_policies.filter(leave_types__id=leave_type_id)
            
            serializer = InstituteMemberLeavePolicySerializer(leave_policies, many=True)
            member_type_serializer = InstituteMemberTypesSerializer(member_type)
            
            response_data.append({
                'member_type': member_type_serializer.data,
                'leave_policies': serializer.data
            })

        return Response(response_data, status=status.HTTP_200_OK)

class CreateLeavePolicyView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to create leave policy in institute {institute_id} by user {user_id}")

        try:
            institute_id = int(institute_id)
        except ValueError:
            return Response({"error": f"Invalid institute_id: {institute_id}"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = int(user_id)
        except ValueError:
            return Response({"error": f"Invalid user_id: {user_id}"}, status=status.HTTP_400_BAD_REQUEST)

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin",'Staff']
        ).exists():
            raise PermissionDenied("You do not have permission to create leave policies for this institute.")

        leave_types = request.data.get('leave_types', [])
        for leave_type_data in leave_types:
            name = leave_type_data.get('name')
            total_leaves = leave_type_data.get('total_leaves', 0)
            leave_type, created = LeaveType.objects.update_or_create(
                institute=institute,
                name=name,
                defaults={'total_leaves': total_leaves}
            )

            # Update UserLeaveBalance for all users in the institute
            users = User.objects.filter(institutemembership__institute=institute)
            for user in users:
                user_balance, created = UserLeaveBalance.objects.update_or_create(
                    user=user,
                    institute=institute,
                    leave_type=leave_type,
                    defaults={'total_paid_leaves': total_leaves}
                )
                if not created:
                    user_balance.total_paid_leaves = total_leaves
                    user_balance.save()

        return Response({'status': 'Leave policies created and user balances adjusted'}, status=status.HTTP_200_OK)
         
class UpdateLeavePolicyView(APIView):
    def put(self, request, institute_id, user_id, leave_type_id=None, format=None):
        logger.debug(f"PUT request to update leave policy in institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to update leave policy.")

        total_leaves = request.data.get('total_leaves', 0)
        new_name = request.data.get('new_name')
        leave_type = None

        if leave_type_id:
            leave_type = get_object_or_404(LeaveType, pk=leave_type_id, institute=institute)
        else:
            leave_type_name = request.data.get('leave_type_name')
            leave_type = get_object_or_404(LeaveType, name=leave_type_name, institute=institute)

        leave_type.total_leaves = total_leaves
        if new_name:
            leave_type.name = new_name
        leave_type.save()

        # Update UserLeaveBalance for all users in the institute
        with transaction.atomic():
            users = User.objects.filter(institutemembership__institute=institute)
            for user in users:
                user_balances = UserLeaveBalance.objects.filter(
                    user=user, institute=institute, leave_type=leave_type
                )

                if user_balances.exists():
                    if user_balances.count() > 1:
                        # Handle duplicate records by deleting the extras
                        user_balances.exclude(pk=user_balances.first().pk).delete()
                    
                    user_balance = user_balances.first()
                    user_balance.total_paid_leaves = total_leaves
                    user_balance.save()
                else:
                    UserLeaveBalance.objects.create(
                        user=user, institute=institute, leave_type=leave_type, total_paid_leaves=total_leaves
                    )

        logger.debug(f"Successfully updated leave policy for leave_type {leave_type.id} in institute {institute_id} by user {user_id}")
        return Response({'status': 'Leave policy updated and user balances adjusted'}, status=status.HTTP_200_OK)
    
class DeleteLeavePolicyView(APIView):
    def delete(self, request, institute_id, user_id, leave_type_id, format=None):
        logger.debug(f"DELETE request to delete leave policy {leave_type_id} in institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        leave_type = get_object_or_404(LeaveType, pk=leave_type_id, institute=institute)

        # Ensure the user is the owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to delink courses from this institute.")

        # Update UserLeaveBalance for all users in the institute
        users = User.objects.filter(institutemembership__institute=institute)
        for user in users:
            user_balance = get_object_or_404(UserLeaveBalance, user=user, institute=institute, leave_type=leave_type)
            user_balance.delete()

        # Delete the leave type
        leave_type.delete()

        return Response({'status': 'Leave policy deleted and user balances removed'}, status=status.HTTP_204_NO_CONTENT)

class GetLeavePolicyListView(APIView):
    def get(self, request, institute_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        leave_types = LeaveType.objects.filter(institute=institute)
        serializer = LeaveTypeSerializer(leave_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
                         
class LeaveCreateView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to create leave in institute {institute_id} by user {user_id}")

        try:
            institute = get_object_or_404(Institute, pk=institute_id)
            user = get_object_or_404(User, pk=user_id)

            # Ensure the user is part of the institute
            user_membership = get_object_or_404(InstituteMembership, user=user, institute=institute)
            logger.debug(f"user_membership: {user_membership}")
            
            # Fetch the member type from the user membership
            member_type = user_membership.user_type
            logger.debug(f"member_type: {member_type}")
            
            if not member_type:
                return Response({'detail': 'User does not have a valid member type'}, status=status.HTTP_400_BAD_REQUEST)

            # Prevent duplicate leave requests
            start_date = datetime.strptime(request.data.get("start_date"), "%Y-%m-%d")
            end_date = datetime.strptime(request.data.get("end_date"), "%Y-%m-%d")
            if Leave.objects.filter(institute=institute, user=user, start_date=start_date, end_date=end_date).exists():
                return Response({
                    'detail': 'A leave request for this period already exists'
                }, status=status.HTTP_409_CONFLICT)

            serializer = LeaveCreateUpdateSerializer(data=request.data, context={'institute': institute})
            
            if serializer.is_valid():
                leave_days = (end_date - start_date).days + 1  # Calculate the number of leave days
                is_paid = serializer.validated_data.get("is_paid", True)

                # Determine the leave type based on is_paid and leave_type_category_id
                leave_type_id = serializer.validated_data.pop("leave_type_category_id", None)
                if leave_type_id:
                    leave_type = get_object_or_404(LeaveType, pk=leave_type_id, institute=institute)
                else:
                    leave_type_name = "Paid Leave" if is_paid else "Unpaid Leave"
                    leave_type = LeaveType.objects.filter(name=leave_type_name, institute=institute).first()
                    if not leave_type:
                        leave_type = LeaveType.objects.create(
                            name=leave_type_name,
                            institute=institute,
                            total_leaves=20 if is_paid else 0
                        )

                # Fetch or create the leave policy for the user member type
                leave_policy, created = InstituteLeavePolicy.objects.get_or_create(
                    institute=institute,
                    member_type=member_type
                )
                if created:
                    leave_policy.leave_types.add(leave_type)
                    leave_policy.save()

                # Check if user has enough paid leaves if the leave type is for a paid leave
                user_balance = UserLeaveBalance.objects.filter(user=user, institute=institute, leave_type=leave_type, leave_policy=leave_policy).first()
                logger.debug(f"user_balance: {user_balance}")
                if not user_balance:
                    logger.debug(f"user_balance inside if: {user_balance}")
                    logger.debug(f"user: {user}")
                    logger.debug(f"institute: {institute}")
                    logger.debug(f"leave_type: {leave_type}")
                    logger.debug(f"leave_policy: {leave_policy}")
                    user_balance = UserLeaveBalance.objects.create(
                        user=user,
                        institute=institute,
                        leave_type=leave_type,
                        leave_policy=leave_policy,
                        total_paid_leaves=20 if is_paid else 0  # Default total paid leaves
                    )
                    logger.debug(f"user_balance created: {user_balance}")

                if is_paid and user_balance.remaining_paid_leaves() < leave_days:
                    return Response({
                        'detail': f'Insufficient paid leave balance for {leave_type.name}'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Update leave balance if the leave is paid
                if is_paid:
                    user_balance.update_leave_balance(leave_days, is_paid)

                leave = Leave.objects.create(user=user, institute=institute, **serializer.validated_data)
                leave.leave_type_categories.set([leave_type])  # Correctly set the ManyToManyField

                # Check if the approver is part of the same institute (if provided)
                approver_id = serializer.validated_data.get("approver_id")
                if approver_id:
                    approver = get_object_or_404(User, pk=approver_id)
                    if not InstituteMembership.objects.filter(user=approver, institute=institute).exists():
                        raise PermissionDenied("The approver must be part of the same institute.")
                    leave.approver = approver
                    leave.save()

                return Response({
                    'message': 'Leave request created successfully',
                    'leave': LeaveSerializer(leave).data
                }, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error creating leave request: {e}")
            return Response({'detail': 'An error occurred while creating the leave request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                          
class LeaveBalanceView(APIView):
    def get(self, request, institute_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        
        # Ensure the user is part of the institute
        if not InstituteMembership.objects.filter(user=user, institute=institute).exists():
            return Response({
                'detail': 'The specified user is not a member of the institute'
            }, status=status.HTTP_404_NOT_FOUND)

        # Get all leave balances for the user in the specified institute
        leave_balances = UserLeaveBalance.objects.filter(user=user, institute=institute)
        data = {
            'user': user.username,
            'institute': institute.name,
            'leave_balances': []
        }

        for balance in leave_balances:
            data['leave_balances'].append({
                'leave_type': balance.leave_type.name,
                'total_paid_leaves': balance.total_paid_leaves,
                'availed_paid_leaves': balance.availed_paid_leaves,
                'availed_unpaid_leaves': balance.availed_unpaid_leaves,
                'remaining_paid_leaves': balance.remaining_paid_leaves()
            })

        return Response(data, status=status.HTTP_200_OK)

    
class LeaveUpdateView(APIView):
    def put(self, request, institute_id, user_id, leave_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        leave = get_object_or_404(Leave, pk=leave_id)
        user = get_object_or_404(User, pk=user_id)

        # Ensure the user is part of the institute
        user_membership = get_object_or_404(InstituteMembership, user=user, institute=institute)
        user_role = user_membership.user_type.name

        # Get the role of the leave's owner
        leave_owner_membership = get_object_or_404(InstituteMembership, user=leave.user, institute=institute)
        leave_owner_role = leave_owner_membership.user_type.name

        # Define allowed roles for updating based on the role of the leave owner
        allowed_roles = {
            'Owner': ['Admin', 'Owner','Staff'],
            'Admin': ['Admin', 'Owner','Staff'],
            'Teacher': ['Admin', 'Owner','Staff'],
            'Student': ['Admin', 'Owner', 'Teacher','Staff'],
        }

        # # Check if the user has permission to update the leave request based on roles
        # if user_role not in allowed_roles.get(leave_owner_role, []):
        #     raise PermissionDenied("You do not have permission to update this leave request.")

        # Store the original leave type category, is_paid status, and dates for balance adjustment
        original_leave_type_category = list(leave.leave_type_categories.all())
        original_is_paid = leave.is_paid
        original_start_date = leave.start_date
        original_end_date = leave.end_date

        # Calculate the original leave days
        original_leave_days = (original_end_date - original_start_date).days + 1

        # Update leave data with the provided information
        serializer = LeaveCreateUpdateSerializer(leave, data=request.data, partial=True, context={'institute': institute})

        if serializer.is_valid():
            # Determine the leave type based on is_paid and leave_type_category_id
            leave_type_id = serializer.validated_data.get("leave_type_category_id", None)
            if leave_type_id:
                leave_type = get_object_or_404(LeaveType, pk=leave_type_id, institute=institute)
            else:
                is_paid = serializer.validated_data.get("is_paid", leave.is_paid)
                leave_type_name = "Paid Leave" if is_paid else "Unpaid Leave"
                leave_type = LeaveType.objects.filter(name=leave_type_name, institute=institute).first()
                if not leave_type:
                    leave_type = LeaveType.objects.create(
                        name=leave_type_name,
                        institute=institute,
                        total_leaves=20 if is_paid else 0
                    )
                    # Ensure leave policy exists for this leave type
                    leave_policy, created = InstituteLeavePolicy.objects.get_or_create(
                        institute=institute,
                        member_type=user_membership.user_type
                    )
                    leave_policy.leave_types.add(leave_type)
                    leave_policy.save()

            updated_leave = serializer.save()
            updated_leave.leave_type_categories.set([leave_type])  # Correctly set the ManyToManyField

            # Calculate the updated leave days
            updated_leave_days = (updated_leave.end_date - updated_leave.start_date).days + 1

            # Adjust the user leave balance if leave type category, is_paid status, or dates have changed
            if (original_leave_type_category != list(updated_leave.leave_type_categories.all()) or
                original_is_paid != updated_leave.is_paid or
                original_leave_days != updated_leave_days):

                for orig_leave_type in original_leave_type_category:
                    original_user_balance = get_object_or_404(UserLeaveBalance, user=leave.user, institute=institute, leave_type=orig_leave_type)
                    if original_is_paid:
                        original_user_balance.availed_paid_leaves -= original_leave_days
                    else:
                        original_user_balance.availed_unpaid_leaves -= original_leave_days
                    original_user_balance.save()

                for new_leave_type in updated_leave.leave_type_categories.all():
                    new_user_balance = get_object_or_404(UserLeaveBalance, user=updated_leave.user, institute=institute, leave_type=new_leave_type)

                    # Check if the updated leave days exceed the user's paid leave balance
                    if updated_leave.is_paid and new_user_balance.remaining_paid_leaves() < updated_leave_days:
                        # Reverse the changes to the original balance if the new balance is insufficient
                        for orig_leave_type in original_leave_type_category:
                            original_user_balance = get_object_or_404(UserLeaveBalance, user=leave.user, institute=institute, leave_type=orig_leave_type)
                            if original_is_paid:
                                original_user_balance.availed_paid_leaves += original_leave_days
                            else:
                                original_user_balance.availed_unpaid_leaves += original_leave_days
                            original_user_balance.save()
                        
                        return Response({
                            'detail': f'Insufficient paid leave balance for {leave_type.name}'
                        }, status=status.HTTP_400_BAD_REQUEST)

                    # Apply the updated leave days with the new status
                    if updated_leave.is_paid:
                        new_user_balance.availed_paid_leaves += updated_leave_days
                    else:
                        new_user_balance.availed_unpaid_leaves += updated_leave_days
                    new_user_balance.save()

            return Response({
                'message': 'Leave request updated successfully',
                'leave': LeaveSerializer(updated_leave).data
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
class LeavesApprovalView(APIView):
    def get(self, request, institute_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)

        # Check if the user with the given user_id has permission to view leave requests
        approver = get_object_or_404(User, pk=user_id)  # User acting as approver

        # Get the role of the approver
        approver_role = InstituteMembership.objects.filter(
            user=approver,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        # Define roles that have permission to view leave requests as approver
        allowed_roles = ["Admin", "Owner", "Teacher"]

        # Check if the approver has the appropriate role
        if approver_role not in allowed_roles:
            raise PermissionDenied("You do not have permission to view leave requests.")

        # Retrieve leaves where approver_id matches the given user_id
        leaves_query = Leave.objects.filter(institute=institute, approver=approver)

        # Apply additional filters based on query parameters, if needed
        status_filter = request.query_params.get('status')  # Example: 'pending', 'approved', etc.
        if status_filter:
            leaves_query = leaves_query.filter(status=status_filter)

        # Serialize the leaves to return
        serializer = LeaveListSerializer(leaves_query, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the filtered list of leaves

class ApproversListView(APIView):
    def get(self, request, institute_id, user_id):
        # Get the institute
        institute = get_object_or_404(Institute, pk=institute_id)

        # Retrieve the user and their membership details
        user = get_object_or_404(User, pk=user_id)
        requester_membership = get_object_or_404(InstituteMembership, user=user, institute=institute)
        requester_role = requester_membership.user_type.name

        # Define allowed roles for fetching based on the requester's role
        role_access_map = {
            'Owner': ['Admin'],
            'Admin': ['Owner'],
            'Teacher': ['Admin', 'Owner'],
            'Student': ['Teacher', 'Admin', 'Owner']
        }

        # Determine the roles to fetch based on the user's role
        roles_to_fetch = role_access_map.get(requester_role, [])

        # Fetch users whose roles are in the determined roles_to_fetch list
        approvers = InstituteMembership.objects.filter(
            institute=institute,
            user_type__name__in=roles_to_fetch
        ).select_related('user')

        # Serialize and return the data
        serializer = UserSerializer([membership.user for membership in approvers], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
      
class UserLeavesListView(APIView):
    def get(self, request, institute_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)

        # Get the user whose leaves need to be viewed
        target_user = get_object_or_404(User, pk=user_id)

        # Check if the requester is allowed to view the leaves
        # requester_user_id = request.user.id
        
        # Get the requester user from query parameters
        requester_user_id = request.query_params.get('requester_user_id')
        if not requester_user_id:
            return Response({'detail': 'Requester user ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        requester_user = get_object_or_404(User, pk=requester_user_id)
        requester_membership = get_object_or_404(InstituteMembership, user=requester_user, institute=institute)
        requester_role = requester_membership.user_type.name

        target_user_membership = get_object_or_404(InstituteMembership, user=target_user, institute=institute)
        target_user_role = target_user_membership.user_type.name

        allowed_roles = {
            'Owner': ['Admin', 'Owner'],
            'Admin': ['Admin', 'Owner', 'Teacher'],
            'Teacher': ['Admin', 'Owner', 'Teacher'],
            'Student': ['Admin', 'Owner', 'Teacher', 'Student']
        }

        if requester_role not in allowed_roles.get(target_user_role, []):
            raise PermissionDenied("You do not have permission to view these leave requests.")

        # Get all leaves for the specific user
        user_leaves = Leave.objects.filter(institute=institute, user=target_user)
        serializer = LeaveListSerializer(user_leaves, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class LeaveEditView(APIView):
    def put(self, request, institute_id, leave_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        leave = get_object_or_404(Leave, pk=leave_id)

        # Ensure the user has permission to edit the leave request
        user_role = InstituteMembership.objects.filter(
            user=request.user,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        leave_owner_role = InstituteMembership.objects.filter(
            user=leave.user,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        allowed_edit_roles = {
            'Owner': ['Admin', 'Owner'],
            'Admin': ['Admin', 'Owner'],
            'Teacher': ['Admin', 'Owner'],
            'Student': ['Admin', 'Owner', 'Teacher']
        }

        if leave_owner_role not in allowed_edit_roles.get(user_role, []):
            raise PermissionDenied("You do not have permission to edit this leave request.")

        # Edit the leave request
        serializer = LeaveEditSerializer(leave, data=request.data, partial=True)
        if serializer.is_valid():
            edited_leave = serializer.save()
            return Response({
                'message': 'Leave request edited successfully',
                'leave': LeaveEditSerializer(edited_leave).data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LeaveDeleteView(APIView):
    def delete(self, request, institute_id, leave_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        leave = get_object_or_404(Leave, pk=leave_id)
        user = get_object_or_404(User, pk=user_id)

        # Get the role of the user associated with the leave
        leave_user_role = InstituteMembership.objects.filter(
            user=leave.user,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        # Define roles that can delete their own leave or other users' leave
        allowed_roles = ['Admin', 'Owner']  # Roles with broader permissions

        # Check if the user from the leave is allowed to delete their own leave
        if leave.user == user or leave_user_role in allowed_roles:
            leave_days = (leave.end_date - leave.start_date).days + 1  # Calculate the number of leave days
            if leave.is_paid:
                # Adjust the user leave balance for each leave type category
                for leave_type in leave.leave_type_categories.all():
                    user_balance = get_object_or_404(UserLeaveBalance, user=leave.user, institute=institute, leave_type=leave_type)
                    user_balance.availed_paid_leaves -= leave_days
                    user_balance.save()
            leave.delete()
            return Response({
                'message': 'Leave request deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)

        raise PermissionDenied("You do not have permission to delete this leave request.")
    
class UpdateLeaveStatusView(APIView):
    def post(self, request, institute_id, leave_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)
        leave = get_object_or_404(Leave, pk=leave_id)

        # Check if the user has permission to update the leave status
        if user_id != leave.approver_id:
            raise PermissionDenied("You do not have permission to update this leave request.")

        # Verify the role of the approver to ensure they have sufficient permissions
        approver_role = InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        if approver_role not in ["Admin", "Owner", "Teacher"]:
            raise PermissionDenied("Your role does not allow updating leave status.")

        # Update the leave status from request data (ensure it's a valid status)
        new_status = request.data.get("status")
        if new_status not in ["approved", "denied", "pending", "canceled"]:
            return Response({
                'error': 'Invalid status provided'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Update the leave with the new status and save
        leave.status = new_status
        leave.save()

        return Response({
            'message': 'Leave status updated successfully',
            'leave': LeaveSerializer(leave).data
        }, status=status.HTTP_200_OK)
    
class ApproverListView(APIView):
    def get(self, request, institute_id, user_id, format=None):
        institute = get_object_or_404(Institute, pk=institute_id)

        # Get the user's role in the institute
        user_role = InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute
        ).values_list('user_type__name', flat=True).first()

        if not user_role:
            raise PermissionDenied("User role could not be determined.")
        
        print(f"User ID: {user_id}, Role: {user_role}")

        # Define approvers based on user roles
        approver_roles = {
            'Owner': ['Admin', 'Owner'],
            'Admin': ['Admin', 'Owner'],
            'Teacher': ['Admin', 'Owner', 'Teacher'],
            'Staff': ['Admin', 'Owner', 'Teacher'],
            'Student': ['Admin', 'Owner', 'Teacher'],  # Student role can be approved by Teacher
        }

        # Get roles that can act as approvers for the given user's role
        allowed_approvers = approver_roles.get(user_role, [])

        if not allowed_approvers:
            raise PermissionDenied("No approvers found for the given user role.")
        
        # Retrieve users with roles that can be approvers within the institute, excluding the requester
        approver_users = InstituteMembership.objects.filter(
            institute=institute,
            user_type__name__in=allowed_approvers
        ).exclude(user_id=user_id).values_list('user', flat=True).distinct()
        
        approver_user_ids = list(approver_users)
        approvers = User.objects.filter(id__in=approver_user_ids)
        serializer = UserSerializer(approvers, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class AssetCreateView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        # Get the institute and user
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]  # or whatever field represents role
        ).exists():
            raise PermissionDenied("Only the owner or admin can add assets to this institute.")

        # Create asset after passing permission check

        print ("request.data: ", request.data)
        serializer = AssetSerializer(data=request.data)

        print("serializer.is_valid(): ", serializer.is_valid())
        if serializer.is_valid():
            asset = serializer.save(institute=institute)  # Link to the correct institute
            return Response({
                'message': 'Asset created successfully',
                'asset': AssetSerializer(asset).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AssetUpdateView(APIView):
    def put(self, request, institute_id, asset_id, user_id, format=None):
        # Get the institute, asset, and user
        institute = get_object_or_404(Institute, pk=institute_id)
        asset = get_object_or_404(Asset, pk=asset_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the user has required permissions (e.g., Owner, Admin)
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]  # or appropriate role/field
        ).exists():
            raise PermissionDenied("Only the owner or admin can update assets in this institute.")

        # Validate and update the asset
        serializer = AssetSerializer(asset, data=request.data, partial=True)  # Allow partial updates

        if serializer.is_valid():
            serializer.save()  # Save the updated asset
            return Response({
                'message': 'Asset updated successfully',
                'asset': AssetSerializer(asset).data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AssetListView(generics.ListAPIView):
    serializer_class = AssetSerializer

    def get_queryset(self):
        queryset = Asset.objects.all()  # Start with all assets

        # Retrieve query parameters
        params = self.request.query_params
        logger.debug(f"Query Parameters: {params}")

        # Filtering by institute_id
        institute_id = params.get('institute_id', None)
        if institute_id:
            queryset = queryset.filter(institute_id=institute_id)

        # Filtering by asset_id
        asset_id = params.get('id', None)
        if asset_id:
            queryset = queryset.filter(id=asset_id)

        # Filtering by created_at with exact or range
        created_at = params.get('created_at', None)
        created_at_gte = params.get('created_at__gte', None)
        created_at_lte = params.get('created_at__lte', None)

        if created_at:
            queryset = queryset.filter(created_at=created_at)

        if created_at_gte:
            queryset = queryset.filter(created_at__gte=created_at_gte)

        if created_at_lte:
            queryset = queryset.filter(created_at__lte=created_at_lte)

        return queryset  # Return the filtered queryset

class AssetDeleteView(APIView):
    def delete(self, request, institute_id, asset_id, user_id, format=None):
        # Get the institute, asset, and user
        institute = get_object_or_404(Institute, pk=institute_id)
        asset = get_object_or_404(Asset, pk=asset_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the user has required permissions (e.g., Owner, Admin)
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("Only the owner or admin can delete assets from this institute.")

        asset.delete()  # Delete the asset

        return Response(
            {'message': 'Asset deleted successfully'},
            status=status.HTTP_204_NO_CONTENT  # Return HTTP 204 indicating successful deletion
        )

class TimeTableCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, institute_id=None, user_id=None, format=None):
        user = get_object_or_404(User, pk=user_id)
        institute = get_object_or_404(Institute, pk=institute_id)
        
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("Only the owner or admin can add PDFs to this institute.")
        
        data = request.data.copy()
        data['institute'] = institute.id  # Add the institute ID to the data
        
        serializer = TimetableSerializer(data=data)
        if serializer.is_valid():
            timetable = serializer.save(uploaded_by=user)
            return Response({
                'message': 'Timetable created successfully',
                'timetable': TimetableSerializer(timetable).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
class TimeTableUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, institute_id, user_id, timetable_id, format=None):
        # Get the institute, user, and Timetable object
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        timetable = get_object_or_404(Timetable, pk=timetable_id)

        # Check if the user has permission to update this Timetable
        if user.id != timetable.uploaded_by.id:
            raise PermissionDenied("You are not allowed to update this Timetable.")

        # Update the Timetable
        serializer = TimetableSerializer(timetable, data=request.data, partial=True)

        if serializer.is_valid():
            updated_timetable = serializer.save()  # Save the updated Timetable
            return Response({
                'message': 'Timetable updated successfully',
                'timetable': TimetableSerializer(updated_timetable).data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TimeTableDeleteView(APIView):
    def delete(self, request, institute_id=None, user_id=None, timetable_id=None, format=None):
        # Get the institute, user, and the timetable to be deleted
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        timetable = get_object_or_404(Timetable, pk=timetable_id)

        # Check if the user has permission to delete this timetable
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists() and user.id != timetable.uploaded_by.id:
            raise PermissionDenied("Only the owner, admin, or the uploader can delete this timetable.")

        # Delete the timetable
        timetable.delete()

        return Response({
            'message': 'Timetable deleted successfully'
        }, status=status.HTTP_200_OK)
    

class TimetableFilterView(APIView):
    def get(self, request, format=None):
        # Get query parameters for filtering
        start_date_str = request.query_params.get('start_date', None)  # Start date for filtering
        end_date_str = request.query_params.get('end_date', None)  # End date for filtering
        timetable_id = request.query_params.get('timetable_id', None)  # ID of a specific timetable
        course_id = request.query_params.get('course_id', None)  # Course ID to filter timetables
        institute_id = request.query_params.get('institute_id', None)  # Institute ID to filter timetables
        batch_id = request.query_params.get('batch_id', None)  # Batch ID to filter timetables
        
        # Parse dates if provided
        start_date = parse_date(start_date_str) if start_date_str else None
        end_date = parse_date(end_date_str) if end_date_str else None
        
        # Apply filtering based on provided parameters
        timetables = Timetable.objects.all()  # Start with all timetables
        
        if start_date and end_date:
            # Filter timetables created within the date range
            timetables = timetables.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)

        if timetable_id:
            timetables = timetables.filter(id=timetable_id)  # Filter by specific timetable ID
        
        if course_id:
            timetables = timetables.filter(courses__id=course_id)  # Filter by course ID
        
        if institute_id:
            timetables = timetables.filter(institute_id=institute_id)  # Filter by institute ID
        
        if batch_id:
            timetables = timetables.filter(batches__id=batch_id)  # Filter by batch ID
        
        # Serialize and return the filtered timetables
        serializer = TimetableSerializer(timetables, many=True, context={'batch_id': batch_id})
        return Response({
            'timetables': serializer.data
        }, status=status.HTTP_200_OK)
            
class CreateInstituteOfficialView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        # Retrieve the institute and user
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the user has permission to create an official for this institute
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]  # Adjust roles based on your system
        ).exists():
            raise PermissionDenied("Only the owner or admin can add officials to this institute.")

        # Create official after passing permission check
        serializer = InstituteOfficialSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new official and link it to the institute
            official = serializer.save(institute=institute)
            return Response({
                'message': 'Official created successfully',
                'official': InstituteOfficialSerializer(official).data
            }, status=status.HTTP_201_CREATED)  # Return success response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Handle invalid data
    
class EditInstituteOfficialView(APIView):
    def put(self, request, institute_id, official_id, user_id, format=None):
        # Get the institute and the official
        institute = get_object_or_404(Institute, pk=institute_id)
        official = get_object_or_404(InstituteOfficial, pk=official_id)

        # Check if the user has permission to edit this official
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("Only the owner or admin can edit officials.")

        # Use the update serializer to validate and save changes
        serializer = InstituteOfficialUpdateSerializer(official, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()  # Save the updated official
            return Response({
                'message': 'Official updated successfully',
                'official': serializer.data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteInstituteOfficialView(APIView):
    def delete(self, request, institute_id, official_id, user_id, format=None):
        # Retrieve the institute and the official to be deleted
        institute = get_object_or_404(Institute, pk=institute_id)
        official = get_object_or_404(InstituteOfficial, pk=official_id)

        # Check if the user has permission to delete this official
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("Only the owner or admin can delete officials.")

        # Delete the official
        official.delete()

        return Response({
            'message': 'Official deleted successfully'
        }, status=status.HTTP_200_OK)  # Return success response
    
class GetInstituteOfficialsByInstituteIDView(APIView):
    def get(self, request, institute_id, format=None):
        # Retrieve the Institute by ID
        institute = get_object_or_404(Institute, pk=institute_id)

        # Extract the official_id from query parameters
        official_id = request.query_params.get('official_id', None)
        
        if official_id:
            # Check if the official with provided ID is associated with the institute
            official = get_object_or_404(InstituteOfficial, pk=official_id, institute=institute)
            serializer = InstituteOfficialSerializer(official)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Get all officials linked to the specified institute
            officials = institute.officials.all()  # Assuming 'officials' is the related name in InstituteOfficial
            
            # Serialize officials with their details
            serializer = InstituteOfficialSerializer(officials, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK) 

class GroupListView(generics.ListAPIView):
    serializer_class = GroupSerializer  # Serializer for Group model

    def get_queryset(self):
        queryset = Group.objects.all()

        # Filtering by institute ID to list groups of a specific institute
        institute_id = self.request.query_params.get('institute_id', None)
        if institute_id:
            queryset = queryset.filter(institute_id=institute_id)

        return queryset

class PostToGroupView(generics.CreateAPIView):
    serializer_class = PostSerializer  # Serializer for Post model

    def perform_create(self, serializer):
        group_id = self.request.data.get('group_id', None)
        group = Group.objects.get(id=group_id)  # Retrieve the group to which the post will be added
        serializer.save(author=self.request.user, group=group)  # Save the post with the author and group


# Create a default institute if needed
#default_institute, created = Institute.objects.get_or_create(name='Default Institute')

# Create a default group
#default_group, created = Group.objects.get_or_create(
#    id=1,  # Ensure it has ID 1 if that's your default
#    name='Default Group',
#    institute=default_institute,
#    defaults={'created_at': timezone.now()}
#)

class CreateGroupForInstituteView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        # Retrieve the institute where the group will be created
        institute = get_object_or_404(Institute, pk=institute_id)

        # Check if the user has the required role to create a group
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner", "Admin", "Teacher"]
        ).exists():
            raise PermissionDenied("Only the owner, admin, or teacher can create groups.")

        # Create the group with the given data and link it to the institute
        serializer = CreateGroupSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save(institute=institute)  # Save the created group
            
            # Add all institute members to the new group
            institute_members = InstituteMembership.objects.filter(institute=institute)  # Get all institute members
            for member in institute_members:
                GroupMembership.objects.create(
                    group=group,
                    user=member.user,
                    role=member.user_type  # Assign the same role from InstituteMembership
                )

            return Response(
                {
                    "message": "Group created successfully. All institute members were added to the group.",
                    "group_id": group.id,  # Return the group_id
                    "group": serializer.data  # Serialized group data
                },
                status=status.HTTP_201_CREATED  # Successful creation
            )
        else:
            return Response(
                {
                    "message": "Failed to create group.",
                    "errors": serializer.errors  # Validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # Invalid data
            )

class GetAllMembersInGroupView(generics.ListAPIView):
    serializer_class = GroupMembershipSerializer

    def get_queryset(self):
        group_id = self.kwargs.get('group_id')  # Get the group ID from URL
        group = Group.objects.filter(id=group_id).first()  # Retrieve the group

        if not group:
            raise NotFound("Group not found.")  # If group doesn't exist, raise 404 error

        # Get all members in the group
        queryset = GroupMembership.objects.filter(group=group)

        return queryset  # Return the members in the group

class AddPostToGroupView(APIView):
    def post(self, request, institute_id, group_id, user_id, format=None):

        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if the user belongs to the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must belong to the institute to add a post to the group.")

        # Retrieve the specified group
        group = get_object_or_404(Group, id=group_id, institute_id=institute_id)

        # Create the post with the provided data
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save(author=user, group=group)  # Save the post with the group and author
            
            # Retrieve the newly created post using `PostWithCommentsSerializer`
            detailed_post_serializer = PostWithCommentsSerializer(post)
            
            return Response(
                {
                    "message": "Post added to the group successfully.",
                    "post": detailed_post_serializer.data  # Detailed post data with comments, like count, etc.
                },
                status=status.HTTP_201_CREATED  # Successful creation
            )
        else:
            return Response(
                {
                    "message": "Failed to add post to the group.",
                    "errors": serializer.errors  # Validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # Invalid data
            )
        
class EditPostView(APIView):
    def put(self, request, institute_id, post_id, user_id, format=None):
        # Retrieve the post to be edited
        post = get_object_or_404(Post, id=post_id)

        # Check if the user is allowed to edit the post
        if post.author.id != user_id:
            raise PermissionDenied("You are not allowed to edit this post.")

        # Retrieve the institute membership to ensure user is part of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must belong to the institute to edit this post.")

        # Validate and update the post
        serializer = EditPostSerializer(post, data=request.data, partial=True)  # Partial update allows editing specific fields
        if serializer.is_valid():
            serializer.save()  # Save the changes to the post
            return Response(
                {
                    "message": "Post edited successfully.",
                    "post": serializer.data  # Return the edited post data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to edit post.",
                    "errors": serializer.errors  # Return validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # Invalid data
            )

# View to delete a post with permission checks
class DeletePostView(APIView):
    def delete(self, request, institute_id, post_id, user_id, format=None):
        # Retrieve the post to be deleted
        post = get_object_or_404(Post, id=post_id)

        # Check if the user is allowed to delete the post (usually the author or admin)
        if post.author.id != user_id:
            raise PermissionDenied("You are not allowed to delete this post.")

        # Verify that the user belongs to the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must belong to the institute to delete this post.")

        # Delete the post
        post.delete()  # Perform the deletion
        
        return Response(
            {
                "message": "Post deleted successfully."
            },
            status=status.HTTP_200_OK  # Successful deletion
        )

# View to add a comment to a post with permission checks
class AddCommentToPostView(APIView):
    def post(self, request, institute_id, post_id, user_id, format=None):

        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Ensure the user belongs to the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must be a member of the institute to add a comment.")

        # Retrieve the post to add a comment
        post = get_object_or_404(Post, id=post_id)

        # Create a new comment
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            comment = serializer.save(author=user, post=post)  # Set the author and post
            return Response(
                {
                    "message": "Comment added successfully.",
                    "comment_id": comment.id,
                    "comment": serializer.data  # Serialized comment data
                },
                status=status.HTTP_201_CREATED  # Successful creation
            )
        else:
            return Response(
                {
                    "message": "Failed to add comment.",
                    "errors": serializer.errors  # Validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # Invalid data
            )

# View to edit a comment with permission checks
class EditCommentView(APIView):
    def put(self, request, institute_id, comment_id, user_id, format=None):
        # Retrieve the comment to be edited
        comment = get_object_or_404(Comment, id=comment_id)

        # Check if the user is the author of the comment or has appropriate permissions
        if comment.author.id != user_id:
            raise PermissionDenied("You are not allowed to edit this comment.")

        # Validate and update the comment
        serializer = EditCommentSerializer(comment, data=request.data, partial=True)  # Allow partial update
        if serializer.is_valid():
            serializer.save()  # Save the changes to the comment
            return Response(
                {
                    "message": "Comment edited successfully.",
                    "comment_id": comment.id,
                    "comment": serializer.data  # Return the edited comment data
                },
                status=status.HTTP_200_OK  # Successful update
            )
        else:
            return Response(
                {
                    "message": "Failed to edit comment.",
                    "errors": serializer.errors  # Validation errors
                },
                status=status.HTTP_400_BAD_REQUEST  # Invalid data
            )

class DeleteCommentView(APIView):
    def delete(self, request, institute_id, comment_id, user_id, format=None):
        # Retrieve the comment to be deleted
        comment = get_object_or_404(Comment, id=comment_id)

        # Check if the user is the author or has higher permissions (like admin)
        if comment.author.id != user_id:
            raise PermissionDenied("You are not allowed to delete this comment.")

        # Ensure the user is part of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must belong to the institute to delete this comment.")

        # Delete the comment
        comment.delete()  # Perform the deletion
        
        return Response(
            {
                "message": "Comment deleted successfully."
            },
            status=status.HTTP_200_OK  # Successful deletion
        )
    
# Custom pagination class to control results per page
class StandardResultsPagination(PageNumberPagination):
    page_size = 100  # Default number of results per page
    page_size_query_param = 'page_size'  # Allow clients to request different page sizes
    max_page_size = 1000  # Maximum page size

# View to get all posts with manual filtering, pagination, and ordering by updated_at
class PostListView(generics.ListAPIView):
    serializer_class = PostWithCommentsSerializer  # Serializer for detailed post information
    pagination_class = StandardResultsPagination  # Enable pagination
    filter_backends = [filters.OrderingFilter]  # Allow ordering by specific fields
    ordering_fields = ['updated_at', 'created_at']  # Fields for ordering
    ordering = ['-updated_at']  # Default ordering by updated_at

    def get_queryset(self):
        queryset = Post.objects.all()  # Retrieve all posts
        query_params = self.request.query_params

        # Filter by post_id
        post_id = query_params.get('post_id', None)
        if post_id:
            queryset = queryset.filter(id=post_id)

        # Filter by institute_id
        institute_id = query_params.get('institute_id', None)
        if institute_id:
            queryset = queryset.filter(group__institute__id=institute_id)

        # Filter by user_id (author)
        user_id = query_params.get('user_id', None)
        if user_id:
            queryset = queryset.filter(author__id=user_id)

        # Order by updated_at
        queryset = queryset.order_by('-updated_at')

        return queryset
    
# View to like a post with permission checks
class LikePostView(APIView):
    def post(self, request, institute_id, group_id, post_id, user_id, format=None):

        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Ensure the user is part of the institute
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must be a member of the institute to like this post.")

        # Retrieve the post
        post = get_object_or_404(Post, id=post_id, group__id=group_id)  # Ensure it's in the specified group

        # Add the user to the likes Many-to-Many field
        post.likes.add(user)  # Add the user to the likes

        return Response(
            {
                "message": "Post liked successfully."
            },
            status=status.HTTP_200_OK  # Successful operation
        )

def calculate_due_date(start_date, months):
    return start_date + relativedelta(months=months)


class SchedulePaymentView(APIView):
    def post(self, request, institute_id, admin_user_id, format=None):
        # Fetch the admin user and institute
        admin_user = get_object_or_404(User, id=admin_user_id)
        institute = get_object_or_404(Institute, id=institute_id)

        # Check if the user has administrative permissions
        if not InstituteMembership.objects.filter(user=admin_user, institute=institute, user_type__name__in=["Admin", "Owner"]).exists():
            raise PermissionDenied("You must have administrative permissions to schedule payments.")

        request_data = request.data.copy()
        request_data['institute'] = institute.id
        user_id = request_data.get('user')
        custom_user = request_data.get('custom_user', None)

        if user_id == "":
            user_id = None

        # Ensure either a registered user or a custom user is provided
        if user_id is not None:
            user = get_object_or_404(User, id=user_id)
            if not InstituteMembership.objects.filter(user=user, institute=institute).exists():
                raise PermissionDenied("Billed user must be a member of the institute.")
            request_data['user'] = user.id
        elif custom_user:
            request_data['custom_user'] = custom_user
        else:
            return Response({"message": "Either a registered user or a custom user must be provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and save the InstituteFee using the serializer
        serializer = FeeSerializer(data=request_data)
        if serializer.is_valid():
            #print ("date_of_schedule: ", request.data['date_of_schedule'])
            fee = serializer.save(date_of_schedule= request.data['date_of_schedule'] ) #timezone.now()
            start_date = fee.date_of_schedule or timezone.now()
            installments = []

            # Generate installments based on the type
            if request.data.get('installment_type') == 'equal':
                num_installments = int(request.data.get('number_of_installments'))
                installment_amount = fee.amount / num_installments
                for i in range(num_installments):
                    installments.append(InstituteFeeInstallment(
                        fee=fee,
                        amount=installment_amount,
                        due_date=calculate_due_date(start_date, i),
                        status='scheduled'
                    ))
            elif request.data.get('installment_type') == 'unequal':
                for inst in request.data.get('installments', []):
                    paid_date = dateutil_parser.parse(inst['paid_date']) if 'paid_date' in inst else None
                    payment_status = 'paid' if paid_date else 'scheduled'
                    installments.append(InstituteFeeInstallment(
                        fee=fee,
                        amount=inst['amount'],
                        due_date=dateutil_parser.parse(inst['due_date']),
                        paid_date=paid_date,
                        status=payment_status
                    ))

            # Bulk create the installments
            InstituteFeeInstallment.objects.bulk_create(installments)

            # Send an email with the payment details
            if user_id is not None:
                user = get_object_or_404(User, id=user_id)
                self.send_payment_email(user, fee, installments, institute)

            return Response({
                "message": "Payment and installments scheduled successfully.",
                "fee_id": fee.id,
                "installments": [inst.id for inst in installments],
                "fee_details": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message": "Failed to schedule payment.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
    def send_payment_email(self, user, fee, installments, institute):
        subject = 'Payment Details'
        message = f'Dear {user.firstname},\n\nYour payment has been scheduled. Please find the attached payment details.\n\nBest regards,\n{institute.name}\n{institute.logo}'
        email = EmailMultiAlternatives(subject, message, to=[user.email])
        # email = EmailMultiAlternatives(subject, message, to=['mtapas.mohanty95@gmail.com'])

        # Fetch bank details
        bank_details = institute.bank_details.first()

        # Generate PDF
        pdf_buffer = BytesIO()
        p = canvas.Canvas(pdf_buffer, pagesize=letter)
        p.drawString(100, 750, "Payment Details")
        p.drawString(100, 730, f"User: {user.firstname} {user.lastname}")
        p.drawString(100, 710, f"Institute: {institute.name}")
        p.drawString(100, 690, f"Amount: {fee.amount}")
        p.drawString(100, 670, f"Due Amount: {fee.due_amount}")
        p.drawString(100, 650, f"Description: {fee.description}")

        y = 630
        for inst in installments:
            p.drawString(100, y, f"Installment: {inst.amount} - Due Date: {inst.due_date.strftime('%Y-%m-%d')} - Status: {inst.get_status_display()}")
            y -= 20

        if bank_details:
            p.drawString(100, y - 20, "Bank Details:")
            p.drawString(100, y - 40, f"Bank Name: {bank_details.bank_name}")
            p.drawString(100, y - 60, f"Account Number: {bank_details.bank_account_number}")
            p.drawString(100, y - 80, f"IFSC Code: {bank_details.ifsc_code}")
            p.drawString(100, y - 100, f"UPI ID: {bank_details.upi_id}")
            p.drawString(100, y - 120, f"Phone Number: {bank_details.phone_number}")

        p.showPage()
        p.save()

        pdf_buffer.seek(0)
        email.attach('payment_details.pdf', pdf_buffer.getvalue(), 'application/pdf')

        # Attach logo image
        if institute.logo:
            logo_path = institute.logo.name
            logo_content = default_storage.open(logo_path).read()
            logo_mime_type, _ = mimetypes.guess_type(logo_path)

            # Referencing the logo in the HTML content
            message = f'''
            <html>
            <body>
                <p>Dear {user.firstname},</p>
                <p>Your payment has been scheduled. Please find the attached payment details.</p>
                <p>Best regards,<br>{institute.name}</p>
                <img src="cid:logo_image" alt="Institute Logo">
            </body>
            </html>
            '''
            # email.content_subtype = 'html'
            email.attach_alternative(message, "text/html")
            email.attach('logo_image', logo_content, logo_mime_type)
        else:
            email.body = message
   
        # Send email
        email.send()

    def failure_response(self, serializer):
        return Response({
            "message": "Failed to schedule payment.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def failure_response(self, serializer):
        return Response({
            "message": "Failed to schedule payment.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class SchedulePaymentViewOld(APIView):
    def post(self, request, institute_id, admin_user_id, format=None):
        admin_user = get_object_or_404(User, id=admin_user_id)
        institute = get_object_or_404(Institute, id=institute_id)

        if not InstituteMembership.objects.filter(user=admin_user, institute=institute, user_type__name__in=["Admin", "Owner"]).exists():
            raise PermissionDenied("You must have administrative permissions to schedule payments.")


        request_data = request.data.copy()
        request_data['institute'] = institute.id
        print ("request.data: ", request.data)
        user_id = request_data.get('user')
        custom_user = request_data.get('custom_user', None)
        if user_id:
            user = get_object_or_404(User, id=user_id)
            print ("InstituteMembership.objects.filter(user=user, institute=institute).exists()",InstituteMembership.objects.filter(user=user, institute=institute).exists())
            if not InstituteMembership.objects.filter(user=user, institute=institute).exists():
                raise PermissionDenied("Billed user must be a member of the institute.")
            request_data['user'] = user.id
        elif not custom_user:
            return Response({"message": "Either a registered user or a custom user must be provided."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FeeSerializer(data=request_data)
        print ("valid serializer: ", serializer.is_valid())
        if serializer.is_valid():
            fee = serializer.save(date_of_schedule=timezone.now())
            start_date = fee.date_of_schedule or timezone.now()
            installments = []

            if request.data.get('installment_type') == 'equal':
                num_installments = int(request.data.get('number_of_installments'))
                installment_amount = fee.amount / num_installments
                for i in range(num_installments):
                    installments.append(InstituteFeeInstallment(
                        fee=fee,
                        amount=installment_amount,
                        due_date=calculate_due_date(start_date, i),
                        status='scheduled'
                    ))
            elif request.data.get('installment_type') == 'unequal':
                for inst in request.data.get('installments', []):
                    paid_date = dateutil_parser.parse(inst['paid_date']) if 'paid_date' in inst else None
                    payment_status = 'paid' if paid_date else 'scheduled'
                    installments.append(InstituteFeeInstallment(
                        fee=fee,
                        amount=inst['amount'],
                        due_date=dateutil_parser.parse(inst['due_date']),
                        paid_date=paid_date,
                        status=payment_status
                    ))

            InstituteFeeInstallment.objects.bulk_create(installments)
            return Response({
                "message": "Payment and installments scheduled successfully.",
                "fee_id": fee.id,
                "installments": [inst.id for inst in installments],
                "fee_details": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message": "Failed to schedule payment.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)     
                      
class EditScheduledPaymentView(APIView):
    def put(self, request, institute_id, fee_id, user_id, format=None):
        user = get_object_or_404(User, id=user_id)
        institute = get_object_or_404(Institute, id=institute_id)

        # Ensure the user has permission to edit payments
        if not InstituteMembership.objects.filter(user=user, institute=institute).exists():
            raise PermissionDenied("You must be a member of the institute to edit a payment.")

        fee = get_object_or_404(InstituteFee, pk=fee_id, institute=institute)
        if fee.user != user and (fee.custom_user != request.data.get('custom_user', fee.custom_user)):
            raise PermissionDenied("You do not have permission to edit this payment.")

        request_data = request.data.copy()
        request_data['user'] = user.id
        request_data['institute'] = institute.id

        serializer = FeeEditSerializer(fee, data=request_data, partial=True)
        if serializer.is_valid():
            updated_fee = serializer.save()

            # Update existing installments
            installments_data = request.data.get('installments', [])
            for inst_data in installments_data:
                installment = get_object_or_404(InstituteFeeInstallment, id=inst_data['id'], fee=updated_fee)
                if 'paid_date' in inst_data:
                    installment.mark_as_paid(inst_data['paid_date'])
                elif 'amount' in inst_data:
                    installment.amount = inst_data['amount']
                if 'due_date' in inst_data:
                    installment.due_date = inst_data['due_date']
                installment.save()

            # Add new installments if provided
            new_installments_data = request.data.get('new_installments', [])
            for inst_data in new_installments_data:
                inst_data['fee'] = updated_fee.id
                inst_serializer = InstallmentSerializer(data=inst_data)
                if inst_serializer.is_valid():
                    inst_serializer.save()
                else:
                    return Response({
                        "message": "Failed to add new installment.",
                        "errors": inst_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                
            # Assuming fee and installment information has been updated
            fee.recalculate_due_amount()
            return Response({
                "message": "Payment and installments updated successfully.",
                "fee_id": updated_fee.id,
                "fee_details": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Failed to update payment.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class AddCashPaymentView(APIView):
    def post(self, request, institute_id, fee_id, user_id, format=None):
        # Retrieve the user and institute
        user = get_object_or_404(User, id=user_id)
        institute = get_object_or_404(Institute, id=institute_id)

        # Ensure the user has permission to add payments
        if not InstituteMembership.objects.filter(user=user, institute=institute).exists():
            raise PermissionDenied("You must be a member of the institute to add payments.")

        # Retrieve the fee to add a payment
        fee = get_object_or_404(InstituteFee, pk=fee_id)

        # Check if the user is associated with the fee (either as a registered or custom user)
        if fee.user != user and (not fee.custom_user or fee.custom_user != request.data.get('custom_user')):
            raise PermissionDenied("You do not have permission to add payments to this fee.")

        # Calculate new due amount and create a transaction
        payment_amount = request.data.get('amount', 0)
        new_due_amount = max(fee.due_amount - float(payment_amount), 0)

        # Update the due amount in the fee
        fee.due_amount = new_due_amount
        fee.save(update_fields=['due_amount'])

        # Record the transaction
        transaction_data = {
            'fee': fee.id,
            'user': user.id,
            'institute': institute.id,
            'amount': payment_amount,
            'user_type': 'debit',  # Since the user is paying
            'institute_type': 'credit',  # Institute is receiving
            'status': 'completed',
            'method': 'cash',
            'date_of_payment': timezone.now()
        }
        transaction_serializer = TransactionFeeSerializer(data=transaction_data)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
            return Response({
                "message": "Cash payment added successfully.",
                "new_due_amount": new_due_amount,
                "transaction_details": transaction_serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
               
class DeleteScheduledPaymentView(APIView):
    def delete(self, request, institute_id, fee_id, user_id, installment_id=None, format=None):
        # Ensure the user is a member of the institute
        if not InstituteMembership.objects.filter(user_id=user_id, institute_id=institute_id).exists():
            raise PermissionDenied("You must be a member of the institute to delete a payment.")

        # Retrieve the fee
        fee = get_object_or_404(InstituteFee, id=fee_id, institute_id=institute_id)

        # Ensure the user is authorized to delete this payment
        # if fee.user.id != user_id:
        #     raise PermissionDenied("You are not authorized to delete this payment.")

        # Check if a specific installment needs to be deleted
        if installment_id:
            # Retrieve and delete the specified installment
            installment = get_object_or_404(InstituteFeeInstallment, id=installment_id, fee=fee)
            installment.delete()
            message = "Installment deleted successfully."
        else:
            # No specific installment mentioned, delete the entire fee and its installments
            fee.delete()
            message = "Payment and all associated installments deleted successfully."

        return Response(
            {"message": message},
            status=status.HTTP_200_OK 
        )

class CustomPagination(PageNumberPagination):
    page_size = 10000000  # Number of items per page
    page_size_query_param = 'page_size'  # Query parameter to specify page size
    max_page_size = 100000000  # Maximum page size allowed

class GetFeePaymentsView(generics.ListAPIView):
    serializer_class = FeeViewSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        # Start with all fees
        queryset = InstituteFee.objects.all().prefetch_related('institute_transactions')

        # Retrieve parameters from URL or query string
        institute_id = self.request.query_params.get("institute_id")
        user_id = self.request.query_params.get("user_id")
        fee_id = self.request.query_params.get("fee_id")
        type_transaction = self.request.query_params.get("type_transaction")
        description = self.request.query_params.get("description")


        if institute_id:
            get_object_or_404(Institute, id=institute_id)
            queryset = queryset.filter(institute_id=institute_id)

        if user_id:
            get_object_or_404(User, id=user_id)
            queryset = queryset.filter(user_id=user_id)

        if fee_id:
            queryset = queryset.filter(id=fee_id)
            return queryset
        if type_transaction:
            queryset = queryset.filter(type_transaction=type_transaction)

        if description:
            queryset = queryset.annotate(similarity=TrigramSimilarity('description', description)).filter(similarity__gt=0.3).order_by('-similarity')
        # Optional: Handle date range filtering
        start_date_str = self.request.query_params.get("start_date")
        end_date_str = self.request.query_params.get("end_date")

        if start_date_str:
            try:
                start_date = parse_datetime(start_date_str)
                if start_date:
                    queryset = queryset.filter(date_of_schedule__gte=start_date)
            except (ValueError, TypeError):
                raise ValidationError({"start_date": "Invalid date format."})

        if end_date_str:
            try:
                end_date = parse_datetime(end_date_str)
                if end_date:
                    queryset = queryset.filter(date_of_schedule__lte=end_date)
            except (ValueError, TypeError):
                raise ValidationError({"end_date": "Invalid date format."})

        return queryset
  
def generate_detailed_transaction_pdf(fee_data):
    # Create a byte stream for the PDF
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)

    # Add transaction details to the PDF
    pdf.drawString(1 * inch, 10 * inch, f"Transaction ID: {fee_data['transaction_id']}")
    pdf.drawString(1 * inch, 9.5 * inch, f"Name: {fee_data['name']}")
    pdf.drawString(1 * inch, 9 * inch, f"Amount: ${fee_data['amount']}")
    pdf.drawString(1 * inch, 8.5 * inch, f"Type: {fee_data['type']}")
    pdf.drawString(1 * inch, 8 * inch, f"Description: {fee_data['description']}")
    pdf.drawString(1 * inch, 7.5 * inch, f"Method: {fee_data['method']}")
    pdf.drawString(1 * inch, 7 * inch, f"Status: {fee_data['status']}")
    pdf.drawString(1 * inch, 6.5 * inch, f"Date of Schedule: {fee_data['date_of_schedule']}")
    pdf.drawString(1 * inch, 6 * inch, f"Date of Payment: {fee_data['date_of_payment']}")

    # Include user information
    pdf.drawString(1 * inch, 5.5 * inch, f"User: {fee_data['user']['firstname']} {fee_data['user']['lastname']} ({fee_data['user']['username']})")
    pdf.drawString(1 * inch, 5 * inch, f"Email: {fee_data['user']['email']})")

    # Include institute information
    pdf.drawString(1 * inch, 4.5 * inch, f"Institute: {fee_data['institute']['name']}")

    # Finalize the PDF
    pdf.showPage()
    pdf.save()

    # Reset buffer position
    buffer.seek(0)

    # Create a Django file object
    return ContentFile(buffer.read(), f"{fee_data['transaction_id']}.pdf")


class GetDetailPaymentReportView(APIView):

      def get(self, request, fee_id, format=None):
        try:
            institute_fee = InstituteFee.objects.prefetch_related('institute_transactions').get(pk=fee_id)
        except InstituteFee.DoesNotExist:
            return Response({'error': 'InstituteFee not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = InstituteOneFeeSerializer(institute_fee)
        return Response(serializer.data, status=status.HTTP_200_OK)
      
from decimal import Decimal

class ProcessScheduledPaymentView(APIView):
    def post(self, request, institute_id, fee_id, user_id, format=None):
        # Ensure user and institute are valid
        user = get_object_or_404(User, id=user_id)
        institute = get_object_or_404(Institute, id=institute_id)

        # Get the fee
        fee = get_object_or_404(InstituteFee, id=fee_id)

        # Check authorization
        # if fee.user and fee.user.id != user_id:
        #     raise PermissionDenied("You're not authorized to process this payment.")
        if fee.institute.id != institute_id:
            raise PermissionDenied("You're not authorized to process this payment.")

        # Get payment amount from request
        payment_amount = Decimal(request.data.get('amount'))
        if payment_amount <= 0:
            return Response({"message": "Payment amount must be greater than zero."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure payment amount does not exceed due amount
        if payment_amount > fee.due_amount:
            return Response({"message": "Payment amount exceeds the due amount."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark the fee as completed
        fee.date_of_payment = timezone.now()

        # Determine transaction type and set user_type and institute_type
        transaction_type = request.data.get('transaction_type', 'debit')
        if transaction_type == 'debit':
            user_type = 'credit'
            institute_type = 'debit'
        elif transaction_type == 'credit':
            user_type = 'debit'
            institute_type = 'credit'
        else:
            return Response(
                {"message": "Invalid transaction type."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a transaction for the scheduled payment
        transaction = InstituteTransaction.objects.create(
            fee=fee,
            user=user,
            institute=institute,
            transaction_id=str(uuid.uuid4()),  # Generate a unique transaction ID
            method=request.data.get('method', 'bank_transfer'),  # Default payment method
            status=request.data.get('status', 'completed'),  # Since the fee is processed
            amount=payment_amount,  # Amount being paid
            date_of_payment=fee.date_of_payment,
            user_type=user_type,  # User type based on transaction type
            institute_type=institute_type,  # Institute type based on transaction type
            transaction_type =transaction_type
        )

        # Update fee's due amount and payment status
        fee.recalculate_due_amount()
        fee.save()

        return Response(
            {
                "message": "Payment processed successfully.",
                "fee_id": fee.id,
                "transaction_id": transaction.transaction_id,
                "data": {
                    "status": transaction.status,
                    "date_of_payment": transaction.date_of_payment,
                    "amount_paid": payment_amount,
                    "due_amount": fee.due_amount,
                    "payment_status": fee.status
                }
            },
            status=status.HTTP_200_OK
        )

class ProcessDirectPaymentView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        # Ensure user and institute are valid
        user = get_object_or_404(User, id=user_id)
        institute = get_object_or_404(Institute, id=institute_id)

      # Determine transaction type and set user_type and institute_type
        transaction_type = request.data.get('transaction_type', 'debit')
        if transaction_type == 'debit':
            user_type = 'credit'
            institute_type = 'debit'
        elif transaction_type == 'credit':
            user_type = 'debit'
            institute_type = 'credit'
        else:
            return Response(
                {"message": "Invalid transaction type."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a direct transaction without a scheduled fee



        transaction = InstituteTransaction.objects.create(
            fee=None,  # No associated fee for direct payments
            user=user,
            institute=institute,
            transaction_id=str(uuid.uuid4()),  # Generate a unique transaction ID
            method=request.data.get('method', 'bank_transfer'),  # Default payment method
            status=request.data.get('status', 'completed'),  # Mark as completed
            date_of_payment=timezone.now(),
            user_type=user_type,  # User type based on transaction type
            institute_type=institute_type  # Institute type based on transaction type
        )

        return Response(
            {
                "message": "Direct payment processed successfully.",
                "transaction_id": transaction.transaction_id,
                "data": {
                    "method": transaction.method,
                    "status": transaction.status,
                    "date_of_payment": transaction.date_of_payment
                }
            },
            status=status.HTTP_200_OK
        )

class DeleteFeeView(APIView):
    def delete(self, request, institute_id, fee_id, user_id, format=None):
        # Check if the user is a member of the institute
        print ("deleting payment: ", institute_id, fee_id, user_id)
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id
        ).exists():
            raise PermissionDenied("You must be a member of the institute to delete this fee.")

        # Retrieve the fee to delete
        fee = get_object_or_404(InstituteFee, id=fee_id)

        # Check if the user is authorized to delete this fee
        if fee.user.id != user_id or fee.institute.id != institute_id:
            raise PermissionDenied("You are not authorized to delete this fee.")

        # Get all transactions associated with the fee
        transactions = InstituteTransaction.objects.filter(fee=fee)

        # Delete associated transactions (if any)
        for transaction in transactions:
            transaction.delete()

        # Delete the fee
        fee.delete()

        return Response(
            {
                "message": "Fee and associated transactions deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT  # Indicate successful deletion
        )
    
class DeleteTransactionView(APIView):
    def delete(self, request, institute_id, transaction_id, user_id, format=None):
        # # Check if the user is a member of the institute
        # if not InstituteMembership.objects.filter(
        #     user_id=user_id,
        #     institute_id=institute_id
        # ).exists():
        #     raise PermissionDenied("You must be a member of the institute to delete this transaction.")

        # Retrieve the transaction to delete
        transaction = get_object_or_404(InstituteTransaction, id=transaction_id)

        # Check if the user is authorized to delete this transaction
        if transaction.user.id != user_id or transaction.institute.id != institute_id:
            raise PermissionDenied("You are not authorized to delete this transaction.")

        # Delete the transaction
        transaction.delete()

        return Response(
            {
                "message": "Transaction deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT  # Successful deletion
        )

class InstituteTransactionListView(generics.ListAPIView):
    serializer_class = InstituteTransactionSerializer

    def get_queryset(self):
        fee_id = self.request.query_params.get('fee_id', None)
        if fee_id is not None:
            return InstituteTransaction.objects.filter(fee_id=fee_id)
        return InstituteTransaction.objects.all()
    
class ArchiveCourseView(APIView):
    def delete(self, request, institute_id, course_id, user_id, format=None):
        # Ensure the user is a member of the institute associated with the course
        course = get_object_or_404(Course, id=course_id)
        
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id= institute_id,
            user_type__name__in=["Owner", "Admin", "Teacher"]
        ).exists():
            raise PermissionDenied("You must be a member of the institute to archive this course.")

        # # Check if the user is authorized to archive the course
        # if not (request.user.is_staff or course.creater.id == user_id):
        #     raise PermissionDenied("You are not authorized to archive this course.")

        # Archive the course
        course.archive()  # Call the archive method that sets the archived flag and saves the model
        
        return Response(
            {
                "message": "Course archived successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )

class UnarchiveCourseView(APIView):
    def put(self, request, institute_id, course_id, user_id, format=None):
        # Ensure the user is a member of the institute associated with the course
        course = get_object_or_404(Course, id=course_id)
        
        if not InstituteMembership.objects.filter(
            user_id=user_id,
            institute_id=institute_id,
            user_type__name__in=["Owner", "Admin", "Teacher"]
        ).exists():
            raise PermissionDenied("You must be a member of the institute to unarchive this course.")

        # # Check if the user is authorized to unarchive the course
        # if not (request.user.is_staff or course.creater.id == user_id):
        #     raise PermissionDenied("You are not authorized to unarchive this course.")

        # Unarchive the course
        course.archived = False
        course.archive_date = None  # Optionally clear the archive date
        course.save()
        
        return Response(
            {
                "message": "Course unarchived successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )

class CourseListView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        """
        This view returns a list of all the courses that are
        filtered by institute_id and archived status, both of which are optional.
        """
        queryset = Course.objects.all()
        institute_id = self.request.query_params.get('institute_id')
        archived = self.request.query_params.get('archived')

        if institute_id is not None:
            # Filter courses that are associated with a specific institute
            queryset = queryset.filter(institutes__id=institute_id)
        
        if archived is not None:
            archived = archived.lower() in ['true', '1', 't']
            queryset = queryset.filter(archived=archived)

        return queryset

class SummaryView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, user_id, institute_id, format=None):
        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Fetch the institute with the given institute_id
        try:
            institute = Institute.objects.get(id=institute_id)
        except Institute.DoesNotExist:
            return Response(
                {"error": "Institute not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Get date filters from request parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Prepare date filter arguments
        date_filter_args = {}
        if start_date:
            date_filter_args['date_of_schedule__gte'] = parse_datetime(start_date)
        if end_date:
            date_filter_args['date_of_schedule__lte'] = parse_datetime(end_date)

        # Aggregated data with date filters
        total_debit_scheduled = InstituteFee.objects.filter(
            type_transaction='debit',
            **date_filter_args
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        total_credit_scheduled = InstituteFee.objects.filter(
            type_transaction='credit',
            **date_filter_args
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        total_debited = InstituteTransaction.objects.filter(
            user_type='debit',
            status='completed',
            date_of_payment__gte=date_filter_args.get('date_of_schedule__gte', timezone.now().replace(year=1970)),
            date_of_payment__lte=date_filter_args.get('date_of_schedule__lte', timezone.now())
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        total_credited = InstituteTransaction.objects.filter(
            institute_type='credit',
            status='completed',
            date_of_payment__gte=date_filter_args.get('date_of_schedule__gte', timezone.now().replace(year=1970)),
            date_of_payment__lte=date_filter_args.get('date_of_schedule__lte', timezone.now())
        ).aggregate(total=Sum('amount'))['total'] or 0

        total_debit_due = InstituteFee.objects.filter(
            type_transaction='debit',
            status__in=['unpaid', 'partially_paid'],
            **date_filter_args
        ).aggregate(total=Sum('due_amount'))['total'] or 0
        
        total_credit_due = InstituteFee.objects.filter(
            type_transaction='credit',
            status__in=['unpaid', 'partially_paid'],
            **date_filter_args
        ).aggregate(total=Sum('due_amount'))['total'] or 0

        # Month-wise data
        current_year = timezone.now().year
        current_month = timezone.now().month

        month_wise_summary = []

        for month in range(1, current_month + 1):
            monthly_date_filter_args = date_filter_args.copy()
            monthly_date_filter_args.update({
                'date_of_schedule__year': current_year,
                'date_of_schedule__month': month
            })

            monthly_debit_scheduled = InstituteFee.objects.filter(
                type_transaction='debit',
                **monthly_date_filter_args
            ).aggregate(total=Sum('amount'))['total'] or 0

            monthly_credit_scheduled = InstituteFee.objects.filter(
                type_transaction='credit',
                **monthly_date_filter_args
            ).aggregate(total=Sum('amount'))['total'] or 0

            monthly_debited = InstituteTransaction.objects.filter(
                user_type='debit',
                status='completed',
                date_of_payment__year=current_year,
                date_of_payment__month=month,
                date_of_payment__gte=date_filter_args.get('date_of_schedule__gte', timezone.now().replace(year=1970)),
                date_of_payment__lte=date_filter_args.get('date_of_schedule__lte', timezone.now())
            ).aggregate(total=Sum('amount'))['total'] or 0

            monthly_credited = InstituteTransaction.objects.filter(
                institute_type='credit',
                status='completed',
                date_of_payment__year=current_year,
                date_of_payment__month=month,
                date_of_payment__gte=date_filter_args.get('date_of_schedule__gte', timezone.now().replace(year=1970)),
                date_of_payment__lte=date_filter_args.get('date_of_schedule__lte', timezone.now())
            ).aggregate(total=Sum('amount'))['total'] or 0

            monthly_debit_due = InstituteFee.objects.filter(
                type_transaction='debit',
                status__in=['unpaid', 'partially_paid'],
                **monthly_date_filter_args
            ).aggregate(total=Sum('due_amount'))['total'] or 0

            monthly_credit_due = InstituteFee.objects.filter(
                type_transaction='credit',
                status__in=['unpaid', 'partially_paid'],
                **monthly_date_filter_args
            ).aggregate(total=Sum('due_amount'))['total'] or 0

            month_wise_summary.append({
                'month': month,
                'total_debit_scheduled': monthly_debit_scheduled,
                'total_credit_scheduled': monthly_credit_scheduled,
                'total_debited': monthly_debited,
                'total_credited': monthly_credited,
                'total_debit_due': monthly_debit_due,
                'total_credit_due': monthly_credit_due,
            })

        data = {
            'total_debit_scheduled': total_debit_scheduled,
            'total_credit_scheduled': total_credit_scheduled,
            'total_debited': total_debited,
            'total_credited': total_credited,
            'total_debit_due': total_debit_due,
            'total_credit_due': total_credit_due,
            'month_wise_summary': month_wise_summary
        }

        return Response(data)

from datetime import timedelta

  
class SummaryViewUserWise(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, user_id, format=None):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        start_date_str = request.query_params.get("start_date")
        end_date_str = request.query_params.get("end_date")

        if start_date_str:
            try:
                start_date = parse_datetime(start_date_str)
                if not start_date:
                    raise ValueError
            except (ValueError, TypeError):
                return Response({"start_date": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            start_date = None

        if end_date_str:
            try:
                end_date = parse_datetime(end_date_str)
                if not end_date:
                    raise ValueError
            except (ValueError, TypeError):
                return Response({"end_date": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            end_date = None

        filters = {'user_id': user_id}
        fee_filters = {'user_id': user_id}
        transaction_filters = {'fee__user_id': user_id, 'status': 'completed'}

        if start_date:
            filters['date_of_schedule__gte'] = start_date
            fee_filters['date_of_schedule__gte'] = start_date
            transaction_filters['date_of_payment__gte'] = start_date

        if end_date:
            filters['date_of_schedule__lte'] = end_date
            fee_filters['date_of_schedule__lte'] = end_date
            transaction_filters['date_of_payment__lte'] = end_date

        # print("Filters for InstituteFee:", filters)
        # print("Filters for InstituteTransaction:", transaction_filters)

        total_debit_scheduled = InstituteFee.objects.filter(
            **fee_filters,
            type_transaction='debit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Debit Scheduled:", total_debit_scheduled)

        total_credit_scheduled = InstituteFee.objects.filter(
            **fee_filters,
            type_transaction='credit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Credit Scheduled:", total_credit_scheduled)

        total_debited = InstituteTransaction.objects.filter(
            **transaction_filters,
            transaction_type='debit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Debited:", total_debited)

        total_credited = InstituteTransaction.objects.filter(
            **transaction_filters,
            transaction_type='credit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Credited:", total_credited)

        total_debit_due = InstituteFee.objects.filter(
            **fee_filters,
            type_transaction='debit',
            status__in=['unpaid', 'partially_paid']
        ).aggregate(total=Sum('due_amount'))['total'] or 0

        # print("Total Debit Due:", total_debit_due)

        total_credit_due = InstituteFee.objects.filter(
            **fee_filters,
            type_transaction='credit',
            status__in=['unpaid', 'partially_paid']
        ).aggregate(total=Sum('due_amount'))['total'] or 0

        # print("Total Credit Due:", total_credit_due)

        month_wise_summary = []

        if start_date and end_date:
            current_date = start_date
            while current_date <= end_date:
                monthly_filters = fee_filters.copy()
                monthly_filters.update({
                    'date_of_schedule__year': current_date.year,
                    'date_of_schedule__month': current_date.month
                })
                monthly_transaction_filters = transaction_filters.copy()
                monthly_transaction_filters.update({
                    'date_of_payment__year': current_date.year,
                    'date_of_payment__month': current_date.month
                })

                monthly_debit_scheduled = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='debit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debit Scheduled for {current_date.month}/{current_date.year}:", monthly_debit_scheduled)

                monthly_credit_scheduled = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='credit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credit Scheduled for {current_date.month}/{current_date.year}:", monthly_credit_scheduled)

                monthly_debited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='debit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debited for {current_date.month}/{current_date.year}:", monthly_debited)

                monthly_credited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='credit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credited for {current_date.month}/{current_date.year}:", monthly_credited)

                monthly_debit_due = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='debit',
                    status__in=['unpaid', 'partially_paid']
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Debit Due for {current_date.month}/{current_date.year}:", monthly_debit_due)

                monthly_credit_due = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='credit',
                    status__in=['unpaid', 'partially_paid']
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Credit Due for {current_date.month}/{current_date.year}:", monthly_credit_due)

                month_wise_summary.append({
                    'month': current_date.month,
                    'year': current_date.year,
                    'total_debit_scheduled': monthly_debit_scheduled,
                    'total_credit_scheduled': monthly_credit_scheduled,
                    'total_debited': monthly_debited,
                    'total_credited': monthly_credited,
                    'total_debit_due': monthly_debit_due,
                    'total_credit_due': monthly_credit_due,
                })

                current_date += timedelta(days=32)
                current_date = current_date.replace(day=1)
        else:
            current_year = timezone.now().year
            start_month = 1
            end_month = timezone.now().month

            for month in range(start_month, end_month + 1):
                monthly_filters = fee_filters.copy()
                monthly_filters.update({
                    'date_of_schedule__year': current_year,
                    'date_of_schedule__month': month
                })
                monthly_transaction_filters = transaction_filters.copy()
                monthly_transaction_filters.update({
                    'date_of_payment__year': current_year,
                    'date_of_payment__month': month
                })

                monthly_debit_scheduled = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='debit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debit Scheduled for {month}/{current_year}:", monthly_debit_scheduled)

                monthly_credit_scheduled = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='credit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credit Scheduled for {month}/{current_year}:", monthly_credit_scheduled)

                monthly_debited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='debit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debited for {month}/{current_year}:", monthly_debited)

                monthly_credited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='credit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credited for {month}/{current_year}:", monthly_credited)

                monthly_debit_due = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='debit',
                    status__in=['unpaid', 'partially_paid']
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Debit Due for {month}/{current_year}:", monthly_debit_due)

                monthly_credit_due = InstituteFee.objects.filter(
                    **monthly_filters,
                    type_transaction='credit',
                    status__in=['unpaid', 'partially_paid']
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Credit Due for {month}/{current_year}:", monthly_credit_due)

                month_wise_summary.append({
                    'month': month,
                    'total_debit_scheduled': monthly_debit_scheduled,
                    'total_credit_scheduled': monthly_credit_scheduled,
                    'total_debited': monthly_debited,
                    'total_credited': monthly_credited,
                    'total_debit_due': monthly_debit_due,
                    'total_credit_due': monthly_credit_due,
                })

        data = {
            'total_debit_scheduled': total_debit_scheduled,
            'total_credit_scheduled': total_credit_scheduled,
            'total_debited': total_debited,
            'total_credited': total_credited,
            'total_debit_due': total_debit_due,
            'total_credit_due': total_credit_due,
            'month_wise_summary': month_wise_summary
        }

        # print("Final Data:", data)

        return Response(data)

class SummaryViewInstituteWise(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, institute_id, format=None):
        try:
            institute = Institute.objects.get(id=institute_id)
        except Institute.DoesNotExist:
            return Response(
                {"error": "Institute not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        start_date_str = request.query_params.get("start_date")
        end_date_str = request.query_params.get("end_date")
        user_id = request.query_params.get("user_id")

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        if start_date_str and not start_date:
            return Response({"start_date": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)
        if end_date_str and not end_date:
            return Response({"end_date": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response(
                    {"error": "User not found with the provided ID."},
                    status=status.HTTP_404_NOT_FOUND
                )

        filters = {'institute_id': institute_id}
        fee_filters = {'institute_id': institute_id}
        transaction_filters = {'fee__institute_id': institute_id, 'status': 'completed'}

        if user_id:
            filters['user_id'] = user_id
            fee_filters['user_id'] = user_id
            transaction_filters['fee__user_id'] = user_id

        if start_date:
            filters['date_of_schedule__gte'] = start_date
            fee_filters['date_of_schedule__gte'] = start_date
            transaction_filters['date_of_payment__gte'] = start_date

        if end_date:
            filters['date_of_schedule__lte'] = end_date
            fee_filters['date_of_schedule__lte'] = end_date
            transaction_filters['date_of_payment__lte'] = end_date

        # print("Filters for InstituteFee:", filters)
        # print("Filters for InstituteTransaction:", transaction_filters)

        total_debit_scheduled = InstituteFee.objects.filter(
            type_transaction='debit',
            **fee_filters
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Debit Scheduled:", total_debit_scheduled)

        total_credit_scheduled = InstituteFee.objects.filter(
            type_transaction='credit',
            **fee_filters
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Credit Scheduled:", total_credit_scheduled)

        total_debited = InstituteTransaction.objects.filter(
            **transaction_filters,
            transaction_type='debit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Debited:", total_debited)

        total_credited = InstituteTransaction.objects.filter(
            **transaction_filters,
            transaction_type='credit'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # print("Total Credited:", total_credited)

        total_debit_due = InstituteFee.objects.filter(
            type_transaction='debit',
            status__in=['unpaid', 'partially_paid'],
            **fee_filters
        ).aggregate(total=Sum('due_amount'))['total'] or 0

        # print("Total Debit Due:", total_debit_due)

        total_credit_due = InstituteFee.objects.filter(
            type_transaction='credit',
            status__in=['unpaid', 'partially_paid'],
            **fee_filters
        ).aggregate(total=Sum('due_amount'))['total'] or 0

        # print("Total Credit Due:", total_credit_due)

        month_wise_summary = []

        if start_date and end_date:
            start_year = start_date.year
            start_month = start_date.month
            end_year = end_date.year
            end_month = end_date.month if end_year == start_year else 12
        else:
            current_year = timezone.now().year
            start_year = current_year
            end_year = current_year
            start_month = 1
            end_month = timezone.now().month

        for year in range(start_year, end_year + 1):
            for month in range(start_month, end_month + 1):
                monthly_filters = fee_filters.copy()
                monthly_filters.update({
                    'date_of_schedule__year': year,
                    'date_of_schedule__month': month
                })
                monthly_transaction_filters = transaction_filters.copy()
                monthly_transaction_filters.update({
                    'date_of_payment__year': year,
                    'date_of_payment__month': month
                })

                monthly_scheduled_filters = monthly_filters.copy()
                if 'status' in monthly_scheduled_filters:
                    del monthly_scheduled_filters['status']

                monthly_debit_scheduled = InstituteFee.objects.filter(
                    type_transaction='debit',
                    **monthly_scheduled_filters
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debit Scheduled for {month}/{year}:", monthly_debit_scheduled)

                monthly_credit_scheduled = InstituteFee.objects.filter(
                    type_transaction='credit',
                    **monthly_scheduled_filters
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credit Scheduled for {month}/{year}:", monthly_credit_scheduled)

                monthly_debited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='debit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Debited for {month}/{year}:", monthly_debited)

                monthly_credited = InstituteTransaction.objects.filter(
                    **monthly_transaction_filters,
                    transaction_type='credit'
                ).aggregate(total=Sum('amount'))['total'] or 0

                # print(f"Monthly Credited for {month}/{year}:", monthly_credited)

                monthly_debit_due = InstituteFee.objects.filter(
                    type_transaction='debit',
                    status__in=['unpaid', 'partially_paid'],
                    **monthly_filters
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Debit Due for {month}/{year}:", monthly_debit_due)

                monthly_credit_due = InstituteFee.objects.filter(
                    type_transaction='credit',
                    status__in=['unpaid', 'partially_paid'],
                    **monthly_filters
                ).aggregate(total=Sum('due_amount'))['total'] or 0

                # print(f"Monthly Credit Due for {month}/{year}:", monthly_credit_due)

                month_wise_summary.append({
                    'year': year,
                    'month': month,
                    'total_debit_scheduled': monthly_debit_scheduled,
                    'total_credit_scheduled': monthly_credit_scheduled,
                    'total_debited': monthly_debited,
                    'total_credited': monthly_credited,
                    'total_debit_due': monthly_debit_due,
                    'total_credit_due': monthly_credit_due,
                })

        user_info = None
        if user:
            user_info = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.firstname,
                'last_name': user.lastname,
            }

        data = {
            'institute': {
                'id': institute.id,
                'name': institute.name,
            },
            'user': user_info,
            'total_debit_scheduled': total_debit_scheduled,
            'total_credit_scheduled': total_credit_scheduled,
            'total_debited': total_debited,
            'total_credited': total_credited,
            'total_debit_due': total_debit_due,
            'total_credit_due': total_credit_due,
            'month_wise_summary': month_wise_summary
        }

        # print("Final Data:", data)

        return Response(data)
    
class InstituteBankDetailsCreateView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        # Get the institute and user
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the user is an owner or admin of the institute
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin","Teacher","Student","Staff"]  # or whatever field represents role
        ).exists():
            raise PermissionDenied("Only the owner or admin can add bank details to this institute.")

        # Create bank details after passing permission check
        serializer = InstituteBankDetailsSerializer(data=request.data)

        if serializer.is_valid():
            bank_details = serializer.save()

            # Ensure there is an InstituteMembership entry
            membership, created = InstituteMembership.objects.get_or_create(
                user=user,
                institute=institute,
                defaults={'user_type': None}  # or set a default user_type if required
            )

            # Link the bank details to the membership
            membership.bank_details.add(bank_details)

            # Add the bank details to the institute (if the Institute model has a many-to-many relationship with bank details)
            institute.bank_details.add(bank_details)

            return Response({
                'message': 'Bank details created successfully',
                'bank_details': InstituteBankDetailsSerializer(bank_details).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InstituteBankDetailsUpdateView(APIView):
    def put(self, request, institute_id, user_id, bank_details_id, format=None):
        # Get the institute, user, and bank details
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        bank_details = get_object_or_404(InstituteBankDetails, pk=bank_details_id)

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin","Teacher","Student","Staff"]  # or whatever field represents role
        ).exists():
            raise PermissionDenied("Only the owner or admin can update bank details for this institute.")

        # Update bank details after passing permission check
        serializer = InstituteBankDetailsSerializer(bank_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Bank details updated successfully',
                'bank_details': serializer.data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InstituteBankDetailsDeleteView(APIView):
    def delete(self, request, institute_id, user_id, bank_details_id, format=None):
        # Get the institute, user, and bank details
        institute = get_object_or_404(Institute, pk=institute_id)
        user = get_object_or_404(User, pk=user_id)
        bank_details = get_object_or_404(InstituteBankDetails, pk=bank_details_id)

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]  # or whatever field represents role
        ).exists():
            raise PermissionDenied("Only the owner or admin can delete bank details for this institute.")

        try:
            with transaction.atomic():
                institute.bank_details.remove(bank_details)

                # If the bank details are not associated with any other institute, delete it
                if not bank_details.institutes.exists():
                    bank_details.delete()

        except Exception as e:
            print(f"Error occurred: {e}")
            return Response({
                'message': 'An error occurred while deleting bank details'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        print("Returning response after deletion")
        return Response({
            'message': 'Bank details deleted successfully'
        }, status=status.HTTP_200_OK)
    
class InstituteBankDetailsListView(APIView):
    def get(self, request, format=None):
        institute_id = request.query_params.get('institute_id')
        user_id = request.query_params.get('user_id')
        bank_id = request.query_params.get('bank_id')
        
        bank_details = InstituteBankDetails.objects.all()
        
        if institute_id:
            bank_details = bank_details.filter(institutes__id=institute_id)
        if user_id:
            bank_details = bank_details.filter(memberships__user__id=user_id)
        if bank_id:
            bank_details = bank_details.filter(id=bank_id)

        
        serializer = InstituteBankDetailsSerializer(bank_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MemberInstituteDetailsAPIView(generics.GenericAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = InstituteMembershipProfileSerializer

    def get(self, request, member_id, institute_id):
        try:
            membership = InstituteMembership.objects.get(user_id=member_id, institute_id=institute_id)
        except InstituteMembership.DoesNotExist:
            return Response({"error": "Membership not found"}, status=404)

        attendances = Attendance.objects.filter(member_id=member_id, institute_id=institute_id)
        courses = Course.objects.filter(institutes__id=institute_id, institutes__people__id=member_id)
        academic_details = AcademicDetail.objects.filter(user_id=member_id)
        experiences = Experience.objects.filter(user_id=member_id)
        publications = Publication.objects.filter(user_id=member_id)
        licenses = LicenseOrCertificate.objects.filter(user_id=member_id)
        parent_details = ParentDetails.objects.filter(account_id=member_id)

        data = {
            "user": UserProfileSerializer(membership.user).data,
            "institute": InstituteProfileSerializer(membership.institute).data,
            "user_type": membership.user_type.name if membership.user_type else None,
            "datejoined": membership.datejoined,
            "status": membership.status,
            "attendance_records": AttendanceProfileSerializer(attendances, many=True).data,
            "courses": CourseProfileSerializer(courses, many=True).data,
            "academic_details": AcademicDetailProfileSerializer(academic_details, many=True).data,
            "experiences": ExperienceProfileSerializer(experiences, many=True).data,
            "publications": PublicationProfileSerializer(publications, many=True).data,
            "licenses_certificates": LicenseOrCertificateProfileSerializer(licenses, many=True).data,
            "parent_details": ParentDetailsProfileSerializer(parent_details, many=True).data,
        }

        return Response(data)
    

class DocumentCreateView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to add document to institute {institute_id} by user {user_id}")

        try:
            institute = get_object_or_404(Institute, pk=institute_id)
            user = get_object_or_404(User, pk=user_id)

            # Ensure the user is part of the institute
            user_membership = get_object_or_404(InstituteMembership, user=user, institute=institute)
            logger.debug(f"user_membership: {user_membership}")

            # Prepare data for InstituteMemberDocumentSerializer
            document_data = {
                'name': request.data.get('name'),
                'docfile': request.FILES.get('docfile')
            }
            request_data = {
                'user_id': user.id,
                'institute_id': institute.id,
                'document': document_data
            }

            serializer = InstituteMemberDocumentSerializer(data=request_data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Document added successfully',
                    'document': serializer.data
                }, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error adding document: {e}")
            return Response({'detail': 'An error occurred while adding the document'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DocumentUpdateView(APIView):
    def put(self, request, document_id, format=None):
        logger.debug(f"PUT request to update document with pk {document_id}")

        try:
            try:

                # Fetch the Document instance by document_id
                document = get_object_or_404(Document, pk=document_id)
                logger.debug(f"Fetched document: {document}")

                # Fetch the related InstituteMemberDocument instance
                instance = get_object_or_404(InstituteMemberDocument, document=document)
                logger.debug(f"Fetched InstituteMemberDocument: {instance}")
            except InstituteMemberDocument.DoesNotExist:
                logger.error(f"No InstituteMemberDocument matches the given ID: {document_id}")
                return Response({'detail': 'InstituteMemberDocument not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Ensure the user is part of the institute
            user_membership = get_object_or_404(InstituteMembership, user=instance.user, institute=instance.institute)
            logger.debug(f"user_membership: {user_membership}")

            document_data = {
                'id': request.data.get('document_id'),  # Include the document ID if provided
                'name': request.data.get('name'),
                'docfile': request.FILES.get('docfile')
            }
            request_data = {
                'user_id': instance.user.id,
                'institute_id': instance.institute.id,
                'document': document_data
            }

            serializer = InstituteMemberDocumentSerializer(instance, data=request_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Document updated successfully',
                    'document': serializer.data
                }, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error updating document: {e}")
            return Response({'detail': 'An error occurred while updating the document'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DocumentGetView(APIView):
    def get(self, request, format=None):
        logger.debug(f"GET request to fetch all InstituteMemberDocuments")

        try:
            # Fetch query parameters
            institute_id = request.query_params.get('institute_id')
            user_id = request.query_params.get('user_id')
            document_id = request.query_params.get('document_id')

            # Filter based on query parameters
            documents = InstituteMemberDocument.objects.all()
            if institute_id:
                documents = documents.filter(institute_id=institute_id)
            if user_id:
                documents = documents.filter(user_id=user_id)
            if document_id:
                documents = documents.filter(document_id=document_id)

            # Paginate the filtered queryset
            paginator = StandardResultsPagination()
            paginated_documents = paginator.paginate_queryset(documents, request)
            serializer = InstituteMemberDocumentSerializer(paginated_documents, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            logger.error(f"Error fetching documents: {e}")
            return Response({'detail': 'An error occurred while fetching documents'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DocumentDeleteView(APIView):
    def delete(self, request, document_id, format=None):
        logger.debug(f"DELETE request to delete document with document_id {document_id}")

        try:
            # Fetch the Document instance by document_id
            document = get_object_or_404(Document, pk=document_id)
            logger.debug(f"Fetched document: {document}")

            # Fetch the related InstituteMemberDocument instance
            instance = get_object_or_404(InstituteMemberDocument, document=document)
            logger.debug(f"Fetched InstituteMemberDocument: {instance}")

            # Delete the instance
            instance.delete()
            document.delete()
            logger.debug(f"Deleted document and associated InstituteMemberDocument: {document_id}")

            return Response({
                'message': 'Document and associated InstituteMemberDocument deleted successfully'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error deleting document: {e}")
            return Response({'detail': 'An error occurred while deleting the document'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadStudents(APIView):
    def post(self, request, instId, userId):
        # Get the institute and validate it
        institute = get_object_or_404(Institute, pk=instId)

        # Validate the operator user
        operator = get_object_or_404(User, pk=userId)
        if not InstituteMembership.objects.filter(
            user=operator,
            user_type__name__in=["Owner", "Admin"],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to add members.")

        # Process the uploaded file
        file = request.FILES['file']
        reader = csv.DictReader(file.read().decode('utf-8').splitlines())
        added_members = []
        errors = []

        for row in reader:
            email = row.get('email')
            phone = row.get('phone')
            first_name = row.get('first_name')
            last_name = row.get('last_name')
            user_type_name = row.get('user_type')  # Get user_type from CSV

            if not phone:
                errors.append("A row is missing with phone.")
                continue

            if not user_type_name:
                errors.append(f"A row is missing user_type for email {email} or phone {phone}.")
                continue

            try:
                user_type = InstitueMemberTypes.objects.get(name=user_type_name)
            except InstitueMemberTypes.DoesNotExist:
                errors.append(f"User type '{user_type_name}' does not exist.")
                continue

            account = None
            created = False
            if email and phone:
                account, created = Account.objects.get_or_create(
                    email=email,
                    phoneno=phone,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )
            elif phone:
                account, created = Account.objects.get_or_create(
                    phoneno=phone,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )

            if InstituteMembership.objects.filter(user=account, institute=institute).exists():
                # Skip if the user is already part of the institute
                continue

            InstituteMembership.objects.create(user=account, institute=institute, user_type=user_type)
            added_members.append({
                'email': email,
                'phone': phone,
                'first_name': first_name,
                'last_name': last_name,
                'user_type': user_type_name,
                'status': 'Added' if created else 'Already existed in the system, added to institute'
            })

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Students processed successfully',
            'added_members': added_members
        }, status=status.HTTP_200_OK)


class UploadStudentsToCourse(APIView):
    def post(self, request, instId, courseId, userId):
        # Get the institute and validate it
        institute = get_object_or_404(Institute, pk=instId)

        # Get the course and validate it
        course = get_object_or_404(Course, pk=courseId)

        # Validate the operator user
        operator = get_object_or_404(Account, pk=userId)
        if not InstituteMembership.objects.filter(
            user=operator,
            user_type__name__in=["Owner", "Admin"],
            institute=institute
        ).exists():
            raise PermissionDenied("You do not have permission to add members.")

        # Process the uploaded file
        file = request.FILES['file']
        reader = csv.DictReader(file.read().decode('utf-8').splitlines())
        added_members = []
        errors = []

        for row in reader:
            email = row.get('email')
            phone = row.get('phone')
            first_name = row.get('first_name')
            last_name = row.get('last_name')

            if not email and not phone:
                errors.append("A row is missing both email and phone.")
                continue

            account = None
            created = False
            if email:
                account, created = Account.objects.get_or_create(
                    email=email,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )
            elif phone:
                account, created = Account.objects.get_or_create(
                    phoneno=phone,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )

            if not InstituteMembership.objects.filter(user=account, institute=institute).exists():
                InstituteMembership.objects.create(user=account, institute=institute)

            if not course.enrolled_students.filter(pk=account.pk).exists():
                course.enrolled_students.add(account)
                added_members.append({
                    'email': email,
                    'phone': phone,
                    'first_name': first_name,
                    'last_name': last_name,
                    'status': 'Added' if created else 'Already existed in the system, added to institute and course'
                })
            else:
                errors.append(f"User {email or phone} is already enrolled in the course.")

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Students processed successfully',
            'added_members': added_members
        }, status=status.HTTP_200_OK)

class UploadBatchMembers(APIView):
    def post(self, request, batchId, userId):
        # Get the batch and validate it
        batch = get_object_or_404(Batch, pk=batchId)

        # Validate the operator user
        operator = get_object_or_404(User, pk=userId)

        # Check if the operator has permission to add members to the batch
        memberships = InstituteMembership.objects.filter(
            user=operator,
            user_type__name__in=["Owner", "Admin"],
            institute=batch.institute
        )

        if not memberships.exists():
            raise PermissionDenied("You do not have permission to add members to this batch.")

        # Process the uploaded file
        file = request.FILES['file']
        reader = csv.DictReader(file.read().decode('utf-8').splitlines())
        added_members = []
        errors = []

        for row in reader:
            email = row.get('email')
            phone = row.get('phone')
            first_name = row.get('first_name')
            last_name = row.get('last_name')
            user_type_name = row.get('user_type')  # Get user_type from CSV

            if not phone:
                errors.append("A row is missing both email and phone.")
                continue

            if not user_type_name:
                errors.append(f"A row is missing user_type for email {email} or phone {phone}.")
                continue

            try:
                user_type = InstitueMemberTypes.objects.get(name=user_type_name)
            except InstitueMemberTypes.DoesNotExist:
                errors.append(f"User type '{user_type_name}' does not exist.")
                continue

            account = None
            created = False
            if email and phone:
                account, created = Account.objects.get_or_create(
                    email=email,
                    phoneno=phone,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )
            elif phone:
                account, created = Account.objects.get_or_create(
                    phoneno=phone,
                    defaults={'firstname': first_name, 'lastname': last_name}
                )

            # Check if the user is already part of the batch
            if batch.users.filter(id=account.id).exists():
                continue

            # Check if the user is part of the institute
            membership, membership_created = InstituteMembership.objects.get_or_create(
                user=account, institute=batch.institute,
                defaults={'user_type': user_type}
            )

            if not membership_created and membership.user_type != user_type:
                membership.user_type = user_type
                membership.save()

            # Add the user to the batch
            batch.users.add(account)
            added_members.append({
                'email': email,
                'phone': phone,
                'first_name': first_name,
                'last_name': last_name,
                'user_type': user_type_name,
                'status': 'Added' if created else 'Already existed in the system, added to batch'
            })

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Batch members processed successfully',
            'added_members': added_members
        }, status=status.HTTP_200_OK)

    
class CreateBatchView(generics.CreateAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        created_by = self.request.user
        if 'created_by' in self.request.data:
            created_by = get_object_or_404(User, pk=self.request.data['created_by'])
        
        institute = serializer.validated_data.get('institute')
        
        if not InstituteMembership.objects.filter(
            user=created_by,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to create a batch for this institute.")
        
        serializer.save(created_by=created_by)


class EditBatchView(generics.UpdateAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        batch = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to edit this batch.")

        return batch

class DeleteBatchView(generics.DestroyAPIView):
    queryset = Batch.objects.all()
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        batch = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to delete this batch.")

        return batch

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Batch deleted successfully"}, status=200)

class ListBatchView(generics.ListAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        institute_id = self.request.query_params.get('institute_id')
        created_by = self.request.query_params.get('created_by')
        batch_id = self.request.query_params.get('id')

        if institute_id:
            queryset = queryset.filter(institute__id=institute_id)
        if created_by:
            queryset = queryset.filter(created_by__id=created_by)
        if batch_id:
            queryset = queryset.filter(id=batch_id)

        return queryset
   



class ListBatchTimeTableView(generics.ListAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchWithTimeTableSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        institute_id = self.request.query_params.get('institute_id')
        created_by = self.request.query_params.get('created_by')
        batch_id = self.request.query_params.get('id')

        if institute_id:
            queryset = queryset.filter(institute__id=institute_id)
        if created_by:
            queryset = queryset.filter(created_by__id=created_by)
        if batch_id:
            queryset = queryset.filter(id=batch_id)

        return queryset

class LinkCourseToBatchView(generics.UpdateAPIView):
    queryset = Batch.objects.all()
    serializer_class = LinkCourseToBatchSerializer

    def get_object(self):
        batch = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        if not InstituteMembership.objects.filter(user=user, institute=institute, user_type__name__in=["Owner", "Admin"]).exists():
            print("Permission denied for user", user_id)
            raise PermissionDenied("You do not have permission to link courses to this batch.")

        return batch

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        linked_courses = []

        for course in serializer.validated_data['courses']:
            # Check if course is already linked to another batch or institute
            if course.linked_batch and course.linked_batch != instance:
                return Response({'detail': f'Course {course.id} is already linked to another batch.'}, status=status.HTTP_400_BAD_REQUEST)
            if course.linked_institute and course.linked_institute != instance.institute:
                return Response({'detail': f'Course {course.id} is already linked to another institute.'}, status=status.HTTP_400_BAD_REQUEST)
            if course.batches.filter(id=instance.id).exists():
                return Response({'detail': f'Course {course.id} is already linked to this batch.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Link the course to the batch if not already linked
            if not course.batches.filter(id=instance.id).exists():
                instance.courses.add(course)
                course.linked_batch = instance
                course.linked_institute = instance.institute
                print(f"Course {course.id} linked to batch {instance.id}")
            
                # Also link the course to the institute
                if not course.institutes.filter(id=instance.institute.id).exists():
                    instance.institute.courses.add(course)
                    logger.info(f"Course {course.id} linked to institute {instance.institute.id}")
                
                course.save()
                print(f"Course {course.id} linked to batch {instance.id}")
                linked_courses.append(course.id)

        added_members = self.link_members_to_batch(instance, serializer.validated_data['courses'])

        # Response data
        response_data = serializer.data
        response_data['courses'] = linked_courses
        response_data['added_members'] = added_members
        
        return Response(response_data, status=status.HTTP_200_OK)

    def link_members_to_batch(self, batch, courses):
        institute = batch.institute
        added_members = []

        # Add batch users to courses
        for user in batch.users.all():
            for course in courses:
                if not course.enrolled_students.filter(pk=user.pk).exists():
                    course.enrolled_students.add(user)
                    LinkedCourseMembers.objects.create(course=course, institute=institute, batch=batch, member=user)
                    added_members.append(user.firstname)

        # Add teachers and creators of courses to batch
        for course in courses:
            for teacher in course.teachers.all():
                if not batch.users.filter(pk=teacher.pk).exists():
                    batch.users.add(teacher)
                    LinkedCourseMembers.objects.create(course=course, institute=institute, batch=batch, member=teacher)
                    added_members.append(teacher.firstname)
            if course.creater and not batch.users.filter(pk=course.creater.pk).exists():
                batch.users.add(course.creater)
                LinkedCourseMembers.objects.create(course=course, institute=institute, batch=batch, member=course.creater)
                added_members.append(course.creater.firstname)

        # Link enrolled students and teachers of courses to the institute and batch
        for course in courses:
            for member in course.enrolled_students.all():
                if not InstituteMembership.objects.filter(user=member, institute=institute).exists():
                    InstituteMembership.objects.create(user=member, institute=institute, status='active')
                if course not in member.dashboard_courses.all():
                    member.dashboard_courses.add(course)
                if not batch.users.filter(pk=member.pk).exists():
                    batch.users.add(member)
                    LinkedCourseMembers.objects.create(course=course, institute=institute, batch=batch, member=member)
                    added_members.append(member.firstname)

            for teacher in course.teachers.all():
                if not InstituteMembership.objects.filter(user=teacher, institute=institute).exists():
                    InstituteMembership.objects.create(user=teacher, institute=institute, status='active')
                if course not in teacher.dashboard_courses.all():
                    teacher.dashboard_courses.add(course)
                if not batch.users.filter(pk=teacher.pk).exists():
                    batch.users.add(teacher)
                    LinkedCourseMembers.objects.create(course=course, institute=institute, batch=batch, member=teacher)
                    added_members.append(teacher.firstname)

            # Ensure all institute members have the course added to their dashboard
            for member in institute.people.all():
                if course not in member.dashboard_courses.all():
                    member.dashboard_courses.add(course)

        return added_members







class DelinkCourseFromBatchView(generics.UpdateAPIView):
    queryset = Batch.objects.all()
    serializer_class = DelinkCourseFromBatchSerializer

    def get_object(self):
        batch = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            print("Permission denied for user", user_id)
            raise PermissionDenied("You do not have permission to delink courses from this batch.")

        return batch

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        courses_to_remove = request.data.get('courses', [])

        removed_courses = []
        removed_members = []
        for course_id in courses_to_remove:
            course = get_object_or_404(Course, pk=course_id)
            if course.linked_batch == instance:
                course.linked_batch = None
                course.linked_institute = None
                course.save()
                instance.courses.remove(course)
                removed_members += self.remove_course_from_batch(instance, course)
                removed_courses.append(course_id)
            elif instance.courses.filter(pk=course_id).exists():
                instance.courses.remove(course)
                removed_members += self.remove_course_from_batch(instance, course)
                removed_courses.append(course_id)



        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['removed_members'] = removed_members
        response_data['removed_courses'] = removed_courses  # Include removed courses in response

        return Response(response_data, status=status.HTTP_200_OK)

    def remove_course_from_batch(self, batch, course):
        removed_members = []
        institute = batch.institute

        linked_members = LinkedCourseMembers.objects.filter(course=course, batch=batch)
        processed_users = set()  # To track already processed users

        for linked_member in linked_members:
            user = linked_member.member
            if user.pk not in processed_users:
                linked_member.delete()
                if batch.users.filter(pk=user.pk).exists():
                    batch.users.remove(user)
                    removed_members.append(user.firstname)
                if course.enrolled_students.filter(pk=user.pk).exists():
                    course.enrolled_students.remove(user)
                processed_users.add(user.pk)

        for user in course.enrolled_students.all():
            if user.pk not in processed_users and user.batches.filter(pk=batch.pk).exists():
                batch.users.remove(user)
                removed_members.append(user.firstname)
                processed_users.add(user.pk)

        for teacher in course.teachers.all():
            if teacher.pk not in processed_users and teacher.batches.filter(pk=batch.pk).exists():
                batch.users.remove(teacher)
                removed_members.append(teacher.firstname)
                processed_users.add(teacher.pk)

        if course.creater and course.creater.pk not in processed_users and course.creater.batches.filter(pk=batch.pk).exists():
            batch.users.remove(course.creater)
            removed_members.append(course.creater.firstname)
            processed_users.add(course.creater.pk)

        return removed_members

class AddMembersToBatchView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        # Check if the user has permission to add members to the batch
        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to add members to this batch.")

        members = request.data.get('members', [])
        added_members = self.add_members_to_batch(batch, members)

        return Response({'added_members': added_members}, status=status.HTTP_200_OK)

    def add_members_to_batch(self, batch, members):
        institute = batch.institute
        student_type = InstitueMemberTypes.objects.get(name='Student')
        added_members = []

        for member_id in members:
            member = get_object_or_404(User, pk=member_id)

            # Add or update institute membership as a student
            membership, created = InstituteMembership.objects.get_or_create(
                user=member,
                institute=institute,
                defaults={'user_type': student_type, 'status': 'active'}
            )
            if created:
                print(f"Created new membership for user {member.username} in institute {institute.name}")
            else:
                print(f"Found existing membership for user {member.username} in institute {institute.name}")

            if not created and membership.user_type != student_type:
                membership.user_type = student_type
                membership.status = 'active'
                membership.save()

            # Add the member to the batch users
            batch.users.add(member)
            added_members.append(member.username)

            # Add the member to the enrolled students of the courses in the batch
            for course in batch.courses.all():
                course.enrolled_students.add(member)

            # Create an attendance record for the member
            Attendance.objects.create(
                institute=institute,
                member=member,
                attendance_date=timezone.now(),  # Or any specific date you want
                status='na'  # Default status or as required
            )
        return added_members

    
class RemoveMembersFromBatchView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        institute = batch.institute

        if not InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise PermissionDenied("You do not have permission to remove members from this batch.")

        members = request.data.get('members', [])
        removed_members = self.remove_members_from_batch(batch, members)

        return Response({'removed_members': removed_members}, status=status.HTTP_200_OK)

    def remove_members_from_batch(self, batch, members):
        removed_members = []
        for member_id in members:
            member = get_object_or_404(User, pk=member_id)
            if member in batch.users.all():
                # Remove the member from the batch users
                batch.users.remove(member)

                # Remove the member from the enrolled students of the courses in the batch
                for course in batch.courses.all():
                    course.enrolled_students.remove(member)

                removed_members.append(member.username)
        return removed_members


class BatchMemberListView(generics.ListAPIView):
    serializer_class = UserSerializerBatch
    # permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsPagination

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        user_id = self.request.query_params.get('user_id')

        # Prefetch the institute membership data
        institute_memberships = InstituteMembership.objects.filter(institute=batch.institute)
        queryset = batch.users.prefetch_related(
            Prefetch('institutemembership_set', queryset=institute_memberships, to_attr='membership')
        )

        if user_id:
            queryset = queryset.filter(id=user_id)

        return queryset
    
    
class AddGradeView(generics.CreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = BatchGradeSerializer

    def perform_create(self, serializer):
        added_by_id = self.kwargs.get('user_id')
        grades_data = self.request.data.get('grades', [])

        if not grades_data:
            raise ValidationError("Grades data must be provided.")

        added_by = get_object_or_404(User, pk=added_by_id)

        created_grades = []

        for grade_data in grades_data:
            batch_id = grade_data.get('batch_id')
            course_id = grade_data.get('course_id')
            student_id = grade_data.get('student_id')
            exam_id = grade_data.get('exam_id')
            sub_exam_id = grade_data.get('sub_exam_id')
            grade_value = grade_data.get('grade')
            comments = grade_data.get('comments', '')
            marks_obtained = grade_data.get('marks_obtained', None)

            batch = get_object_or_404(Batch, pk=batch_id) if batch_id else None
            course = get_object_or_404(Course, pk=course_id) if course_id else None
            student = get_object_or_404(User, pk=student_id) if student_id else None
            exam = get_object_or_404(Exam, pk=exam_id) if exam_id else None
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id) if sub_exam_id else None

            # if batch and not InstituteMembership.objects.filter(
            #     user=added_by,
            #     institute=batch.institute,
            #     user_type__name__in=["Owner", "Admin", "Teacher","Staff"]
            # ).exists():
            #     raise PermissionDenied(f"You do not have permission to add grades for batch {batch.pk}.")

            # if batch and student and not batch.users.filter(pk=student.pk).exists():
            #     raise PermissionDenied(f"Student {student.pk} is not a member of batch {batch.pk}.")
            # if course and student and not course.enrolled_students.filter(pk=student.pk).exists():
            #     raise PermissionDenied(f"Student {student.pk} is not enrolled in course {course.pk}.")

            grade_instance_data = {
                'added_by': added_by.id,
                'institute': batch.institute.id if batch else None,
                'batch': batch.id if batch else None,
                'course': course.id if course else None,
                'student': student.id if student else None,
                'name': grade_data.get('name', ''),
                'grade_value': grade_value,
                'comments': comments,
                'marks_obtained': marks_obtained,
                'exam': exam.id if exam else None,
                'sub_exam': sub_exam.id if sub_exam else None,
            }

            grade_serializer = self.get_serializer(data=grade_instance_data)
            grade_serializer.is_valid(raise_exception=True)
            grade = grade_serializer.save()
            created_grades.append(grade)

        return created_grades

    def create(self, request, *args, **kwargs):
        created_grades = self.perform_create(self.get_serializer())
        response_data = GradeSerializers(created_grades, many=True).data
        return Response(response_data, status=status.HTTP_201_CREATED)

    
class UploadGradesView(views.APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, batch_id, user_id):
        file = request.FILES.get('file')
        if not file:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            file_path = default_storage.save(file.name, file)
            data = pd.read_excel(default_storage.open(file_path))
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        batch = get_object_or_404(Batch, pk=batch_id)
        added_by = get_object_or_404(User, pk=user_id)

        # Check if the added_by user is an admin, teacher, or owner of the institute
        # if not InstituteMembership.objects.filter(
        #     user=added_by,
        #     institute=batch.institute,
        #     user_type__name__in=["Owner", "Admin", "Teacher"]
        # ).exists():
        #     default_storage.delete(file_path)
        #     raise PermissionDenied("You do not have permission to upload grades.")

        errors = []
        successes = []
        created_grades = []

        for index, row in data.iterrows():
            try:
                student_id = row['student_id']
                course_id = row.get('course_id')
                course_global_code = row.get('course_global_code')
                grade_value = row['grade_value']
                comments = row.get('comments', '')
                exam_id = row.get('exam_id')
                sub_exam_id = row.get('sub_exam_id')
                marks_obtained = row.get('marks_obtained')

                student = get_object_or_404(User, pk=student_id)

                # Attempt to find the course by course_id or course_global_code
                if course_id:
                    course = get_object_or_404(Course, pk=course_id)
                elif course_global_code:
                    course = get_object_or_404(Course, courseGlobalCode=course_global_code)
                else:
                    raise ValueError("Either course_id or course_global_code must be provided.")

                # if not batch.users.filter(pk=student.pk).exists():
                #     errors.append(f"Student {student_id} is not in batch {batch_id}.")
                #     continue
                # if not course.enrolled_students.filter(pk=student.pk).exists():
                #     errors.append(f"Student {student_id} is not enrolled in course {course.pk if course_id else course_global_code}.")
                #     continue

                # Validate and get the exam
                exam = None
                if exam_id:
                    exam = get_object_or_404(Exam, pk=exam_id)

                # Validate and get the sub_exam
                sub_exam = None
                if sub_exam_id:
                    sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)

                grade = Grade.objects.create(
                    institute=batch.institute,
                    course=course,
                    student=student,
                    grade_value=grade_value,
                    comments=comments,
                    added_by=added_by,
                    exam=exam,
                    sub_exam=sub_exam,
                    marks_obtained=marks_obtained
                )
                created_grades.append(grade)
                successes.append(f"Grade for student {student_id} in course {course.pk if course_id else course_global_code} uploaded successfully.")
            except Exception as e:
                errors.append(f"Error processing student {student_id}: {str(e)}")

        default_storage.delete(file_path)

        if created_grades:
            serialized_grades = BatchGradeSerializer(created_grades, many=True).data
        else:
            serialized_grades = []

        return Response({
            "successes": successes,
            "errors": errors,
            "grades": serialized_grades
        }, status=status.HTTP_201_CREATED if not errors else status.HTTP_400_BAD_REQUEST)

    
class BatchGradesView(generics.ListAPIView):
    serializer_class = GradeListSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsPagination

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        queryset = Grade.objects.filter(batch=batch)

        user_id = self.request.query_params.get('user_id')
        course_id = self.request.query_params.get('course_id')
        student_id = self.request.query_params.get('student_id')

        if user_id:
            queryset = queryset.filter(student__id=user_id)
        if course_id:
            queryset = queryset.filter(course__id=course_id)
        if student_id:
            queryset = queryset.filter(student__id=student_id)
        
        return queryset

    
class BatchAttendanceUpdateView(APIView):
    def post(self, request, batch_id, user_id, format=None):
        batch = get_object_or_404(Batch, pk=batch_id)
        user = get_object_or_404(User, pk=user_id)
        attendance_date = request.data.get('attendance_date')
        attendance_status = request.data.get('status')
        member_ids = request.data.get('member_ids', [])

        if attendance_status not in ['present', 'absent', 'na']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the attendance_date is a date object
        if attendance_date:
            attendance_date = parse_date(attendance_date)
        else:
            attendance_date = timezone.now().date()

        updated_attendances = []

        for member_id in member_ids:
            member = get_object_or_404(User, pk=member_id)
            if member in batch.users.all():
                # Check if the batch attendance already exists
                try:
                    batch_attendance = BatchAttendance.objects.get(
                        batch=batch,
                        member=member,
                        attendance_date=attendance_date
                    )
                    batch_attendance.status = attendance_status
                    batch_attendance.in_time = request.data.get('in_time')
                    batch_attendance.out_time = request.data.get('out_time')
                    batch_attendance.start_date = request.data.get('start_date')
                    batch_attendance.end_date = request.data.get('end_date')
                    batch_attendance.remarks = request.data.get('remarks')
                    batch_attendance.save()
                except BatchAttendance.DoesNotExist:
                    batch_attendance = BatchAttendance.objects.create(
                        batch=batch,
                        member=member,
                        attendance_date=attendance_date,
                        status=attendance_status,
                        in_time=request.data.get('in_time'),
                        out_time=request.data.get('out_time'),
                        start_date=request.data.get('start_date'),
                        end_date=request.data.get('end_date'),
                        remarks=request.data.get('remarks')
                    )

                # Update or create course attendance for all courses in the batch
                for course in batch.courses.all():
                    try:
                        course_attendance = Attendance.objects.get(
                            course=course,
                            member=member,
                            attendance_date=attendance_date
                        )
                        course_attendance.status = attendance_status
                        course_attendance.in_time = request.data.get('in_time')
                        course_attendance.out_time = request.data.get('out_time')
                        course_attendance.start_date = request.data.get('start_date')
                        course_attendance.end_date = request.data.get('end_date')
                        course_attendance.remarks = request.data.get('remarks')
                        course_attendance.save()
                    except Attendance.DoesNotExist:
                        Attendance.objects.create(
                            course=course,
                            member=member,
                            attendance_date=attendance_date,
                            status=attendance_status,
                            in_time=request.data.get('in_time'),
                            out_time=request.data.get('out_time'),
                            start_date=request.data.get('start_date'),
                            end_date=request.data.get('end_date'),
                            remarks=request.data.get('remarks')
                        )

                updated_attendances.append(batch_attendance)

        serializer = BatchAttendanceSerializer(updated_attendances, many=True)
        return Response({
            'message': 'Attendance updated successfully',
            'batch_attendance': serializer.data
        }, status=status.HTTP_200_OK)

    
class BatchAttendanceUpdateByIdView(APIView):
    def put(self, request, user_id, batch_id, attendance_id, format=None):
        # Get the user who is updating the attendance
        updater = get_object_or_404(User, pk=user_id)

        # Get the batch and attendance record to be updated
        batch = get_object_or_404(Batch, pk=batch_id)
        attendance = get_object_or_404(BatchAttendance, pk=attendance_id, batch=batch)

        data = request.data
        attendance_status = data.get('status')
        if attendance_status not in ['present', 'absent', 'na']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        # Update batch attendance
        attendance.status = attendance_status
        attendance.in_time = data.get('in_time')
        attendance.out_time = data.get('out_time')
        attendance.start_date = data.get('start_date')
        attendance.end_date = data.get('end_date')
        attendance.remarks = data.get('remarks')
        attendance.save()

        # Update related course attendances
        member = attendance.member
        attendance_date = attendance.attendance_date

        for course in batch.courses.all():
            course_attendance, created = Attendance.objects.get_or_create(
                course=course,
                member=member,
                attendance_date=attendance_date
            )
            course_attendance.status = attendance_status
            course_attendance.in_time = data.get('in_time')
            course_attendance.out_time = data.get('out_time')
            course_attendance.start_date = data.get('start_date')
            course_attendance.end_date = data.get('end_date')
            course_attendance.remarks = data.get('remarks')
            course_attendance.save()

        return Response({
            'message': 'Batch attendance updated successfully',
            'batch_attendance': BatchAttendanceSerializer(attendance).data
        }, status=status.HTTP_200_OK)
        
class BatchAttendanceListView(APIView):
    pagination_class = StandardResultsPagination

    def get(self, request, format=None):
        batch_id = request.query_params.get('batch_id')
        course_id = request.query_params.get('course_id')
        member_id = request.query_params.get('member_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if not batch_id and not course_id and not member_id:
            return Response({'error': 'batch_id, course_id, or member_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        filters = Q()

        if member_id:
            member = get_object_or_404(User, pk=member_id)
            filters &= Q(member=member)

        if batch_id:
            batch = get_object_or_404(Batch, pk=batch_id)
            filters &= Q(batch=batch)

        if course_id:
            course = get_object_or_404(Course, pk=course_id)
            filters &= Q(batch__courses=course)

        if start_date:
            start_date = parse_date(start_date)
            filters &= Q(attendance_date__gte=start_date)

        if end_date:
            end_date = parse_date(end_date)
            filters &= Q(attendance_date__lte=end_date)

        batch_attendances = BatchAttendance.objects.filter(filters).order_by('-attendance_date').distinct()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(batch_attendances, request)
        if page is not None:
            serializer = BatchAttendanceSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = BatchAttendanceSerializer(batch_attendances, many=True)
        return Response({
            'batch_attendances': serializer.data
        }, status=status.HTTP_200_OK)


class ClassCourseAttendanceCreateView(APIView):
    def post(self, request, user_id, format=None):
        # Get the user who is creating the attendance
        creator = get_object_or_404(User, pk=user_id)

        # # Check if the user is an admin or teacher
        # if not InstituteMembership.objects.filter(user=creator, user_type__name__in=['Admin', 'Teacher']).exists():
        #     return Response({'error': 'You do not have permission to create attendance records'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data

        # Validate and get the related objects
        member_ids = data.get('member_ids', [])
        if not member_ids:
            return Response({'error': 'member_ids is required'}, status=status.HTTP_400_BAD_REQUEST)

        class_session = get_object_or_404(Class, pk=data.get('class_session_id'))
        course = None
        if 'course_id' in data:
            course = get_object_or_404(Course, pk=data.get('course_id'))
        institute = None
        if 'institute_id' in data:
            institute = get_object_or_404(Institute, pk=data.get('institute_id'))

        attendances = []
        for member_id in member_ids:
            member = get_object_or_404(User, pk=member_id)

            # Create the attendance record
            attendance = Attendance.objects.create(
                member=member,
                class_session=class_session,
                course=course,
                institute=institute,
                attendance_date=data.get('attendance_date', timezone.now().date()),
                in_time=data.get('in_time'),
                out_time=data.get('out_time'),
                status=data.get('status', 'na'),
                approver_status=data.get('approver_status', 'pending'),
                remarks=data.get('remarks')
            )
            attendances.append(attendance)

        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ClassCourseAttendanceUpdateView(APIView):
    def put(self, request, user_id, format=None):
        # Get the user who is updating the attendance
        updater = get_object_or_404(User, pk=user_id)

        # Check if the user is an admin or teacher
        # if not InstituteMembership.objects.filter(user=updater, user_type__name__in=['Admin', 'Teacher']).exists():
        #     return Response({'error': 'You do not have permission to update attendance records'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data

        # Validate and get the related objects
        attendance_updates = data.get('attendances', [])
        if not attendance_updates:
            return Response({'error': 'attendances is required'}, status=status.HTTP_400_BAD_REQUEST)

        updated_attendances = []

        for attendance_data in attendance_updates:
            attendance_id = attendance_data.get('attendance_id')
            if not attendance_id:
                return Response({'error': 'attendance_id is required for each attendance object'}, status=status.HTTP_400_BAD_REQUEST)

            attendance = get_object_or_404(Attendance, pk=attendance_id)

            new_status = attendance_data.get('status')
            if new_status and new_status not in ['present', 'absent', 'na']:
                return Response({'error': f'Invalid status: {new_status}'}, status=status.HTTP_400_BAD_REQUEST)
            
            attendance.status = new_status or attendance.status
            attendance.attendance_date = attendance_data.get('attendance_date', attendance.attendance_date)
            attendance.in_time = attendance_data.get('in_time', attendance.in_time)
            attendance.out_time = attendance_data.get('out_time', attendance.out_time)
            attendance.approver_status = attendance_data.get('approver_status', attendance.approver_status)
            attendance.remarks = attendance_data.get('remarks', attendance.remarks)
            attendance.save()
            updated_attendances.append(attendance)

        serializer = AttendanceSerializer(updated_attendances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ClassCourseAttendanceListView(APIView):
    pagination_class = StandardResultsPagination

    def get(self, request, format=None):
        attendance_id = request.query_params.get('attendance_id')
        classroom_id = request.query_params.get('classroom_id')
        institute_id = request.query_params.get('institute_id')
        course_id = request.query_params.get('course_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        filters = Q()

        if attendance_id:
            filters &= Q(id=attendance_id)
        if classroom_id:
            class_session = get_object_or_404(Class, pk=classroom_id)
            filters &= Q(class_session=class_session)
        if institute_id:
            institute = get_object_or_404(Institute, pk=institute_id)
            filters &= Q(institute=institute)
        if course_id:
            course = get_object_or_404(Course, pk=course_id)
            filters &= Q(course=course)
        if start_date and end_date:
            try:
                start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
                end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
                filters &= Q(attendance_date__range=(start_date_obj, end_date_obj))
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

        attendances = Attendance.objects.filter(filters).distinct()
        paginator = self.pagination_class()
        paginated_attendances = paginator.paginate_queryset(attendances, request)

        serializer = AttendanceCourseClassSerializer(paginated_attendances, many=True)

        return paginator.get_paginated_response(serializer.data)
    
class BatchTimetableCreateView(generics.CreateAPIView):
    queryset = BatchTimetable.objects.all()
    serializer_class = BatchTimetableSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            serializer.save(uploaded_by=user)
        except User.DoesNotExist:
            raise ValidationError(f"User with id {user_id} does not exist.")


class BatchTimetableUpdateView(generics.UpdateAPIView):
    queryset = BatchTimetable.objects.all()
    serializer_class = BatchTimetableSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            serializer.save(uploaded_by=user)
        except User.DoesNotExist:
            raise ValidationError(f"User with id {user_id} does not exist.")


class BatchTimetableDeleteView(generics.DestroyAPIView):
    queryset = BatchTimetable.objects.all()
    serializer_class = BatchTimetableSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            # Perform any additional logic with user if needed
            instance.delete()
        except User.DoesNotExist:
            raise ValidationError(f"User with id {user_id} does not exist.")

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "BatchTimetable deleted successfully."}, status=status.HTTP_200_OK)


class BatchTimetableDetailView(generics.RetrieveAPIView):
    queryset = BatchTimetable.objects.all()
    serializer_class = BatchTimetableSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Access user_id from the URL if needed
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            # Perform any additional logic with user if needed
            return super().get_object()
        except User.DoesNotExist:
            raise ValidationError(f"User with id {user_id} does not exist.")

class BatchTimetableListView(generics.ListAPIView):
    queryset = BatchTimetable.objects.all()
    serializer_class = BatchTimetableSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        timetable_id = self.request.query_params.get('timetable_id', None)
        batch_id = self.request.query_params.get('batch_id', None)

        if timetable_id is not None:
            queryset = queryset.filter(id=timetable_id)

        if batch_id is not None:
            queryset = queryset.filter(batches__id=batch_id)

        return queryset.order_by('-created_at')

class InstituteBatchTimeTableListView(APIView):
    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request, institute_id):
        batches = Batch.objects.filter(institute_id=institute_id)
        serializer = InstituteBatchTimeTableSerializer(batches, many=True)
        return Response(serializer.data)

class BatchExcelDownloadView(APIView):
    def get(self, request, *args, **kwargs):
        batch_id = request.query_params.get('batch_id')

        if not batch_id:
            return Response({"error": "batch_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        batch = get_object_or_404(Batch, id=batch_id)
        members = batch.users.all()
        courses = batch.courses.all()

        # Create a workbook and add a worksheet
        workbook = openpyxl.Workbook()
        sheet = workbook.active
        sheet.title = "Batch Members"

        # Define the header
        header = ['First Name', 'Last Name', 'Email', 'Username']
        course_columns = [course.courseGlobalCode for course in courses]
        header.extend(course_columns)
        sheet.append(header)

        # Add member data
        for member in members:
            row = [
                member.firstname,
                member.lastname,
                member.email,
                member.username,
            ]
            # Collecting courses linked to the batch
            member_courses = [course.courseFullName for course in courses if member in course.enrolled_students.all()]
            row.extend(member_courses)
            # Ensure there are enough columns for all courses
            if len(member_courses) < len(courses):
                row.extend([''] * (len(courses) - len(member_courses)))
            sheet.append(row)

        # Save the workbook to a BytesIO buffer
        buffer = BytesIO()
        workbook.save(buffer)
        buffer.seek(0)

        # Prepare the response
        response = HttpResponse(
            content=buffer,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = f'attachment filename=Batch_{batch_id}_Members.xlsx'
        return response

class LinkCourseToInstituteView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to link courses to institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        serializer = LinkCourseSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        course_ids = serializer.validated_data["course_ids"]

        is_institute_owner = InstituteMembership.objects.filter(
            user_id=user_id,
            institute=institute,
            user_type__name__in=["Owner",'Staff',"Admin"]
        ).exists()

        linked_courses = []
        skipped_courses = []

        for course_id in course_ids:
            course = get_object_or_404(Course, pk=course_id)
            if not (is_institute_owner or course.creater_id == user_id):
                logger.error(f"User {user_id} does not have permission to link course {course_id} to institute {institute_id}")
                continue  # Skip this course if user does not have permission

            if not institute.courses.filter(id=course_id).exists():
                institute.courses.add(course)
                admin_or_owner_members = institute.get_admin_or_owner_members()
                for member in admin_or_owner_members:
                    course.admins.add(member)
                    LinkedCourseMembers.objects.create(course=course, institute=institute, member=member)
                course.save()
                linked_courses.append(course_id)
                logger.debug(f"Course {course_id} linked successfully")
            else:
                skipped_courses.append(course_id)
                logger.debug(f"Course {course_id} is already linked to this institute")

        return Response({
            'linked_courses': linked_courses,
            'skipped_courses': skipped_courses
        }, status=status.HTTP_200_OK)

     
class DelinkCourseFromInstituteView(APIView):
    def post(self, request, institute_id, user_id, format=None):
        logger.debug(f"POST request to unlink courses from institute {institute_id} by user {user_id}")

        institute = get_object_or_404(Institute, pk=institute_id)
        serializer = LinkCourseSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        course_ids = serializer.validated_data["course_ids"]
        
        for course_id in course_ids:
            course = get_object_or_404(Course, pk=course_id)

            is_institute_owner = InstituteMembership.objects.filter(
                user_id=user_id,
                institute=institute,
                user_type__name__in=["Owner"]
            ).exists()

            if not (is_institute_owner or course.creater_id == user_id):
                logger.error(f"User {user_id} does not have permission to unlink course {course_id} from institute {institute_id}")
                raise PermissionDenied("You do not have sufficient permission to unlink this course.")

            if institute.courses.filter(id=course_id).exists():
                # Store original admins, teachers, and creator
                original_admins = set(course.admins.all())
                original_teachers = set(course.teachers.all())
                original_creater = course.creater

                linked_members = LinkedCourseMembers.objects.filter(course=course, institute=institute)
                for linked_member in linked_members:
                    course.admins.remove(linked_member.member)
                    linked_member.delete()
                institute.courses.remove(course)
                course.save()
                logger.debug(f"Course {course_id} unlinked successfully")

                # Restore original admins, teachers, and creator
                for admin in original_admins:
                    course.admins.add(admin)
                
                for teacher in original_teachers:
                    course.teachers.add(teacher)

                if original_creater:
                    course.creater = original_creater
                    course.save()
            else:
                logger.debug(f"Course {course_id} is not linked to this institute")
                return Response({
                    'message': f'Course {course_id} is not linked to this institute'
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Courses unlinked successfully',
            'course_ids': course_ids
        }, status=status.HTTP_200_OK)



class BatchEnrolledStudentsView(generics.ListAPIView):
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        # Filter users who are enrolled students
        student_role_name = "Student"
        enrolled_students = batch.users.filter(
            institutemembership__user_type__name=student_role_name,
            institutemembership__institute=batch.institute
        )
        return enrolled_students

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class BatchEnrolledStudentsCourseView(generics.ListAPIView):
    serializer_class = BatchCourseSerializers
    pagination_class = StandardResultsSetPagination
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)

        course_id = self.request.query_params.get('course_id', None)
        
        if course_id:
            # Filter by specific course_id within the batch
            courses = Course.objects.filter(pk=course_id, batches=batch)
        else:
            # Get all courses linked to the batch
            courses = batch.courses.all()
        
        return courses

class BatchEnrolledStudentsCourseExamView(generics.ListAPIView):
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)

        course_id = self.request.query_params.get('course_id')
        exam_id = self.request.query_params.get('exam_id')
        sub_exam_id = self.request.query_params.get('sub_exam_id')
        student_id = self.request.query_params.get('student_id')

        courses = Course.objects.filter(batches=batch)

        if course_id:
            courses = courses.filter(pk=course_id)

        if exam_id or sub_exam_id or student_id:
            return courses
        return []

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer_context = {
            'batch_id': self.kwargs.get('batch_id'),
            'exam_id': self.request.query_params.get('exam_id', None),
            'sub_exam_id': self.request.query_params.get('sub_exam_id', None),
            'student_id': self.request.query_params.get('student_id', None),
            'request': self.request
        }

        if page is not None:
            if self.request.query_params.get('course_id') and (self.request.query_params.get('exam_id') or self.request.query_params.get('sub_exam_id') or self.request.query_params.get('student_id')):
                serializer = CourseWithGradesSerializer(page, many=True, context=serializer_context)
            else:
                serializer = BatchCourseSerializer(page, many=True, context=serializer_context)
            return self.get_paginated_response(serializer.data)

        if self.request.query_params.get('course_id') and (self.request.query_params.get('exam_id') or self.request.query_params.get('sub_exam_id') or self.request.query_params.get('student_id')):
            serializer = CourseWithGradesSerializer(queryset, many=True, context=serializer_context)
        else:
            serializer = BatchCourseSerializer(queryset, many=True, context=serializer_context)
        return Response(serializer.data)


class EditGradeView(generics.UpdateAPIView):
    queryset = Grade.objects.all()
    serializer_class = BatchGradeSerializer

    def perform_update(self, serializer):
        added_by_id = self.kwargs.get('user_id')
        grade_data_list = self.request.data.get('grades', [])

        if not grade_data_list:
            raise ValidationError("Grades data must be provided.")

        added_by = get_object_or_404(User, pk=added_by_id)

        updated_grades = []

        for grade_data in grade_data_list:
            grade_id = grade_data.get('id')
            batch_id = grade_data.get('batch_id')
            course_id = grade_data.get('course_id')
            student_id = grade_data.get('student_id')
            exam_id = grade_data.get('exam_id')
            sub_exam_id = grade_data.get('sub_exam_id')
            grade_value = grade_data.get('grade')
            comments = grade_data.get('comments', '')
            marks_obtained = grade_data.get('marks_obtained', None)

            grade = get_object_or_404(Grade, pk=grade_id)
            batch = get_object_or_404(Batch, pk=batch_id) if batch_id else grade.batch
            course = get_object_or_404(Course, pk=course_id) if course_id else grade.course
            student = get_object_or_404(User, pk=student_id) if student_id else grade.student
            exam = get_object_or_404(Exam, pk=exam_id) if exam_id else grade.exam
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id) if sub_exam_id else grade.sub_exam

            # Check permissions for the added_by user for the batch
            if not InstituteMembership.objects.filter(
                user=added_by,
                institute=batch.institute,
                user_type__name__in=["Owner", "Admin", "Teacher",'Staff']
            ).exists():
                raise PermissionDenied(f"You do not have permission to edit grades for batch {batch.pk}.")

            # Check student memberships and enrollments
            if batch and student and not batch.users.filter(pk=student.pk).exists():
                raise PermissionDenied(f"Student {student.pk} is not a member of batch {batch.pk}.")
            if course and student and not course.enrolled_students.filter(pk=student.pk).exists():
                raise PermissionDenied(f"Student {student.pk} is not enrolled in course {course.pk}.")

            grade_data = {
                'added_by': added_by.id,
                'institute': batch.institute.id if batch else None,
                'batch': batch.id if batch else None,
                'course': course.id if course else None,
                'student': student.id if student else None,
                'name': grade_data.get('name', grade.name),
                'grade_value': grade_value if grade_value else grade.grade_value,
                'comments': comments,
                'marks_obtained': marks_obtained,
                'exam': exam.id if exam else None,
                'sub_exam': sub_exam.id if sub_exam else None,
            }

            grade_serializer = self.get_serializer(grade, data=grade_data)
            grade_serializer.is_valid(raise_exception=True)
            grade_serializer.save()
            updated_grades.append(grade)

        return updated_grades

    def update(self, request, *args, **kwargs):
        updated_grades = self.perform_update(self.get_serializer())
        response_data = GradeSerializers(updated_grades, many=True).data
        return Response(response_data, status=status.HTTP_200_OK)

    
class DeleteGradeView(generics.DestroyAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializers
    # permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        added_by_id = self.kwargs.get('user_id')
        grade_id = kwargs.get('pk')

        # If a specific grade ID is provided, delete that grade
        if grade_id:
            grade = get_object_or_404(Grade, pk=grade_id)
            grade.delete()
            return Response({"message": "Grade deleted successfully."}, status=status.HTTP_200_OK)
       
        batch_ids = request.data.get('batches')
        course_ids = request.data.get('courses')
        student_ids = request.data.get('students')
        exam_id = request.data.get('exam')
        sub_exam_id = request.data.get('sub_exam')

        if not batch_ids or not course_ids or not student_ids:
            raise ValidationError("Batches, courses, and students must be provided.")

        added_by = get_object_or_404(User, pk=added_by_id)

        # Validate and get the batches
        batches = Batch.objects.filter(pk__in=batch_ids)
        if batches.count() != len(batch_ids):
            raise PermissionDenied("One or more batches are invalid.")

        # Validate and get the courses
        courses = Course.objects.filter(pk__in=course_ids)
        if courses.count() != len(course_ids):
            raise PermissionDenied("One or more courses are invalid.")

        # Validate and get the students
        students = User.objects.filter(pk__in=student_ids)
        if students.count() != len(student_ids):
            raise PermissionDenied("One or more students are invalid.")

        # Validate and get the exam
        exam = None
        sub_exam = None
        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
        if sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)

        # Check permissions for the added_by user for each batch
        for batch in batches:
            if not InstituteMembership.objects.filter(
                user=added_by,
                institute=batch.institute,
                user_type__name__in=["Owner", "Admin", "Teacher",'Staff']
            ).exists():
                raise PermissionDenied(f"You do not have permission to delete grades for batch {batch.pk}.")

        # Check student memberships and enrollments
        for student in students:
            for batch in batches:
                if not batch.users.filter(pk=student.pk).exists():
                    raise PermissionDenied(f"Student {student.pk} is not a member of batch {batch.pk}.")
                for course in courses:
                    if not course.enrolled_students.filter(pk=student.pk).exists():
                        raise PermissionDenied(f"Student {student.pk} is not enrolled in course {course.pk}.")

        # Delete grades for each combination of student, batch, course, and exam
        deleted_grades = []
        for batch in batches:
            for course in courses:
                for student in students:
                    grades = Grade.objects.filter(batch=batch, course=course, student=student)
                    if exam:
                        grades = grades.filter(exam=exam)
                    if sub_exam:
                        grades = grades.filter(sub_exam=sub_exam)
                    for grade in grades:
                        deleted_grades.append(grade)
                        grade.delete()

        return Response({"message": "Grades deleted successfully."}, status=status.HTTP_200_OK)

class BatchExamSubExamGradesView(generics.ListAPIView):
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        batch_id = self.kwargs.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        student_id = self.request.query_params.get('student_id')

        if student_id:
            users = batch.users.filter(id=student_id)
        else:
            users = batch.users.all()

        return users

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        exam_id = self.request.query_params.get('exam_id')
        sub_exam_id = self.request.query_params.get('sub_exam_id')

        grades_list = []

        for user in queryset:
            user_grades = self.get_user_grades(user, exam_id, sub_exam_id)
            grades_list.append({
                'student': UserSerializer(user).data,
                'grades': user_grades
            })

        # Paginate the grades_list
        page = self.paginate_queryset(grades_list)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(grades_list)

    def get_user_grades(self, user, exam_id, sub_exam_id):
        grades = []

        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            sub_exams = SubExam.objects.filter(parent_exam=exam)
            if sub_exams.exists():
                for sub_exam in sub_exams:
                    grade = Grade.objects.filter(sub_exam=sub_exam, student=user).first()
                    grades.append({
                        'exam': ExamSerializer(exam).data,
                        'sub_exam': SubExamSerializer(sub_exam).data,
                        'grade': GradeSerializers(grade).data if grade else None,
                        'marks_obtained': grade.marks_obtained if grade else None,
                        'percentage': grade.percentage if grade else None,
                        'has_given_sub_exam': grade is not None
                    })
            else:
                grade = Grade.objects.filter(exam=exam, student=user).first()
                grades.append({
                    'exam': ExamSerializer(exam).data,
                    'grade': GradeSerializers(grade).data if grade else None,
                    'marks_obtained': grade.marks_obtained if grade else None,
                    'percentage': grade.percentage if grade else None,
                    'has_given_exam': grade is not None
                })
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            grade = Grade.objects.filter(sub_exam=sub_exam, student=user).first()
            grades.append({
                'exam': ExamSerializer(exam).data,
                'sub_exam': SubExamSerializer(sub_exam).data,
                'grade': GradeSerializers(grade).data if grade else None,
                'marks_obtained': grade.marks_obtained if grade else None,
                'percentage': grade.percentage if grade else None,
                'has_given_sub_exam': grade is not None
            })
        else:
            exams = Exam.objects.filter(grades_exam__student=user).distinct()
            for exam in exams:
                sub_exams = SubExam.objects.filter(parent_exam=exam)
                if sub_exams.exists():
                    for sub_exam in sub_exams:
                        grade = Grade.objects.filter(sub_exam=sub_exam, student=user).first()
                        grades.append({
                            'exam': ExamSerializer(exam).data,
                            'sub_exam': SubExamSerializer(sub_exam).data,
                            'grade': GradeSerializers(grade).data if grade else None,
                            'marks_obtained': grade.marks_obtained if grade else None,
                            'percentage': grade.percentage if grade else None,
                            'has_given_sub_exam': grade is not None
                        })
                else:
                    grade = Grade.objects.filter(exam=exam, student=user).first()
                    grades.append({
                        'exam': ExamSerializer(exam).data,
                        'grade': GradeSerializers(grade).data if grade else None,
                        'marks_obtained': grade.marks_obtained if grade else None,
                        'percentage': grade.percentage if grade else None,
                        'has_given_exam': grade is not None
                    })

        return grades
