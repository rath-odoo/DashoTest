from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .models import Class
from .serializers import ClassSerializer, GetClassSerializer, ClassMultiCreateSerializer, GetWeekClassesSerializer, GetClassDetailSerializer
from .serializers import AddYoutubeVideoToClassSerializer, AddFileToClassSerializer, AddLinkToClassSerializer, EditClassSerializer
from rest_framework import pagination
from course.models import Course
from datetime import datetime, timedelta
from pytz import timezone as pytz_timezone


class ClassView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ClassMultiCreateView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassMultiCreateSerializer

class AllUserClassesSetPagination(pagination.PageNumberPagination):
    page_size = 5
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

class CustomPagination(pagination.PageNumberPagination):
    page_size = 10  # Set your desired page size here
    
class GetAllUserClassView(APIView):
     def get(self, request, format=None):
        user = self.request.user
        courses = user.dashboard_courses.all()
        all_classes = []
        for course in courses:
            classes = course.classes.all()
            for class_obj in classes:
                class_obj.courseId = course.id
                class_obj.syllabusId = course.syllabus.id
                class_obj.courseName = course.courseShortName
                class_obj.teachers = course.teachers
            all_classes.extend(classes)
        paginator = AllUserClassesSetPagination()
        paginated_classes = paginator.paginate_queryset(all_classes, request)
        serializer = GetClassSerializer( paginated_classes, many=True )
        return paginator.get_paginated_response(serializer.data)

#to be corrected. Old class, may be new serializer
class GetCourseClassesView(generics.ListAPIView):
    serializer_class = GetClassSerializer
    pagination_class = AllUserClassesSetPagination

    def get_object(self, courseId):
        try:
            return Course.objects.get(pk=courseId)
        except Course.DoesNotExist:
            raise Http404

    def get_queryset(self):
        courseId = self.kwargs['courseId']
        courseObj=self.get_object(courseId=courseId)
        classObjs=courseObj.classes.all()
        return classObjs


class GetOneClassDetailViewOld(APIView):
    def get_object(self, classId, timezone):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404

    def get(self, request, classId, timezone, format=None):
        Object = self.get_object(classId,timezone)
        serializer = GetClassDetailSerializer(Object)
        user_timezone = pytz_timezone(timezone)
        datetime_str = serializer.data['datetime']
        datetime_obj = parse_datetime(datetime_str)
        if datetime_obj is not None:
            datetime_obj = datetime_obj.astimezone(user_timezone)
            serializer.data['datetime'] = datetime_obj.isoformat()
        return Response(serializer.data)

class GetOneClassDetailView(APIView):
    def get_object(self, classId, timezone):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404

    def get(self, request, classId, timezone, format=None):
        try:
            class_obj = self.get_object(classId, timezone)
            serializer = GetClassDetailSerializer(class_obj, context={'user_timezone': pytz_timezone(timezone)})

            return Response(serializer.data)
        except Http404:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class EditClassDetailView(APIView):

      def get_object(self, classId ):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404

      def put(self, request, classId,format=None):
         Object = self.get_object(classId)
         serializer = EditClassSerializer(Object, data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddYoutubeVideoToClassView(APIView):
      def get_object(self, classId):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404
      def get(self, request, classId, format=None):
        Object = self.get_object(classId)
        serializer = AddYoutubeVideoSerializer(Object)
        return Response(serializer.data)
      def put(self, request, classId, format=None):
        Object = self.get_object(classId)
        serializer = AddYoutubeVideoToClassSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddFileToClassView(APIView):
      def get_object(self, classId):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404
      def put(self, request, classId, format=None):
        Object = self.get_object(classId)
        serializer = AddFileToClassSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddLinkToClassView(APIView):
      def get_object(self, classId):
        try:
            return Class.objects.get(pk=classId)
        except Class.DoesNotExist:
            raise Http404
      def put(self, request, classId, format=None):
        Object = self.get_object(classId)
        serializer = AddLinkToClassSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class UserDayClassesSetPagination(pagination.PageNumberPagination):
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



class GetDayClassesView(APIView):
    def get(self, request, datestring, timezone, format=None):

        print ("posted datestring: timezone: ", datestring,"---",timezone)
        try:
            # Parse the datestring and create a timezone-aware datetime object
            target_year, target_month, target_day = map(int, datestring.split("-"))
            target_datetime = datetime(target_year, target_month, target_day, tzinfo=pytz_timezone(timezone))

            # Calculate the start and end of the 24-hour time interval
            start_datetime = target_datetime
            end_datetime = target_datetime + timedelta(hours=24)
            class_objects = []
            for course in self.request.user.dashboard_courses.all():
                # Query classes within the 24-hour interval
                classes = course.classes.filter(datetime__range=(start_datetime, end_datetime))

                for class_obj in classes:
                    class_obj.courseId = course.id
                    class_obj.syllabusId = course.syllabus.id
                    class_obj.courseName = course.courseShortName
                    class_obj.teachers = course.teachers
                    class_objects.append(class_obj)
            paginator = UserDayClassesSetPagination()
            paginated_classes = paginator.paginate_queryset(class_objects, request)
            serializer = GetClassSerializer(paginated_classes, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserWeekClassesSetPagination(pagination.PageNumberPagination):
    page_size = 500
    page_size_query_param = 'page_size'
    max_page_size = 1000
    def get_paginated_response(self, data):
        return Response({

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class GetWeekClassesView(APIView):
      def get(self, request, startDate, timezone, format=None):      
          try:
              start_year, start_month, start_day = map(int, startDate.split("-"))
              start_datetime = datetime(start_year, start_month, start_day, tzinfo=pytz_timezone(timezone))
              end_datetime = start_datetime + timedelta(days=7)             
              class_objects_by_day = {}
              for course in self.request.user.dashboard_courses.all():
                  classes = course.classes.filter(datetime__range=(start_datetime, end_datetime))
                  for class_obj in classes:
                      class_obj.datetime = class_obj.datetime.astimezone(pytz_timezone(timezone))
                      class_day = class_obj.datetime.strftime('%A')
                      class_objects_by_day.setdefault(class_day, [])
                      class_obj.courseId = course.id
                      class_obj.syllabusId = course.syllabus.id
                      class_obj.courseName = course.courseShortName
                      class_obj.teachers = course.teachers
                      class_objects_by_day[class_day].append(class_obj)
              # Create a list of day names sorted by the order of the days of the week
              days_of_week_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
              sorted_days = sorted(class_objects_by_day.keys(), key=lambda day: days_of_week_order.index(day))

              #class_objects_list = [{'day': day, 'classes': classes} for day, classes in class_objects_by_day.items()]

              class_objects_list = [{'day': day, 'classes': class_objects_by_day[day]} for day in sorted_days]

              paginator = UserWeekClassesSetPagination()
              paginated_classes = paginator.paginate_queryset(class_objects_list, request)
              serializer = GetWeekClassesSerializer(class_objects_list, many=True)
              return paginator.get_paginated_response(serializer.data)
              #return HttpResponse("Condition is met.")
          except Exception as e:
              return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteClassView(APIView):
      def get_object(self, classid):
        try:
            return Class.objects.get(pk=classid)
        except Class.DoesNotExist:
            raise Http404
      def delete(self, request, classid, format=None):
        Object = self.get_object(classid)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)