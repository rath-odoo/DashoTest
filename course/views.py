from django.shortcuts import render
from django.shortcuts import render
from .models import CourseDesignedFor,Course, Subject, EducationBoard, VideoObject, FileObject, CourseLink



from .serializers import CourseDesignedForSerializer,CourseSerializer, SubjectSerializer
from .serializers import EducationBoardSerializer, CourseSerializerValue,CourseSerializerEnrollRequest
from .serializers import CourseSerializerEnroll,  CreateCourseSerializer, CourseSerializerEnrollReject
from .serializers import DashboardCourseEditSerializer, AddYoutubeVideoSerializer, GetYoutubeVideoSerializer
from .serializers import GetCourseLinkSerializer, AddCourseLinkSerializer, GetCourseFileSerializer
from .serializers import AddCourseFileSerializer, CourseCardImageUploadSerializer, CourseSerializerSummary
from .serializers import CreateNewCourseSerializer, PublicCourseSearchSerializer, CoursePublishSerializer
from .serializers import CourseUnPublishSerializer, UserSerializer, CourseMemberSerializer
from .serializers import CoursePeopleAddSerializer, CoursePeopleRemoveSerializer, CourseTeachersAddSerializer
from .serializers import CourseTeachersRemoveSerializer, TeacherSerializer
from .serializers import CourseAdminsAddSerializer, CourseAdminsRemoveSerializer


from .serializers import AdminListCourseSerializer

from accountAPIs.serializers import  UserSerializerFew



from rest_framework.permissions import IsAuthenticated, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions, AllowAny
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.http import Http404
from rest_framework import status
from rest_framework import pagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import filters
from django.db.models import Q
from rest_framework.exceptions import NotFound
from django.db import transaction
from grade.models import Grade
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission

User = get_user_model()

class CourseDesignedForView(generics.ListCreateAPIView):
    queryset = CourseDesignedFor.objects.all()
    serializer_class = CourseDesignedForSerializer

class CourseDesignedForViewId(APIView):
    def get_object(self, pk):
        try:
            return CourseDesignedFor.objects.get(pk=pk)
        except CourseDesignedFor.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseDesignedForSerializer(Object)
        return Response(serializer.data)

class CreateCourseView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CreateCourseSerializer

class CreateNewCourseView(generics.ListCreateAPIView):
      queryset = Course.objects.all()
      serializer_class = CreateNewCourseSerializer

#same as Course Designed for 
class ClassObjbyId(generics.ListAPIView):
    serializer_class = CourseDesignedForSerializer
    def get_queryset(self):
        classId = self.kwargs['classId']
        return CourseDesignedFor.objects.filter(id=classId)
class CourseViewTeacherId(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]    
    model = Course
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacherId = self.kwargs['teacherId']
        return Course.objects.filter(teachers=teacherId)   #teacher
        
        

class CourseViewValueTeacherId(generics.ListCreateAPIView):
      #model = Course
      serializer_class = CourseSerializerValue
      queryset = Course.objects.all()

class CourseViewByGlobalCode(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]    
    model = Course
    serializer_class = CourseSerializer

    def get_queryset(self):
        courseGlobalCode = self.kwargs['courseGlobalCode']
        return Course.objects.filter(courseGlobalCode=courseGlobalCode)

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CustomSearchByTeacherFilter(filters.SearchFilter):
    def filter_queryset(self, request, queryset, view):
        search_fields = getattr(view, 'search_fields', None)

        # Check if search_fields is defined
        if search_fields:
            # Get the search term from the request
            search_term = request.query_params.get(self.search_param, '')

            # If there's a search term for any field, filter the queryset accordingly
            if search_term:
                q_objects = Q()
                for field in search_fields:
                    # If the field is 'teachers', filter the queryset based on related model's firstname or lastname
                    if field == 'teachers':
                        q_objects |= Q(teachers__firstname__icontains=search_term) | Q(teachers__lastname__icontains=search_term)
                    else:
                        q_objects |= Q(**{field + '__icontains': search_term})
                queryset = queryset.filter(q_objects)

        # Let the parent class handle other filters
        return super().filter_queryset(request, queryset, view)

