from rest_framework import serializers
from .models import Class
import datetime
from course.models import  Course, VideoObject, FileObject, CourseLink
from syllabus.models import Topic
from django.utils import timezone
from django.contrib.auth import get_user_model
from institute.models import Attendance
User = get_user_model()


class ClassSerializer2(serializers.ModelSerializer):
    class Meta:
        fields = ('id','statusOptions','course','serialNo','classStatus','datetime','datetime','duration','meetingLink','address','chapter','topics', 'creator')
        model = Class
        depth=1
    def create(self, validated_data):
        topics = validated_data.pop('topics', None)
        instance = Class.objects.create(**validated_data)
        CourseObj = validated_data["course"]
        CourseObj.classes.add(instance)
        instance.save()
        return instance


class TopicsSerializer(serializers.ModelSerializer):
     class Meta:
         fields = ('id','name')
         model = Topic

class ClassSerializer(serializers.ModelSerializer):
    topics = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    course = serializers.CharField(write_only=True)
    creator = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), required=False)

    class Meta:
        fields = ('id', 'serialNo', 'course', 'datetime', 'duration', 'status', 'meetingLink', 'topics', 'about', 'address', 'creator')
        model = Class

    def create(self, validated_data):
        topics = validated_data.pop('topics', None)
        course_id = validated_data.pop('course')
        creator = validated_data.pop('creator', None)
        
        course_obj = Course.objects.get(pk=int(course_id))
        
        instance = Class.objects.create(creator=creator, **validated_data)
        instance.topics.set(topics)
        
        instance.courseId = course_obj.id
        instance.save()
        course_obj.classes.add(instance)
        course_obj.save()
        
        # Create attendance records for all enrolled students
        enrolled_students = course_obj.enrolled_students.all()
        today = timezone.now().date()
        attendances_to_create = []
        for student in enrolled_students:
            if not Attendance.objects.filter(course=course_obj, class_session=instance, member=student, start_date=today, end_date=today).exists():
                attendances_to_create.append(
                    Attendance(
                        course=course_obj,
                        class_session=instance,
                        member=student,
                        attendance_date=timezone.now(),
                        start_date=today,
                        end_date=today,
                        status='na',
                    )
                )
        
        if attendances_to_create:
            Attendance.objects.bulk_create(attendances_to_create)
        
        return instance

class ShortCourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','courseShortName','courseGlobalCode','courseLocalCode')
        model = Course

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'firstname','lastname','username', 'email','phoneno','profile_image')

class GetClassSerializer(serializers.ModelSerializer):
      courseId = serializers.SerializerMethodField()
      courseName = serializers.SerializerMethodField()
      topics = TopicsSerializer(many=True)
      teachers = serializers.SerializerMethodField()
      datetime = serializers.SerializerMethodField()
      syllabusId = serializers.SerializerMethodField()
      creator = TeacherSerializer()
      class Meta:
           fields = ('id','serialNo','datetime','courseId','courseName','duration','status','meetingLink', 'topics','about','address','teachers','syllabusId', 'creator')
           model = Class

      def get_courseId(self, instance):
         return instance.courseId
       
      def get_syllabusId(self, instance):
         return instance.syllabusId

      def get_courseName(self, instance):
         return instance.courseName 

      def get_teachers(self, instance):
        teachers_queryset = instance.teachers.all()
        return TeacherSerializer(teachers_queryset, many=True).data
      def get_datetime(self, instance):
          return instance.datetime


class GetCourseClassSerializer(serializers.ModelSerializer):
      topics = TopicsSerializer(many=True)
      datetime = serializers.SerializerMethodField()
      creator = TeacherSerializer()
      class Meta:
           fields = ('id','serialNo','datetime','duration','status','meetingLink', 
                     'topics','about','address', 'creator')
           model = Class


      def get_datetime(self, instance):
          return instance.datetime

class VideoSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','link','description')
          model = VideoObject

class LinkSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','link','description')
          model = CourseLink

class FileObjectSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','displayname','description','fileaddress')
          model = FileObject

class CourseSerializerForClass(serializers.ModelSerializer):
     creater = TeacherSerializer()
     teachers = TeacherSerializer(many=True)
     class Meta:
         fields = ('id','creater', 'teachers')
         model = Course

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'firstname', 'lastname', 'email', 'profile_image')

