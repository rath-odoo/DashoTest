from rest_framework import serializers
from .models import CourseDesignedFor,Course, Subject, EducationBoard, VideoObject, CourseLink, FileObject
from syllabus.models import Syllabus
from itertools import chain
from eclass.serializers import ClassSerializer, GetClassSerializer, GetCourseClassSerializer
from meeting.serializers import MeetingSerializer
from django.contrib.auth import get_user_model
from rest_framework import filters
User = get_user_model()
from tickets.models import AllCategoriesOfCourse,Category #ticket categories 
from chat.models import ChatGroup
from institute.models import Institute, InstituteMembership, Batch


class CourseDesignedForSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name','boardofeducation')
        model = CourseDesignedFor

class TeacherSerializer(serializers.ModelSerializer):
     usertitle= serializers.ReadOnlyField(source='usertitle.name')
     class Meta:
         fields = ('id', 'usertitle','username', 'firstname','lastname','profile_image')
         model = User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'profile_image']

class CourseSerializer(serializers.ModelSerializer):
    designedFor = serializers.SerializerMethodField()
    classsection = serializers.SerializerMethodField()
    classes = GetCourseClassSerializer(many=True)
    meetings = MeetingSerializer(many=True)
    creater = TeacherSerializer()
    teachers = serializers.SerializerMethodField()
    admins = serializers.SerializerMethodField()
    class Meta:
        fields = ('id','designedFor','classsection','courseShortName','courseFullName',
                  'courseGlobalCode','courseLocalCode','courseStatus','courseStartDate', 
                  'courseEndDate','educationboard','subject','abouttheCourse','instituteName',
                  'instituteCity','instituteCountry','enrolled_students','enrolement_requests',
                  'creater','teachers','admins','syllabus','classes','meetings','noticeobjects',
                  'coursecredit','videos','card_cover_image','published') 
        model = Course
        
    def get_designedFor(self, instance):
        return instance.designedFor.name
    def get_classsection(self, instance):
        if instance.classsection is None:
            return None
        return instance.classsection.name
    def get_teachers(self,instance):
          teachers = instance.teachers.all()
          if teachers.exists():
             serializer = TeacherSerializer(teachers, many=True)
             return serializer.data
          return None

    def get_admins(self,instance):
          admins = instance.admins.all()
          if admins.exists():
             serializer = TeacherSerializer(admins, many=True)
             return serializer.data
          return None




class CourseSerializerSummary(serializers.ModelSerializer):
    designedFor = serializers.SerializerMethodField()
    classsection = serializers.SerializerMethodField()
    #classes = ClassSerializer(many=True)
    #meetings = MeetingSerializer(many=True)
    creater = TeacherSerializer()
    teachers = serializers.SerializerMethodField()
    class Meta:
        fields = ('id','designedFor','classsection','courseShortName','courseFullName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate', 'courseEndDate','educationboard','subject','abouttheCourse','instituteName','instituteCity','instituteCountry','enrolled_students','enrolement_requests','creater','teachers','syllabus','coursecredit','videos','card_cover_image','published')
        model = Course
    def get_designedFor(self, instance):
        return instance.designedFor.name
    def get_classsection(self, instance):
        if instance.classsection is None:
            return None
        return instance.classsection.name
    def get_teachers(self,instance):
          teachers = instance.teachers.all()
          if teachers.exists():
             serializer = TeacherSerializer(teachers, many=True)
             return serializer.data
          return None

    #def create(self, validated_data):
    #    #print ("course creation data", validated_data)
    #    classesData = validated_data.pop('classes')
    #    meetingsData = validated_data.pop('meetings')
    #    instance = Course.objects.create(**validated_data)
    #    teacherObj = instance.teacher
    #    teacherObj.dashboard_courses.add(instance)
    #    return instance

class DashboardCourseEditSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','courseShortName','courseLocalCode','courseStatus','courseStartDate', 'courseEndDate','abouttheCourse','instituteName','coursecredit','designedFor','classsection','educationboard','subject')
          model = Course

class AddYoutubeVideoSerializer(serializers.ModelSerializer):
      name = serializers.CharField(write_only=True)
      link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','link','description')
          model = Course

      def update(self, instance, validated_data):
        newVideoObj = VideoObject.objects.create(**validated_data)
        instance.videos.add(newVideoObj)
        instance.save()
        return instance

class GetYoutubeVideoSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','link','description')
          model = VideoObject
          
      
class GetCourseFileSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','displayname','fileaddress','description')
          model = FileObject

class AddCourseLinkSerializer(serializers.ModelSerializer):
      name = serializers.CharField(write_only=True)
      link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','link','description')
          model = Course

      def update(self, instance, validated_data):
        newLinkObj = CourseLink.objects.create(**validated_data)
        instance.courselinks.add(newLinkObj)
        instance.save()
        return instance

class AddCourseFileSerializer(serializers.ModelSerializer):
      displayname = serializers.CharField(write_only=True)
      fileaddress = serializers.FileField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','displayname','fileaddress','description')
          model = Course
      def update(self, instance, validated_data):
          newFileObj = FileObject.objects.create(**validated_data)
          instance.coursefiles.add(newFileObj)
          instance.save()
          return instance

class GetCourseLinkSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'link', 'description')
        model = CourseLink

class CoursePeopleAddSerializer(serializers.Serializer):
    PEOPLE_ROLES = (
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('enrollment_request', 'Enrollment Request'),
    )
    
    people = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )
    role = serializers.ChoiceField(choices=PEOPLE_ROLES)

    def validate_people(self, value):
        # Check that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value


class CourseTeachersAddSerializer(serializers.Serializer):
    teacher_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
        required=True
    )

    def validate_people(self, value):
        # Check that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value




class CourseAdminsAddSerializer(serializers.Serializer):
    admin_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
        required=True
    )

    def validate_people(self, value):
        # Check that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value







class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'profile_image']

# not used, following will be depreciated
#class CourseCreateSerializer(serializers.ModelSerializer):
#    designedFor = serializers.SerializerMethodField()
#    classsection = serializers.SerializerMethodField()
#    class Meta:
#        fields = ('id','designedFor','classsection','courseShortName','courseFullName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate', 'courseEndDate','educationboard','subject','abouttheCourse','instituteName','instituteCity','instituteCountry','enrolled_students','enrolement_requests','teacher','syllabus')
#        model = Course
#    def get_designedFor(self, instance):
#        return instance.designedFor.name
#    def get_classsection(self, instance):
#        if instance.classsection is None:
#            return None
#        return instance.classsection.name
#
#    def create(self, validated_data):
#        #print ("course creation data", validated_data)
#        instance = Course.objects.create(**validated_data)
#        teacherObj = instance.teacher
#        teacherObj.dashboard_courses.add(instance)
#        return instance



#to be depreciated, will not work because of teacher variable 
class CreateCourseSerializer(serializers.ModelSerializer):
    designedFor = serializers.SerializerMethodField()
    #classsection = serializers.SerializerMethodField()
    class Meta:
        fields = ('id','teacher','designedFor','courseShortName','courseFullName','courseLocalCode','courseStartDate', 'courseEndDate','educationboard','subject','abouttheCourse','instituteName','instituteCity','instituteCountry')
        model = Course
    def get_designedFor(self, instance):
        return instance.designedFor.name
    #def get_classsection(self, instance):
    #    if instance.classsection is None:
    #        return None
    #    return instance.classsection.name

    def create(self, validated_data):
        print ("**course creation data", validated_data)
        instance = Course.objects.create(**validated_data)
        #syllabusData={   "name": "asj","classname": None}
        #syllabusInstance = Syllabus.objects.create(**syllabusData)
        print ("created course: ", instance.creater)  
        teacherObj = instance.teacher
        teacherObj.dashboard_courses.add(instance)
        instance.teachers.add(teacherObj)
        #instance.creater.add(teacherObj)
        syllabusName=str(instance.teacher.id)+"_"+str(instance.teacher.username)+"_"+str(instance.courseShortName)
        syllabusData={   "name": syllabusName,"classname": None}        
        syllabusInstance = Syllabus.objects.create(**syllabusData)
        syllabusInstance.creater=teacherObj
        syllabusInstance.save()
        instance.syllabus=syllabusInstance
        val_data = {"name":"Default"}
        ticketDefaultCategory=Category.objects.create(**val_data)
        ticketDefaultCategory.save()
        ticketCatObject_name="CourseId_"+str(instance.id)+"_Cat_"+str(instance.courseShortName)
        val_data_all={"name":ticketCatObject_name}
        ticketAllCatObj = AllCategoriesOfCourse.objects.create(**val_data_all)
        ticketAllCatObj.categories.add(ticketDefaultCategory)
        ticketAllCatObj.save()
        instance.ticketCategories = ticketAllCatObj
        instance.save()

        return instance

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'name']
        