class PublicCourseSearchView(generics.ListAPIView):
    #queryset = Course.objects.all()
    serializer_class = PublicCourseSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['courseShortName', 'courseGlobalCode','instituteName']
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        # Filter the queryset to fetch only courses where published is True
        return Course.objects.filter(published=True)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CourseUpdateViewByGlobalCode(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]    
    model = Course
    serializer_class = CourseSerializer

    def get_queryset(self):
        courseGlobalCode = self.kwargs['courseGlobalCode']
        return Course.objects.filter(courseGlobalCode=courseGlobalCode)
    
class CourseViewId(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializer(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublishCourseView(APIView):
      def get_object(self, courseId):
        try:
            return Course.objects.get(pk=courseId)
        except Course.DoesNotExist:
            raise Http404
      def put(self, request, courseId, format=None):
         Object = self.get_object(courseId)
         serializer = CoursePublishSerializer(Object, data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     

class UnPublishCourseView(APIView):
      def get_object(self, courseId):
        try:
            return Course.objects.get(pk=courseId)
        except Course.DoesNotExist:
            raise Http404
      def put(self, request, courseId, format=None):
         Object = self.get_object(courseId)
         serializer = CourseUnPublishSerializer(Object, data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseSummaryViewId(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializerSummary(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializerSummary(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditOneDashboardCourseView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = DashboardCourseEditSerializer(Object)
        return Response(serializer.data)
      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = DashboardCourseEditSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddYoutubeVideoCourseView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddYoutubeVideoSerializer(Object)
        return Response(serializer.data)
      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddYoutubeVideoSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeleteYoutubeVideoView(APIView):
    def get_object(self, pk):
        try:
            return VideoObject.objects.get(pk=pk)
        except VideoObject.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        video_object = self.get_object(pk)
        video_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 




class AddCourseLinkCourseView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddCourseLinkSerializer(Object)
        return Response(serializer.data)
      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddCourseLinkSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeleteCourseLinkView(APIView):
      def get_object(self, pk):
        try:
            return CourseLink.objects.get(pk=pk)
        except CourseLink.DoesNotExist:
            raise Http404

      def delete(self, request, pk, format=None):
         video_object = self.get_object(pk)
         video_object.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)





class AddCourseFileView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddCourseFileSerializer(Object)
        return Response(serializer.data)
      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = AddCourseFileSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCourseFileView(APIView):
      def get_object(self, pk):
          try:
             return FileObject.objects.get(pk=pk)
          except FileObject.DoesNotExist:
             raise Http404

      def delete(self, request, pk, format=None):
          video_object = self.get_object(pk)
          video_object.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)



class SummaryVideoPageSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500


#class GetVideosByCourseIdView(APIView):
#      pagination_class = SummaryVideoPageSetPagination
#      def get_object(self, pk):
#        try:
#            return Course.objects.get(pk=pk)
#        except Course.DoesNotExist:
#            raise Http404
#      def get(self, request, pk, format=None):
#        Object = self.get_object(pk)
#        serializer = GetYoutubeVideoSerializer(Object)
#        return Response(serializer.data)
#      def put(self, request, pk, format=None):
#        Object = self.get_object(pk)
#        serializer = GetYoutubeVideoSerializer(Object, data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

class GetVideosByCourseIdView(generics.ListAPIView):
    serializer_class = GetYoutubeVideoSerializer
    pagination_class = SummaryVideoPageSetPagination

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get_queryset(self):
        courseId = self.kwargs['pk']
        courseObj=self.get_object(pk=courseId)
        videoObjs=courseObj.videos.all()
        return videoObjs


class GetCourseFilesByCourseIdView(generics.ListAPIView):
      serializer_class = GetCourseFileSerializer
      pagination_class = SummaryVideoPageSetPagination
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get_queryset(self):
        courseId = self.kwargs['pk']
        courseObj=self.get_object(pk=courseId)
        videoObjs=courseObj.coursefiles.all()
        return videoObjs

class SummaryLinkPageSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 500

class GetCourseLinksByCourseIdView(generics.ListAPIView):
    serializer_class = GetCourseLinkSerializer
    pagination_class = SummaryLinkPageSetPagination

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get_queryset(self):
        courseId = self.kwargs['pk']
        courseObj=self.get_object(pk=courseId)
        linkObjs=courseObj.courselinks.all()
        return linkObjs 

class AddCourseToDashboardView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

      def put(self, request, pk, format=None):
        CourseObject = self.get_object(pk)
        UserObject = request.user;
        if  UserObject.id != CourseObject.creater.id:
            UserObject.dashboard_courses.add(CourseObject);
            UserObject.save()
        else:
            Response(data={'message': False})
        return Response(data={'message': True});

class CourseExistsInDashboardView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None): 
          CourseObject = self.get_object(pk)
          UserObject = request.user;
          if CourseObject in UserObject.dashboard_courses.all():
              return Response(data={'exists':True});
          else:
              return Response(data={'exists':False});
# class CourseDeleteView(APIView):
#     def get_object(self, pk):
#         try:
#             return Course.objects.get(pk=pk)
#         except Course.DoesNotExist:
#             raise NotFound(detail="Course not found")

#     def delete(self, request, pk, format=None):
#         course = self.get_object(pk)
#         with transaction.atomic():
#             # Remove any related operations here if needed
#             # For example, if you need to handle any many-to-many relationships:
#             # course.some_related_field.clear()
            
#             course.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
class CourseDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise NotFound(detail="Course not found")

    def delete(self, request, pk, format=None):
        course = self.get_object(pk)
        with transaction.atomic():
            # Manually handle related Grades
            grades = Grade.objects.filter(course=course)
            for grade in grades:
                grade.delete()  # or handle them differently if needed
            # Now safely delete the course
            course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CourseRemoveView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def put(self, request, pk, format=None):
          CourseObject = self.get_object(pk)
          UserObject = request.user;
          UserObject.dashboard_courses.remove(CourseObject);
          CourseObject.enrolled_students.remove(UserObject)
          return Response(status=status.HTTP_204_NO_CONTENT)

class CourseViewIdEnrollRequest(APIView):
     #permission_classes = [IsAuthenticated]
     def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

     def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializerEnrollRequest(Object)
        return Response(serializer.data)

     def put(self, request, pk, format=None):
        CourseObject = self.get_object(pk)
        UserObject=request.user;
        if CourseObject.teachers is None:
            CourseObject.teachers = []
        if  UserObject.id != CourseObject.creater.id :
            if not CourseObject.teachers.filter(id=UserObject.id).exists():
              UserObject.dashboard_courses.add(CourseObject);
              UserObject.save();
              CourseObject.enrolement_requests.add(UserObject);
        return Response(status=status.HTTP_204_NO_CONTENT)

class CourseViewIdEnroll(APIView):
     #permission_classes = [IsAuthenticated]
     def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

     def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializerEnroll(Object)
        return Response(serializer.data)

     def put(self, request, pk, format=None):
        CourseObject = self.get_object(pk)
        #context={"request":request}
        serializer = CourseSerializerEnroll(CourseObject, data=request.data,context={"request":request} )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseViewIdEnrollReject(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseSerializerEnrollReject(Object)
        return Response(serializer.data)

      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        #context={"request":request}
        serializer = CourseSerializerEnrollReject(Object, data=request.data,context={"request":request} )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClassViewPk(APIView):
    #permission_classes = [IsAuthenticated]    
    def get_object(self, pk):
        try:
            return CourseDesignedFor.objects.get(pk=pk)
        except CourseDesignedFor.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CourseDesignedForSerializer(Object)
        return Response(serializer.data)

class SubjectView(generics.ListAPIView):
    model = Subject
    serializer_class = SubjectSerializer

    def get_queryset(self):
        classname = self.kwargs['classname']
        board = self.kwargs['board']
        return Subject.objects.filter(classname=classname).filter(board__name=board)

## fix it need to pass course object
class CourseCardImageUploadAPIView(APIView):
      #permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def put(self, request, courseId,format=None):
          courseObj=Course.objects.get(pk=courseId);
          serializer = CourseCardImageUploadSerializer(courseObj, data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddPeopleToCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CoursePeopleAddSerializer(data=request.data)
        if serializer.is_valid():
            # Extract the user IDs and the role
            user_ids = serializer.validated_data['people']
            role = serializer.validated_data['role']
            users = User.objects.filter(id__in=user_ids)

            # Add users to the appropriate role
            if role == 'teacher':
                course.teachers.add(*users)
                for user in users:
                     user.dashboard_courses.add(course); 

            elif role == 'student':
                course.enrolled_students.add(*users)
                for user in users:
                     user.dashboard_courses.add(course);
            elif role == 'enrollment_request':
                course.enrolement_requests.add(*users)
                for user in users:
                     user.dashboard_courses.add(course);

            return Response({"message": f"People added to the course as {role} successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RemovePeopleFromCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CoursePeopleRemoveSerializer(data=request.data)

        if serializer.is_valid():
            # Extract the user IDs and remove them from the course
            user_ids = serializer.validated_data['people']
            users = User.objects.filter(id__in=user_ids)

            course.enrolled_students.remove(*users)
            for enrolled_student in users:
                     enrolled_student.dashboard_courses.remove(course);
            course.save()

            return Response({"message": "People removed from the course successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddTeachersToCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CourseTeachersAddSerializer(data=request.data)
        if serializer.is_valid():
            teacher_ids = serializer.validated_data['teacher_ids']
            teachers = User.objects.filter(id__in=teacher_ids)

            # Add teachers to the course
            course.teachers.add(*teachers)
            for teacher in teachers:
                teacher.dashboard_courses.add(course);
                teacher.save() 
            course.save()

            return Response({"message": "Teachers added to the course successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveTeachersFromCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CourseTeachersRemoveSerializer(data=request.data)
        if serializer.is_valid():
            teacher_ids = serializer.validated_data['teacher_ids']
            teachers = User.objects.filter(id__in=teacher_ids)
            teachers_to_remove = [teacher for teacher in teachers if teacher not in course.admins.all() and teacher != course.creater]
            # Remove teachers from the course
            course.teachers.remove(*teachers)
            for teacher in teachers_to_remove:
                teacher.dashboard_courses.remove(course);
                teacher.save()
            course.save()

            return Response({"message": "Teachers removed from the course successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminCoursesView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        institute_id = request.query_params.get('institute_id')
        batch_id = request.query_params.get('batch_id')

        if institute_id:
            dashboard_courses = user.dashboard_courses.filter(
                admins=user, 
                institutes__id=institute_id,
                linked_institute=None  # Exclude courses linked to another institute
            )
        elif batch_id:
            dashboard_courses = user.dashboard_courses.filter(
                admins=user, 
                linked_batch=None  # Exclude courses linked to another batch
            )
        else:
            dashboard_courses = user.dashboard_courses.filter(admins=user)

        serializer = AdminListCourseSerializer(dashboard_courses, many=True)
        return Response(serializer.data)


class AddAdminToCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CourseAdminsAddSerializer(data=request.data)
        if serializer.is_valid():
            admin_ids = serializer.validated_data['admin_ids']
            admins = User.objects.filter(id__in=admin_ids)

            # Add teachers to the course
            course.admins.add(*admins)
            for admin in admins:
                admin.dashboard_courses.add(course);
                admin.save()
            course.save()

            return Response({"message": "Teachers added to the course successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RemoveAdminFromCourseView(APIView):
    def post(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Validate the input data using a serializer
        serializer = CourseAdminsRemoveSerializer(data=request.data)
        if serializer.is_valid():
            admin_ids = serializer.validated_data['admin_ids']
            admins = User.objects.filter(id__in=admin_ids)
            #admins_to_remove = [admin for admin in admins if admin not in course.teachers.all()]
            admins_to_remove = [admin for admin in admins if admin not in course.teachers.all() and admin != course.creater]

            # Remove teachers from the course
            course.admins.remove(*admins)
            for admin in admins_to_remove:
                admin.dashboard_courses.remove(course);
                admin.save();
            course.save()

            return Response({"message": "Teachers removed from the course successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetTeachersForCourseView(APIView):
    def get(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)
        
        # Get the teachers associated with the course
        teachers = course.teachers.all()
        
        # Serialize the teacher data
        serializer = TeacherSerializer(teachers, many=True)
        
        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
      


class GetAdminsForCourseView(APIView):
    def get(self, request, course_id):
        # Fetch the course object
        course = get_object_or_404(Course, id=course_id)

        # Get the teachers associated with the course
        admins = course.admins.all()

        # Serialize the teacher data
        serializer = TeacherSerializer(admins, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)




class SearchCourseView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        # Get the search term and class search term from the query parameters
        search_term = self.request.query_params.get('q', '').strip()
        class_search_term = self.request.query_params.get('class', '').strip()

        # Initialize an empty query
        query = Q()

        # If a general search term is provided, filter by courseShortName or courseFullName
        if search_term:
            query |= Q(courseShortName__istartswith=search_term) | Q(courseFullName__istartswith=search_term)

        # If a class search term is provided, filter by designedFor's name
        if class_search_term:
            query &= Q(designedFor__name__icontains=class_search_term)

        # If any part of the query has been built, evaluate it, otherwise return an empty queryset
        if query:
            return Course.objects.filter(query)
        else:
            return Course.objects.none()
    
class CourseEnrollmentCountView(APIView):
    def get(self, request, course_id, format=None):
        # Retrieve the course by the given course_id or return a 404 error if not found
        course = get_object_or_404(Course, pk=course_id)
        
        # Count the number of enrolled students
        enrolled_students_count = course.enrolled_students.count()

         # Count the number of enrollment requests
        enrollment_requests_count = course.enrolement_requests.count()

        # Create the response data
        response_data = {
            'course_id': course_id,
            'course_name': course.courseShortName,
            'enrolled_students_count': enrolled_students_count,
            'enrollment_requests_count': enrollment_requests_count
        }
        
        return Response(response_data, status=status.HTTP_200_OK)

class CustomPagination(PageNumberPagination):
    page_size = 500  # Default page size
    page_size_query_param = 'page_size'
    max_page_size = 1000

class CourseMemberListView(APIView):
    def get(self, request, course_id):
        # Get the course object
        course = get_object_or_404(Course, pk=course_id)
        
        # Get query parameters
        is_member = request.query_params.get('is_member', None)
        role = request.query_params.get('role', None)
        
        # Initialize members list
        members = User.objects.all()  # Fetch all users
        
        # Apply role filter if provided
        if role:
            if role == 'teacher':
                members = members.filter(allcourse_teachers=course)
            elif role == 'student':
                members = members.filter(enrolled_students=course)
            else:
                members = members.filter(
                    Q(allcourse_teachers=course) |
                    Q(enrolled_students=course)
                )
        
        # Apply is_member filter if provided
        if is_member is not None:
            is_member = is_member.lower() == 'true'
            if is_member:
                members = members.filter(enrolled_students=course)
            else:
                members = members.exclude(enrolled_students=course)
        
        # Paginate the members
        paginator = CustomPagination()
        paginated_members = paginator.paginate_queryset(members, request)
        
        # Serialize the members
        member_serializer = UserSerializer(paginated_members, many=True)
        
        # Serialize the course details
        course_serializer = CourseMemberSerializer(course)
        
        # Combine course details and members
        response_data = {
            'course': course_serializer.data,
            'members': member_serializer.data
        }
        
        return paginator.get_paginated_response(response_data)
    
class EnrolmentRequestListView(APIView):
    def get(self, request, course_id):
        # Get the course object
        course = get_object_or_404(Course, pk=course_id)
        
        # Get the enrollment requests
        enrolment_requests = course.enrolement_requests.all()
        
        # Paginate the requests
        paginator = CustomPagination()
        paginated_requests = paginator.paginate_queryset(enrolment_requests, request)
        
        # Serialize the requests
        request_serializer = UserSerializer(paginated_requests, many=True)
        
        # Serialize the course details
        course_serializer = CourseMemberSerializer(course)
        
        # Combine course details and enrollment requests
        response_data = {
            'course': course_serializer.data,
        }
        
        return paginator.get_paginated_response(response_data)



class CustomSearchPaginationv1(PageNumberPagination):
    page_size = 100  # Set the desired page size here
    page_size_query_param = 'page_size'
    max_page_size = 1000

class UserSearchForAddingPeopleToCourseView(APIView):
    def get(self, request, course_id):
        query = request.GET.get('name', '')
        if not query:
            return Response({"error": "Query parameter 'name' is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all users in the course as teachers, students, admins, or creators
        excluded_users = course.teachers.all() | course.enrolled_students.all() | course.admins.all()
        if course.creater:
            excluded_users |= User.objects.filter(id=course.creater.id)

        # Search users by first name or last name and exclude the above users
        users = User.objects.filter(
            (Q(firstname__icontains=query) | Q(lastname__icontains=query))
            & ~Q(id__in=excluded_users)
        )

        # Set up pagination
        paginator = CustomSearchPaginationv1()
        paginated_users = paginator.paginate_queryset(users, request, view=self)

        serializer = UserSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)

class UserSearchForAddingTeacherToCourseView(APIView):
    def get(self, request, course_id):
        query = request.GET.get('name', '')
        if not query:
            return Response({"error": "Query parameter 'name' is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all users in the course as teachers, students, admins, or creators
        excluded_users = course.teachers.all() | course.enrolled_students.all() 
        #if course.creater:
        #    excluded_users |= User.objects.filter(id=course.creater.id)

        # Search users by first name or last name and exclude the above users
        users = User.objects.filter(
            (Q(firstname__icontains=query) | Q(lastname__icontains=query) |  Q(username__icontains=query))
            & ~Q(id__in=excluded_users)
        )

        # Set up pagination
        paginator = CustomSearchPaginationv1()
        paginated_users = paginator.paginate_queryset(users, request, view=self)

        serializer = UserSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)


class UserSearchForAddingAdminToCourseView(APIView):
    def get(self, request, course_id):
        query = request.GET.get('name', '')
        if not query:
            return Response({"error": "Query parameter 'name' is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all users in the course as teachers, students, admins, or creators
        excluded_users =  course.admins.all() | course.teachers.all() | course.enrolled_students.all() 
        #if course.creater:
        #    excluded_users |= User.objects.filter(id=course.creater.id)

        # Search users by first name or last name and exclude the above users
        users = User.objects.filter(
            (Q(firstname__icontains=query) | Q(lastname__icontains=query) | Q(username__icontains=query))
            & ~Q(id__in=excluded_users)
        )

        # Set up pagination
        paginator = CustomSearchPaginationv1()
        paginated_users = paginator.paginate_queryset(users, request, view=self)

        serializer = UserSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)




class UserSearchForAddingStudentToCourseView(APIView):
    def get(self, request, course_id):
        query = request.GET.get('name', '')
        if not query:
            return Response({"error": "Query parameter 'name' is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all users in the course as teachers, students, admins, or creators
        excluded_users = course.teachers.all() | course.enrolled_students.all() | course.admins.all()
        #if course.creater:
        #    excluded_users |= User.objects.filter(id=course.creater.id)

        # Search users by first name or last name and exclude the above users
        users = User.objects.filter(
            (Q(firstname__icontains=query) | Q(lastname__icontains=query) | Q(username__icontains=query))
            & ~Q(id__in=excluded_users)
        )

        # Set up pagination
        paginator = CustomSearchPaginationv1()
        paginated_users = paginator.paginate_queryset(users, request, view=self)

        serializer = UserSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)















'''
class UserSearchForAddingPeopleToCourseView(APIView):
    def get(self, request, course_id):
        query = request.GET.get('name', '')
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        course = Course.objects.get(id=course_id)
        
        # Get all users in the course as teachers, students, admins, or creators
        excluded_users = course.teachers.all() | course.enrolled_students.all() | course.admins.all()
        if course.creater:
            excluded_users |= User.objects.filter(id=course.creater.id)
        
        # Search users by first name or last name and exclude the above users
        users = User.objects.filter(
            (Q(firstname__icontains=query) | Q(lastname__icontains=query))
            & ~Q(id__in=excluded_users)
        )

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
'''