class GetClassDetailSerializer(serializers.ModelSerializer):
      datetime = serializers.SerializerMethodField()
      topics = TopicsSerializer(many=True)
      videos = VideoSerializer(many=True)
      links = LinkSerializer(many=True)
      files = FileObjectSerializer(many=True)
      teachers = serializers.SerializerMethodField()
      syllabusId = serializers.SerializerMethodField()
      course = serializers.SerializerMethodField()
      creator = UserSerializer()
      
      class Meta:
           fields = ('id','serialNo','datetime','duration','status','meetingLink', 'topics','about','address','videos','links','files','teachers','syllabusId','course','creator')
           model = Class

      def get_datetime(self, instance):
        user_timezone = self.context.get('user_timezone', timezone.utc)
        return instance.datetime.astimezone(user_timezone).isoformat()

      def get_teachers(self, instance):
          courseObj = Course.objects.get(pk=int(instance.courseId))
          teachers = courseObj.teachers.all()
          return TeacherSerializer(teachers, many=True).data
  
      def get_syllabusId(self, instance):
          try:
             courseObj = Course.objects.get(pk=int(instance.courseId))
             return courseObj.syllabus.id
          except Course.DoesNotExist:
              return None

      def get_course(self, instance):
          try:
             courseObj = Course.objects.get(pk=int(instance.courseId))
             
             return CourseSerializerForClass(courseObj).data
          except Course.DoesNotExist:
              return None 
             
class EditClassSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), required=False)
    class Meta:
        fields = ('id','serialNo','datetime','duration','status','meetingLink', 'topics','about','address', 'creator')
        model = Class

class GetWeekClassesSerializer(serializers.Serializer):
    day = serializers.CharField()
    classes = GetClassSerializer(many=True)



class ClassMultiCreateSerializer(serializers.ModelSerializer):
    startdate = serializers.DateField(write_only=True)
    enddate = serializers.DateField(write_only=True)
    checkedMon = serializers.BooleanField(write_only=True)
    mondaytime = serializers.TimeField(write_only=True)
    mondayduration = serializers.IntegerField(write_only=True)
    checkedTues = serializers.BooleanField(write_only=True)
    tuesdaytime = serializers.TimeField(write_only=True)
    tuesdayduration = serializers.IntegerField(write_only=True)
    checkedWed = serializers.BooleanField(write_only=True)
    wednesdaytime = serializers.TimeField(write_only=True)
    wednesdayduration = serializers.IntegerField(write_only=True)
    checkedThurs = serializers.BooleanField(write_only=True)
    thursdaytime = serializers.TimeField(write_only=True)
    thursdayduration = serializers.IntegerField(write_only=True)
    checkedFri = serializers.BooleanField(write_only=True)
    fridaytime = serializers.TimeField(write_only=True)
    fridayduration = serializers.IntegerField(write_only=True)
    checkedSat = serializers.BooleanField(write_only=True)
    saturdaytime = serializers.TimeField(write_only=True)
    saturdayduration = serializers.IntegerField(write_only=True)
    checkedSun = serializers.BooleanField(write_only=True)
    sundaytime = serializers.TimeField(write_only=True)
    sundayduration = serializers.IntegerField(write_only=True)
    
    class Meta:
        fields = ('id','courseId','serialNo','classStatus','classdate','classtime','datetime','duration','meetingLink','address','chapter','topics',
                'startdate','enddate',
                'checkedMon','mondaytime','mondayduration',
                'checkedTues','tuesdaytime','tuesdayduration',
                'checkedWed','wednesdaytime','wednesdayduration',
                'checkedThurs','thursdaytime','thursdayduration',
                'checkedFri','fridaytime','fridayduration',
                'checkedSat','saturdaytime','saturdayduration',
                'checkedSun','sundaytime','sundayduration',)
        model = Class
  
    def create(self, validated_data):
        startDate = validated_data.pop('startdate', None)
        endDate = validated_data.pop('enddate', None)
        checkedMon = validated_data.pop('checkedMon', None)
        mondayTime = validated_data.pop('mondaytime', None)
        mondayDuration = validated_data.pop('mondayduration', None)
        checkedTues = validated_data.pop('checkedTues', None)
        tuesdayTime = validated_data.pop('tuesdaytime', None)
        tuesdayDuration = validated_data.pop('tuesdayduration', None)

        checkedWed = validated_data.pop('checkedWed', None)
        wednesdayTime = validated_data.pop('wednesdaytime', None)
        wednesdayDuration = validated_data.pop('wednesdayduration', None)

        checkedThurs = validated_data.pop('checkedThurs', None)
        thursdayTime = validated_data.pop('thursdaytime', None)
        thursdayDuration = validated_data.pop('thursdayduration', None)

        checkedFri = validated_data.pop('checkedFri', None)
        fridayTime = validated_data.pop('fridaytime', None)
        fridayDuration = validated_data.pop('fridayduration', None)

        checkedSat = validated_data.pop('checkedSat', None)
        saturdayTime = validated_data.pop('saturdaytime', None)
        saturdayDuration = validated_data.pop('saturdayduration', None)

        checkedSun = validated_data.pop('checkedSun', None)
        sundayTime = validated_data.pop('sundaytime', None)
        sundayDuration = validated_data.pop('sundayduration', None)
        topics = validated_data.pop('topics', None)
        #print ("validated_data:  ",validated_data)
        instance1 = Class()
        #instance2 = Class.objects.create(**validated_data)
        delta = datetime.timedelta(days=1)
        startDate_=startDate
        endDate_=endDate
        while startDate_ <= endDate_:
            if checkedMon and startDate_.strftime("%A")=="Monday":                    
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = mondayTime
                instance1.duration = mondayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

        startDate_= startDate
        endDate_= endDate
        #for tuesday 
        while startDate_ <= endDate_:
            if checkedTues and startDate_.strftime("%A")=="Tuesday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = tuesdayTime
                instance1.duration = tuesdayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

        #for wednesday
        startDate_= startDate
        endDate_= endDate
        while startDate_ <= endDate_:
            print ("for wednes: ", startDate_)
            print ("checkedWed: ",checkedWed)
            if checkedWed and startDate_.strftime("%A")=="Wednesday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = wednesdayTime
                instance1.duration = wednesdayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta
        
        #for thursday
        startDate_= startDate
        endDate_= endDate
        while startDate_ <= endDate_:
            print ("for thurs: ", startDate_)
            if checkedWed and startDate_.strftime("%A")=="Thursday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = thursdayTime
                instance1.duration = thursdayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

        
        #for friday
        startDate_= startDate
        endDate_= endDate
        while startDate_ <= endDate_:
            print ("for fri: ", startDate_)
            if checkedFri and startDate_.strftime("%A")=="Friday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = fridayTime
                instance1.duration = fridayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

        #for saturday
        startDate_= startDate
        endDate_= endDate
        while startDate_ <= endDate_:
            print ("for sat: ", startDate_)
            if checkedSat and startDate_.strftime("%A")=="Saturday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = saturdayTime
                instance1.duration = saturdayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

        #for sunday
        startDate_= startDate
        endDate_= endDate
        while startDate_ <= endDate_:
            print ("for sun: ", startDate_)
            if checkedSun and startDate_.strftime("%A")=="Sunday":
                instance1 = Class.objects.create(**validated_data)
                instance1.classdate = startDate_
                instance1.classtime = sundayTime
                instance1.duration = sundayDuration
                instance1.save()
                course_id = instance1.courseId
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.classes.add(instance1)
            startDate_ += delta

            # Create attendance records for all enrolled students
            enrolled_students = CourseObj.enrolled_students.all()
            today = timezone.now().date()
            attendances_to_create = []
            
            for student in enrolled_students:
                if not Attendance.objects.filter(course=CourseObj, class_session=instance1, member=student, start_date=today, end_date=today).exists():
                    attendances_to_create.append(
                        Attendance(
                            course=CourseObj,
                            class_session=instance1,
                            member=student,
                            attendance_date=timezone.now(),
                            start_date=today,
                            end_date=today,
                            status='na',
                            # approver_status='pending'
                        )
                    )
            
            if attendances_to_create:
                Attendance.objects.bulk_create(attendances_to_create)

        return instance1
        #return super().create(validated_data)