class CreateNewCourseSerializer(serializers.ModelSerializer):
    institutes = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), many=True, required=False)
    batch = serializers.PrimaryKeyRelatedField(queryset=Batch.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Course
        fields = (
            'id', 'creater', 'designedFor', 'courseShortName', 'courseLocalCode', 'courseStartDate', 
            'courseEndDate', 'educationboard', 'subject', 'institutes', 'batch'
        )

    def create(self, validated_data):
        institutes = validated_data.pop('institutes', [])
        batch = validated_data.pop('batch', None)
        creater = validated_data.get('creater')

        print ("validated_data create course: ", validated_data)
        for institute in institutes:
            if not InstituteMembership.objects.filter(
                user=creater,
                institute=institute,
                user_type__name__in=["Owner", "Admin"]
            ).exists():
                raise serializers.ValidationError(
                    f"Creator must be an owner or admin of the institute {institute.name}."
                )

        if batch:
            if not InstituteMembership.objects.filter(
                user=creater,
                institute=batch.institute,
                user_type__name__in=["Owner", "Admin"]
            ).exists():
                raise serializers.ValidationError(
                    f"Creator must be an owner or admin of the institute {batch.institute.name}."
                )

        instance = Course.objects.create(**validated_data)

        # Associate institutes with the course
        instance.institutes.set(institutes)

        if batch:
            instance.batches.add(batch)
            
            # Enroll batch members who are not already enrolled
            for member in batch.users.all():
                if not instance.enrolled_students.filter(id=member.id).exists():
                    instance.enrolled_students.add(member)

        createrObj = instance.creater
        createrObj.dashboard_courses.add(instance)
        instance.teachers.add(createrObj)
        instance.admins.add(createrObj)

        syllabusName = f"{instance.creater.id}_{instance.creater.username}_{instance.courseShortName}"
        syllabusData = {"name": syllabusName, "classname": None}
        syllabusInstance = Syllabus.objects.create(**syllabusData)
        syllabusInstance.creater = createrObj
        syllabusInstance.save()
        instance.syllabus = syllabusInstance

        val_data = {"name": "Default"}
        ticketDefaultCategory = Category.objects.create(**val_data)
        ticketDefaultCategory.save()

        ticketCatObject_name = f"CourseId_{instance.id}_Cat_{instance.courseShortName}"
        val_data_all = {"name": ticketCatObject_name}
        ticketAllCatObj = AllCategoriesOfCourse.objects.create(**val_data_all)
        ticketAllCatObj.categories.add(ticketDefaultCategory)
        ticketAllCatObj.save()

        instance.ticketCategories = ticketAllCatObj
        instance.save()

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.batches.exists():
            representation['batch'] = BatchSerializer(instance.batches.first()).data
        return representation


class CourseSerializerEnrollRequest(serializers.ModelSerializer):
    class Meta:
        fields =('id','enrolement_requests')
        model = Course

def ChatGroupExists( NewUser, EnrolledUser ):
    groupExists=False
    MatchedChatGroup=None
    groupExists_InNewUser=False
    MatchedChatGroup_InNewUser=None
    groupExists_InEnrolledUser=False
    MatchedChatGroup_InEnrolledUser=None

    for ChatGroup in EnrolledUser.generalchatgroups.all():
         if NewUser in ChatGroup.groupuserObjects.all():
            groupExists_InEnrolledUser=True
            MatchedChatGroup_InEnrolledUser=ChatGroup
    for ChatGroup in NewUser.generalchatgroups.all():
         if EnrolledUser in ChatGroup.groupuserObjects.all():
            groupExists_InNewUser=True
            MatchedChatGroup_InNewUser=ChatGroup

    if groupExists_InNewUser==groupExists_InEnrolledUser and MatchedChatGroup_InNewUser == MatchedChatGroup_InEnrolledUser:
         groupExists=groupExists_InNewUser
         MatchedChatGroup=MatchedChatGroup_InNewUser
    if groupExists_InNewUser==True and groupExists_InEnrolledUser==False:
        EnrolledUser.generalchatgroups.add(MatchedChatGroup_InNewUser)
        groupExists_InEnrolledUser=True
    if groupExists_InNewUser==False and groupExists_InEnrolledUser==True:
        NewUser.generalchatgroups.add(MatchedChatGroup_InEnrolledUser)
        groupExists_InNewUser=True    

    return groupExists, MatchedChatGroup        

def AddChatGroup(instance, requesterObj, EnrolledUserObject, groupExists, MatchedChatGroup):
    if groupExists == True and MatchedChatGroup != None and MatchedChatGroup.groupType=="oneoone":
        instance.coursechatgroups.add(MatchedChatGroup)
    if groupExists == False and MatchedChatGroup ==None:
        val_data = {"name":group_name,"groupType":"oneoone"}
        newChatGroup = ChatGroup.objects.create(**val_data)
        newChatGroup.groupuserObjects.add(requesterObj)
        newChatGroup.groupuserObjects.add(EnrolledUserObject)
        newChatGroup.save()
        requesterObj.generalchatgroups.add(newChatGroup)
        requesterObj.save()
        EnrolledUserObject.generalchatgroups.add(newChatGroup)
        EnrolledUserObject.save()
        instance.coursechatgroups.add(newChatGroup)

class CourseSerializerEnroll(serializers.ModelSerializer):
    #requesterId = serializers.SerializerMethodField()  
    requesterId = serializers.IntegerField(write_only=True)
    class Meta:
        fields =['id','requesterId']
        model = Course

    def update(self, instance, validated_data):
        #requesterObj=enrolled_students
        requesterId_ = validated_data['requesterId']
        requesterObj = User.objects.get(pk=requesterId_)
        instance.enrolled_students.add(requesterObj)        
        instance.enrolement_requests.remove(requesterObj)
        #groupExists, MatchedChatGroup = ChatGroupExists(requesterObj, instance.creater)
        #if groupExists == True and MatchedChatGroup != None and MatchedChatGroup.groupType=="oneoone":
        #    instance.coursechatgroups.add(MatchedChatGroup)
        #if groupExists == False and MatchedChatGroup ==None:
        #              userId1=instance.creater.id
        #              userId2=requesterObj.id
        #              maxUserId=max(userId1, userId2)
        #              minUserId=min(userId1, userId2)
        #              group_name="a"+str(maxUserId)+"a"+str(minUserId)+"a"
        #              val_data = {"name":group_name,"groupType":"oneoone"}
        #              newChatGroup = ChatGroup.objects.create(**val_data)
        #              newChatGroup.groupuserObjects.add(requesterObj)
        #              newChatGroup.groupuserObjects.add(instance.teacher)
        #              newChatGroup.save()
        #              requesterObj.generalchatgroups.add(newChatGroup)
        #              requesterObj.save()
        #              instance.teacher.generalchatgroups.add(newChatGroup)
        #              instance.teacher.save()
        #              instance.coursechatgroups.add(newChatGroup)    

        merged_teachersstudent = list(chain(instance.teachers.all(), instance.enrolled_students.all()))
        for EnrolledUserObject in merged_teachersstudent:   #instance.enrolled_students.all():
            print ("new,enrolled: ", requesterObj,"--",EnrolledUserObject)
            if EnrolledUserObject !=requesterObj:
               groupExists, MatchedChatGroup = ChatGroupExists(requesterObj, EnrolledUserObject)               
               if groupExists == True and MatchedChatGroup != None and MatchedChatGroup.groupType=="oneoone":                    
                      instance.coursechatgroups.add(MatchedChatGroup)
               if groupExists == False and MatchedChatGroup ==None:
                      userId1=EnrolledUserObject.id
                      userId2=requesterObj.id
                      maxUserId=max(userId1, userId2)
                      minUserId=min(userId1, userId2)
                      group_name="a"+str(maxUserId)+"a"+str(minUserId)+"a"

                      val_data = {"name":group_name,"groupType":"oneoone"} 
                      newChatGroup = ChatGroup.objects.create(**val_data)
                      newChatGroup.groupuserObjects.add(requesterObj)
                      newChatGroup.groupuserObjects.add(EnrolledUserObject)
                      newChatGroup.save()
                      requesterObj.generalchatgroups.add(newChatGroup)
                      requesterObj.save()
                      EnrolledUserObject.generalchatgroups.add(newChatGroup)
                      EnrolledUserObject.save()
                      instance.coursechatgroups.add(newChatGroup)
        instance.save()           
        return instance


class CourseSerializerEnrollReject(serializers.ModelSerializer):
    #requesterId = serializers.SerializerMethodField()  
    requesterId = serializers.IntegerField(write_only=True)
    class Meta:
        fields =['id','requesterId']
        model = Course

    def update(self, instance, validated_data):
        #requesterObj=enrolled_students
        requesterId_ = validated_data['requesterId']
        requesterObj=User.objects.get(pk=requesterId_)
        #instance.enrolled_students.add(requesterObj)
        instance.enrolement_requests.remove(requesterObj)
        return instance

class CoursePublishSerializer(serializers.ModelSerializer):
      
      class Meta:
          fields = ['id']
          model = Course 

      def update(self, instance, validated_data):
          instance.published =True
          instance.save()
          return instance
  
class CourseUnPublishSerializer(serializers.ModelSerializer):

      class Meta:
          fields = ['id']
          model = Course

      def update(self, instance, validated_data):
          instance.published =False
          instance.save()
          return instance

class CourseSerializerValue(serializers.ModelSerializer):
    class Meta:
        fields = ('id','teacher','courseShortName','courseFullName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate','courseEndDate','designedFor','educationboard','subject','abouttheCourse','instituteName','instituteCity','instituteCountry','enrolled_students','enrolement_requests')
        model = Course
    #def to_representation(self, instance):
        #rep = super().to_representation(instance)
        #rep['subject'] = CourseSerializerValue(instance.subject).data
        #rep['teacher'] = CourseSerializerValue(instance.teacher).data
        #rep = super(CourseSerializerValue, self).to_representation(instance)
        #rep['subject'] = instance.name
        #return rep

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name','classname','board')
        model = Subject
    def to_representation(self, instance):
        rep = super(SubjectSerializer, self).to_representation(instance)
        rep['board'] = instance.board.name
        #rep['classname'] = instance.classname.name
        return rep

class EducationBoardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name')
        model = EducationBoard

class CourseCardImageUploadSerializer(serializers.ModelSerializer):
      class Meta:
         model = Course
         fields = ('id','card_cover_image')

class PublicCourseSearchSerializer(serializers.ModelSerializer):
      association = serializers.SerializerMethodField()
      designedFor = serializers.SerializerMethodField()
      teachers = serializers.SerializerMethodField()
      class Meta:
          model  = Course
          fields = ['id','teachers','courseShortName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate','courseEndDate','designedFor','educationboard','subject','abouttheCourse','instituteName','card_cover_image','association'] 
      def get_teachers(self,instance):
          teachers = instance.teachers.all()
          if teachers.exists():
             serializer = TeacherSerializer(teachers, many=True)
             return serializer.data
          return None
      def get_designedFor(self, instance):
        return instance.designedFor.name

      def get_association(self, instance):
          userObj=self.context['request'].user

          if instance.enrolement_requests.filter(pk=userObj.id).exists():
              return "EnrollRequestSent"
          if instance.enrolled_students.filter(pk=userObj.id).exists():
               return "Learning"
          if instance.teachers.filter(pk=userObj.id).exists():
               return "Teaching"
          
          return "Enroll"

class CoursePeopleRemoveSerializer(serializers.Serializer):
    people = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )

    def validate_people(self, value):
        # Ensure that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value

class CourseTeachersRemoveSerializer(serializers.Serializer):
    teacher_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
        required=True
    )
    def validate_people(self, value):
        # Ensure that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value




class CourseAdminsRemoveSerializer(serializers.Serializer):
    admin_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
        required=True
        )
    def validate_people(self, value):
        # Ensure that all user IDs exist
        users = User.objects.filter(id__in=value)
        if len(users) != len(value):
            raise serializers.ValidationError("Some user IDs do not exist.")
        return value






class CourseMemberSerializer(serializers.ModelSerializer):
    teachers = UserSerializer(many=True, read_only=True)
    enrolled_students = UserSerializer(many=True, read_only=True)
    enrolement_requests = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = [
            'id', 'courseShortName', 'courseFullName', 'courseGlobalCode', 'courseLocalCode',
            'courseStatus', 'courseStartDate', 'courseEndDate', 'designedFor', 'classsection',
            'educationboard', 'subject', 'abouttheCourse', 'instituteName', 'instituteCity',
            'instituteCountry', 'published', 'archived', 'archive_date', 'teachers', 'enrolled_students',
            'enrolement_requests'
        ]



class AdminListCourseSerializer(serializers.ModelSerializer):
      class Meta:
        model = Course
        fields = ['id','courseShortName','admins', 'courseGlobalCode','courseLocalCode','courseStartDate', 'courseEndDate','courseLocalCode','courseStatus']