class AddYoutubeVideoToClassSerializer(serializers.ModelSerializer):
      name = serializers.CharField(write_only=True)
      link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','link','description')
          model = Class

      def update(self, instance, validated_data):
        newVideoObj = VideoObject.objects.create(**validated_data)
        instance.videos.add(newVideoObj)
        courseObj = Course.objects.get(pk=int(instance.courseId))
        courseObj.videos.add(newVideoObj)
        courseObj.save()
        instance.save()
        return instance




class AddFileToClassSerializer(serializers.ModelSerializer):
      displayname = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      fileaddress = serializers.FileField(write_only=True)
      class Meta:
          fields = ('id','displayname','description','fileaddress')
          model = Class
      def update(self, instance, validated_data):
          newFileObj = FileObject.objects.create(**validated_data)
          instance.files.add(newFileObj)
          instance.save()
          courseObj = Course.objects.get(pk=int(instance.courseId))
          courseObj.coursefiles.add(newFileObj)
          courseObj.save()
          return instance        


class AddLinkToClassSerializer(serializers.ModelSerializer):
      name = serializers.CharField(write_only=True)
      link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','link','description')
          model = Class

      def update(self, instance, validated_data):
        newLinkObj = CourseLink.objects.create(**validated_data)
        instance.links.add(newLinkObj)
        courseObj = Course.objects.get(pk=int(instance.courseId))
        courseObj.courselinks.add(newLinkObj)
        courseObj.save()
        instance.save()
        return instance











