from rest_framework import serializers
from account.models import Account, EduDegree, Institute, DegreeName, MarkSheet, Certificate, Achievements, Address, UsefullLink
from account.models import HealthData
from account.models import AcademicDetail, Skill, AboutUs, Experience, Publication, LicenseOrCertificate
from course.models import Course
from noticeboard.models import NoticeBoard
from chat.models import ChatGroup
from itertools import chain
from django.db.models import Q
from meeting.models import Meeting
#from rest_framework.permissions import IsAuthenticated
#from django.contrib.auth.models import User, Group
from django.contrib.auth import get_user_model
User = get_user_model()

from accountAPIs.mixins import MessageHandler
import random
from threading import Timer
import requests

from rest_framework_simplejwt.tokens import RefreshToken

import smtplib
from email.mime.text import MIMEText
from django.core.mail import send_mail
#from accountAPIs.tasks import send_email_task
import http.client

from account.models import ParentDetails, ContactRequest

class CustomTokenObtainPairSerializerEmailORPhone(serializers.Serializer):
    email_or_phone = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_or_phone = attrs.get("email_or_phone")
        password = attrs.get("password")

        # Check if the input is an email or phone number
        user = User.objects.filter(Q(email=email_or_phone) | Q(phoneno=email_or_phone)).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(user)

        data = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

        return data



#either email, phoneno or username
class CustomTokenObtainPairSerializer(serializers.Serializer):
    login_identifier = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        login_identifier = attrs.get("login_identifier")
        password = attrs.get("password")

        # Check if the input is a username, email, or phone number
        user = User.objects.filter(
            Q(username=login_identifier) |
            Q(email=login_identifier) |
            Q(phoneno=login_identifier)
        ).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(user)
        
        # Reset deletion related fields if delete request was raised
        if user.is_delete_request_raised:
            user.is_delete_request_raised = False
            user.delete_request_raised_at = None
            user.save(update_fields=['is_delete_request_raised', 'delete_request_raised_at'])

        data = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

        return data


class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstname', 'lastname','usertype','profile_image' ,'name')



class GetUserFromUserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class UsersNameUpdateSerializer(serializers.ModelSerializer):
      class Meta:
        model = User
        fields = ('id', 'firstname','lastname')
class GeneralMeetingsSerializer(serializers.ModelSerializer):
      class Meta:
          model =  User
          fields = ('id','generalmeetings')
          depth =1 
      def get_generalmeetings(self, obj):
        meetings = obj.generalmeetings.all().order_by('-datetime')
        print(f"Ordered meetings: {[(meeting.id, meeting.datetime) for meeting in meetings]}")
        return MeetingSerializer(meetings, many=True).data

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class ContactAddSerializer(serializers.ModelSerializer):
    contactId = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['contactId']
    def update(self, instance, validated_data):
        #print ("add contact validated data: ", validated_data)
        userId = validated_data.pop('contactId', None)
        contactObj = User.objects.get(pk=int(userId));
        instance.contacts.add(contactObj);
        instance.save();
        return instance



class MyContactsSerializer(serializers.ModelSerializer):
      class Meta:
          model = User
          fields = ('id','firstname','lastname','profile_image')





class AchievementsSerializer(serializers.ModelSerializer):
      userId = serializers.CharField(write_only=True)
      class Meta:
           model = Achievements
           fields = ['id','name','description','startDate','endDate','userId']

      def create(self, validated_data):
        userId = validated_data.pop('userId', None)
        instance = Achievements.objects.create(**validated_data);
        instance.save();
        userObj = User.objects.get(pk=int(userId));
        userObj.achievements.add(instance)
        userObj.save()
        
        return instance


class AddressSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(write_only=True)
    class Meta:
        model = Address
        fields = ['id','userId','careof','houseno','streetno','placename','postoffice','district','policestn','pincode','city','state','country','addressType']
    def create(self, validated_data):
        userId = validated_data.pop('userId', None)
        instance = Address.objects.create(**validated_data);
        instance.save();
        userObj = User.objects.get(pk=int(userId));
        userObj.addresses.add(instance)
        userObj.save()

        return instance






class AccountSerializers(serializers.ModelSerializer):
    class Meta:
        model =  Account
        fields = ('id','firstname', 'lastname','email','username','usertype','profile_image','registrationid')


class ProfileImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','profile_image')



class OfficeIDUploadSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','officeId_doc')


class GovtID1UploadSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','govtId1_doc')


class GovtID2UploadSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','govtId2_doc')



class DOBCertUploadSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','dobCert_doc')





#govtId1_doc
#dobCert_doc








from threading import Event

class CreateAccountWithPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username','usertype')
        model = User

    def create(self, validated_data):
        #Event().wait(5)
        #password = validated_data.pop('password', None)
        instance = User.objects.create(**validated_data);
        instance.save();
        fullpassword = "OLsbd!@#45"
        instance.set_password(fullpassword)
        instance.save()
        #print ("instance password: ", instance.password)
        return instance




class CreateAccountSerializer(serializers.ModelSerializer):
     

      class Meta:
          fields = ['username', 'email', 'phoneno']
        #   extra_kwargs = {
        #     'username': {'required': True},
        #     'email': {'required': True},
        #     'phoneno': {'required': True},
        # }
          model = User
      def create(self, validated_data):
        # new_field = validated_data.pop('new_field', None)  # Re
        print ("account creation Data: ", validated_data)
        instance = User.objects.create(**validated_data);
        instance.save();
        fullpassword = "JHjhadjhaShb!1254&1212"
        instance.set_password(fullpassword)
        instance.save()
        return instance






def changePasswordAfter(userObj):
    return None;




class CreateOTPAccountWithPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User

    def update(self, instance, validated_data):
        print ("sending otp .............")
        username=validated_data.pop('username', None)
        username = username.replace(" ", "")
        userObj = User.objects.get(username=username)
        otp = random.randint(10000,99999)
        fullpassword = 'OLsbd!@#45'+ str(otp)
        userObj.set_password(fullpassword)
        userObj.save()
        mob10digitNum= username[3:]


        print ("Reshwant no: ", mob10digitNum)
        url = "https://www.fast2sms.com/dev/bulkV2"
        payload = "variables_values={0}&route=otp&numbers={1}".format(otp, mob10digitNum);
        headers = {
          'authorization': "CqDtUWF4wjpv5brzxXPlaOic2IZS6GYkNLdy7hKfJM9A10BguEDiG0mLEcxyKnApUqMaCu7Jl1eRbF9o",
          'Content-Type': "application/x-www-form-urlencoded",
          'Cache-Control': "no-cache",
        }
        response = requests.request("POST", url, data=payload, headers=headers)
        #otpObj = MessageHandler(username,otp)
        #otpObj.send_otp_on_phone()
        print ("otP Testing ..DiracAI ------------------------",otp)
        return instance





#def send_email(subject, body, sender, recipients, password):
#    msg = MIMEText(body)
#    msg['Subject'] = subject
#    msg['From'] = sender
#    msg['To'] = ', '.join(recipients)
#    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
#       smtp_server.login(sender, password)
#       smtp_server.sendmail(sender, recipients, msg.as_string())
#    print("Message sent!")







class CreateOTPPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'phoneno')
        model = User

    def update(self, instance, validated_data):
        print ("sending otp .............")
        phoneno=validated_data.pop('phoneno', None)
        phoneno=str(phoneno.replace(" ", ""))
        userObj = User.objects.get(phoneno=phoneno)     
        print ("userObject from Phone: ", userObj)
        otp = random.randint(10000,99999)
        fullpassword = 'OLsbd!@#45'+ str(otp)
        userObj.set_password(fullpassword)
        userObj.save()
        mob10digitNum= phoneno[3:]

        print ("Reshwath  phoneno: ", mob10digitNum)
        subject = "Your login OTP : DiracAI"
        body = "Your OTP to login to diracai.com is "+ str(otp)
        sender = "From <diracai.info@gmail.com>"
        recipients = [userObj.email]
        #password = "fibmduvwoxsjtjvh"
        print ("recipient email: ", recipients)
        #send_mail(subject,body,sender,recipients)
        #send_email_task.delay(subject, body, sender, recipients)

        # this block will be depreciated from 4th March 2024
        #url = "https://www.fast2sms.com/dev/bulkV2"
        #payload = "variables_values={0}&route=otp&numbers={1}".format(otp, mob10digitNum);
        #headers = {
        #  'authorization': "CqDtUWF4wjpv5brzxXPlaOic2IZS6GYkNLdy7hKfJM9A10BguEDiG0mLEcxyKnApUqMaCu7Jl1eRbF9o",
        #  'Content-Type': "application/x-www-form-urlencoded",
        #  'Cache-Control': "no-cache",
        #}
        #response = requests.request("POST", url, data=payload, headers=headers)
        #  End of depreciated code
        conn = http.client.HTTPSConnection("control.msg91.com")
        payload = "{\n  \"Param1\": \"value1\",\n  \"Param2\": \"value2\",\n  \"Param3\": \"value3\"\n}"
        headers = { 'Content-Type': "application/JSON" }
        mobilenoANDotpParam = "/api/v5/otp?template_id=65e8726fd6fc053b95688c52&mobile={0}&authkey=416664AgVFnjJ8nhio65d6fc7bP1&otp={1}&invisible=".format('91'+mob10digitNum, otp)
        conn.request("POST", mobilenoANDotpParam, payload, headers)
        res = conn.getresponse()
        data = res.read()


        print ("otP ------------------------",otp)
        return instance


class CreateOTPEmailSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('id', 'email')
        model = User
    
      def update(self, instance, validated_data):
        print ("sending otp .............")
        email=validated_data.pop('email', None)
        email=str(email.replace(" ", ""))
        userObj = User.objects.get(email=email)
        otp = random.randint(10000,99999)
        fullpassword = 'OLsbd!@#45'+ str(otp)
        userObj.set_password(fullpassword)
        userObj.save()
        print ("userObject from mobile: ", userObj.phoneno)
        mob10digitNum = userObj.phoneno[3:]
        print ("mob10digitNum: ",mob10digitNum);

        subject = "Your login OTP : DiracAI"
        body = "Your OTP to login to diracai.com is "+ str(otp)
        sender = "diracai.info@gmail.com"
        recipients = [userObj.email]
        #password = "fibmduvwoxsjtjvh"
        #send_email(subject, body, sender, recipients, password)
        #send_mail(subject,body,sender,recipients)

        url = "https://www.fast2sms.com/dev/bulkV2"
        payload = "variables_values={0}&route=otp&numbers={1}".format(otp, mob10digitNum);
        headers = {
          'authorization': "CqDtUWF4wjpv5brzxXPlaOic2IZS6GYkNLdy7hKfJM9A10BguEDiG0mLEcxyKnApUqMaCu7Jl1eRbF9o",
          'Content-Type': "application/x-www-form-urlencoded",
          'Cache-Control': "no-cache",
        }
        response = requests.request("POST", url, data=payload, headers=headers)


        #otpObj = MessageHandler(username,otp)
        #otpObj.send_otp_on_phone()
        print ("otP ------------------------",otp)
        return instance









class DegreeNameSerializer(serializers.ModelSerializer):
      class Meta:
          model = DegreeName
          fields = '__all__'

class InstituteSerializer(serializers.ModelSerializer):
      class Meta:
          model = Institute
          fields = '__all__'


class MarkSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = '__all__'



class CertificateSerializer(serializers.ModelSerializer):
      class Meta:
        model = Certificate
        fields = '__all__'



class EduDegreeSerializer(serializers.ModelSerializer):
      institute = InstituteSerializer();
      degreename = DegreeNameSerializer();
      #marksheets = MarkSheetSerializer(many=True);
      #certificates = CertificateSerializer(many=True);
      class Meta:
          model = EduDegree
          fields = ['id','institute','degreename', 'startDate','endDate']

      #def get_institute(self, instance):
      #    return instance.institute.name

      #def get_degreename(self,instance):
      #    return instance.degreename



class EduDegreeCreateSerializer(serializers.ModelSerializer):
    #userId = serializers.SerializerMethodField()
    userId = serializers.CharField(write_only=True)
    institute = serializers.CharField(write_only=True)
    class Meta:
        model = EduDegree
        fields = ['userId','institute','degreename', 'startDate','endDate']

    def create(self, validated_data):
        userid = validated_data.pop('userId', None)
        userInstance = User.objects.get(pk=userid)
        #institute=validated_data['institute']
        institute = validated_data.pop('institute', None);
        instance = EduDegree.objects.create(**validated_data);

        if institute.isdigit():
           instituteObj = Institute.objects.get(pk=institute);
           instance.institute=instituteObj
           instance.save()
        if not institute.isdigit():    
           instData = {"name":institute}
           dummyInstitute=Institute.objects.create(**instData)
           dummyInstitute.dummy = "yes"  
           instance.institute=dummyInstitute
           instance.save()
        print ("institute: ", institute)
        print ("type of institute: ", type(institute))   
        userInstance.educationDegrees.add(instance)
        userInstance.save();
        return instance;





class ContactSerializer(serializers.ModelSerializer):
     class Meta:
         model = User
         fields = '__all__'

#from rest_framework.fields import CurrentUserDefault


class TeacherSerializer2(serializers.ModelSerializer):
     usertitle = serializers.SerializerMethodField() 
     class Meta:
         fields = ('id', 'username','usertitle', 'firstname','lastname','profile_image')
         model = User
     def get_usertitle(self, instance):
        #userObj = self.context['request'].user
        #print ("instance: ", instance)
        if instance.usertitle is None:
            return None;
        return instance.usertitle.name    



#remove meetings, noticeobjects,noticearray, classes from this serializer, since it only gives basic info about dashboard courses

class CourseSerializerForUserObject(serializers.ModelSerializer):
      enrolled = serializers.SerializerMethodField()
      enrollementRequestSent = serializers.SerializerMethodField()
      designedFor = serializers.SerializerMethodField()
      #teacher = serializers.SerializerMethodField()#to be depreciated
      card_cover_image = serializers.SerializerMethodField()
      association = serializers.SerializerMethodField()
      creater = serializers.SerializerMethodField()
      teachers = serializers.SerializerMethodField()
      admins = TeacherSerializer2(many=True)

      class Meta:
          model = Course
          #fields = [field.name for field in model._meta.fields]
          fields = ('id','designedFor','classsection','courseShortName','courseFullName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate', 'courseEndDate','educationboard','subject','abouttheCourse','instituteName','instituteCity','instituteCountry','enrolled_students','enrolement_requests','noticearray','syllabus','classes','meetings','noticeobjects','enrolled', 'enrollementRequestSent','card_cover_image','association','teachers','creater','published','admins')
      #fields.append('enrolled')
      def get_enrolled(self, instance):
          userObj=self.context['request'].user;
          enrolled_=False;
          #if instance in userObj.enrolled_courses_student.all():
          if userObj in instance.enrolled_students.all():    
             enrolled_=True
          else:
             enrolled_=False;
          return enrolled_;
      def get_enrollementRequestSent(self, instance):
          userObj=self.context['request'].user;
          requestSent_=False;
          if userObj in instance.enrolement_requests.all():
               requestSent_=True;
          return requestSent_;
      def get_designedFor(self, instance):
          return instance.designedFor.name

      def get_creater(self,instance):
          userObj=instance.creater
          #print ("userObject: ", userObj)
          if userObj is not None:
             serializer=TeacherSerializer2(userObj);
             return serializer.data
          return None 
      def get_teachers(self,instance):
          teachers = instance.teachers.all();
          if teachers.exists():
             serializer = TeacherSerializer2(teachers, many=True);
             return serializer.data
          return None;

      def get_card_cover_image(self, instance):
          imageurl = instance.card_cover_image.url
          return imageurl;
      def get_association(self, instance):
          userObj=self.context['request'].user
          if instance.enrolled_students.filter(pk=userObj.id).exists():
               return "Studying"
          if instance.teachers.filter(pk=userObj.id).exists():
               return "Teaching"
          if instance.admins.filter(pk=userObj.id).exists():
               return "Admin"
           
          return "N/A"

































class NoticeBoardSerializer2(serializers.ModelSerializer):
    class Meta:
        fields = ('id','creater','noticeTitle','noticeText','postCourses','noticefile')
        model = NoticeBoard





#class CourseEnrollRequestObjectSerializer(serializers.Serializer):
#       usertitle = serializers.SerializerMethodField()

class UserSerializerToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'profile_image']  # Add fields as needed

class UserSerializer(serializers.ModelSerializer):
   usertitle = serializers.SerializerMethodField()
   courseenrollment_requests = serializers.SerializerMethodField()
   noticeids = NoticeBoardSerializer2(many=True)
   educationDegrees = EduDegreeSerializer(many=True)
   contacts = ContactSerializer(many=True)
   achievements = AchievementsSerializer(many=True)
   addresses = AddressSerializer(many=True)
   dashboard_courses = serializers.SerializerMethodField()#CourseSerializerForUserObject(many=True)
   #dashboard_courses = serializers.ListField(read_only=True, child=CourseSerializerForUserObject())

   class Meta:
      model = User
      fields = ['id','usertitle','firstname', 'lastname','email','username','phoneno','usertype','profile_image','about','registrationid','gender','position','dateofbirth','dashboard_courses','noticeids','institute','city','state','country','officeId_doc','govtId1_doc','govtId2_doc','dobCert_doc','educationDegrees','contacts','achievements','addresses','generalchatgroups','courseenrollment_requests']
   def get_usertitle(self, instance):
        #print ("instance:dododod ", instance.usertitle.name)
        if instance.usertitle is None:
            return None;
        return instance.usertitle.name
        #return None
   def get_dashboard_courses(self, instance):
       #teacher_courses = instance.dashboard_courses_teacher.all()
       #student_courses = instance.dashboard_courses_student.all()
        
       #merged_courses = list(chain(teacher_courses, student_courses))

       serializer = CourseSerializerForUserObject(instance.dashboard_courses.all(), many=True, context=self.context)
       #if instance.usertype.id==1:           
       #    serializer = CourseSerializerForUserObject(instance.dashboard_courses_teacher.all(), many=True, context=instance);
       #if instance.usertype.id==2:
       #    serializer = CourseSerializerForUserObject(instance.dashboard_courses_student.all(), many=True, context=instance);
       return serializer.data
   def get_courseenrollment_requests(self, instance): 
       num=0
       enroll_reqs=[]       
       for course in instance.dashboard_courses.all():
              if course.enrolement_requests.count() != 0 and course.admins.filter(id=int(instance.id)).exists():
                  for requester in course.enrolement_requests.all():
                      
                      enroll_req={}
                      enroll_req["requesterId"] = requester.id
                      #enroll_req["requester_usertitle"] = requester.usertitle.name
                      enroll_req["requester_firstname"] = requester.firstname
                      enroll_req["requester_lastname"] = requester.lastname
                      enroll_req["requester_username"] = requester.username
                      #enroll_req["requester_profile_image"] = requester.profile_image
                      enroll_req["courseId"] = course.id
                      #if ( course.creater !=None and int(instance.id) == int(course.creater.id)):
                      enroll_reqs.append(enroll_req)   
              #print ("courses: ", course.enrolement_requests.all().count())
              num=num+course.enrolement_requests.count()
          #print ("-------------",enroll_reqs)     
       return enroll_reqs    


            
class UserProfileSerializer(serializers.ModelSerializer):
      #usertitle = serializers.SerializerMethodField()
      class Meta:
          model = User
          fields = ['id','usertitle','firstname', 'lastname','email','username', 'gender','position','dateofbirth', 'institute','city', 'state','country' ]
      #def get_usertitle(self, instance):
      #  if instance.usertitle is None:
      #      return None;
      #  return instance.usertitle.name









class UserSerializerFew(serializers.ModelSerializer):
      userExistsInChat = serializers.SerializerMethodField();
      isInContactList = serializers.SerializerMethodField()
      class Meta:
          model = User
          fields = ['id','firstname', 'lastname','username','profile_image','usertype', 'userExistsInChat','isInContactList']

      def get_userExistsInChat(self, instance):
        request = self.context.get('request')
        userAdded= False;
        if request and request.user.is_authenticated:
            logged_in_user = request.user
            for group in logged_in_user.generalchatgroups.all():
                if group.groupType == "oneoone":
                   for oneChatgroupuser in group.groupuserObjects.all():
                      #print ("userId: ", oneChatgroupuser.id)
                      if oneChatgroupuser.id == instance.id:
                       groupId=group.id;
                       userAdded=True
        return userAdded

      def get_isInContactList(self, instance):
        request = self.context.get('request')
        is_in_contact_list = False
        if request and request.user.is_authenticated:
            logged_in_user = request.user
            if instance in logged_in_user.contacts.all():
                is_in_contact_list = True
        return is_in_contact_list 

      def to_representation(self, instance):
         representation = super().to_representation(instance)
         # Calculate and set the value of userAdded on the fly
         representation['userExistsInChat'] = self.get_userExistsInChat(instance)
         representation['isInContactList'] = self.get_isInContactList(instance)
         return representation











class InstituteSerializerForSearch(serializers.ModelSerializer):
      class Meta:
          model = Institute
          fields = ['id','name']

class GeneralChatGroupsSerializer(serializers.ModelSerializer):
    groupuserObjects = serializers.SerializerMethodField();
    class Meta:
        model = ChatGroup
        fields = ['id','name','displayname','groupType','groupuserObjects','lastMsg','lastmsgTime']
        #depth = 1
    def get_groupuserObjects(self, instance):
        serializer = UserSerializerFew(instance.groupuserObjects.all(), many=True);
        return serializer.data;





class GeneralChatGroupsSerializer2(serializers.ModelSerializer):
    groupuserObjects = serializers.SerializerMethodField();
    class Meta:
        model = ChatGroup
        fields = ['id','groupType','groupuserObjects']
        #depth = 1
    def get_groupuserObjects(self, instance):
        serializer = UserSerializerFew(instance.groupuserObjects.all(), many=True);
        return serializer.data;

class UserSerializerDashboardCourses(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class UserSerializerNoticeIds(serializers.ModelSerializer):
    readnoticeId = serializers.IntegerField(write_only=True)
    class Meta:
        model = User
        fields = ['id','readnoticeId']
    
    def update(self, instance, validated_data):
        readnoticeId = validated_data.pop('readnoticeId')
        noticeObj = NoticeBoard.objects.get(pk=readnoticeId);
        instance.noticeids.add(noticeObj)
        return instance

class UserSerializerNoticeIdRemove(serializers.ModelSerializer):
    readnoticeId = serializers.IntegerField(write_only=True)
    class Meta:
        model = User
        fields = ['id','readnoticeId']

    def update(self, instance, validated_data):
        readnoticeId = validated_data.pop('readnoticeId')
        noticeObj = NoticeBoard.objects.get(pk=readnoticeId);
        instance.noticeids.remove(noticeObj)
        return instance

class CreateUseFullLinkSerializer(serializers.ModelSerializer):
      name = serializers.CharField(write_only=True)
      link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','link','description')
          model = User

      def update(self, instance, validated_data):
        newLinkObj = CourseLink.objects.create(**validated_data)
        instance.courselinks.add(newLinkObj)
        instance.save()
        return instance


class UseFullLinkSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','link','description')
          model = UsefullLink 

      def create(self, validated_data):
          loggedInUser = self.context['request'].user;
          newLinkObj = UsefullLink.objects.create(**validated_data)
          loggedInUser.usefull_links.add(newLinkObj)
          loggedInUser.save();
          return newLinkObj;


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'category']

class AcademicDetailSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = AcademicDetail
        fields = [
            'id', 'user', 'school_name', 'degree_name', 'field_of_study', 'start_date', 'end_date', 
            'grade', 'description', 'activities_and_societies', 'skills', 'media', 'currently_studying'
        ]
        extra_kwargs = {
            'user': {'required': False}
        }

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        academic_detail = AcademicDetail.objects.create(**validated_data)
        for skill_data in skills_data:
            # Create new skill instances regardless of existing names
            skill = Skill.objects.create(**skill_data)
            academic_detail.skills.add(skill)
        return academic_detail

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills', [])
        instance.school_name = validated_data.get('school_name', instance.school_name)
        instance.degree_name = validated_data.get('degree_name', instance.degree_name)
        instance.field_of_study = validated_data.get('field_of_study', instance.field_of_study)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.description = validated_data.get('description', instance.description)
        instance.activities_and_societies = validated_data.get('activities_and_societies', instance.activities_and_societies)
        instance.media = validated_data.get('media', instance.media)
        instance.currently_studying = validated_data.get('currently_studying', instance.currently_studying)
        instance.save()

        # Update skills
        instance.skills.clear()
        for skill_data in skills_data:
            skill = Skill.objects.create(**skill_data)
            instance.skills.add(skill)

        return instance
    
class AcademicDetailEditSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = AcademicDetail
        fields = [
            'school_name', 'degree_name', 'field_of_study', 'start_date', 'end_date', 
            'grade', 'description', 'activities_and_societies', 'skills', 'media', 'currently_studying'
        ]

    def update(self, instance, validated_data):
        # Handle nested field updates, like 'skills'
        if 'skills' in validated_data:
            skills_data = validated_data.pop('skills')
            # Clear existing skills and reassign with new data
            instance.skills.clear()
            for skill_data in skills_data:
                skill_instance = Skill.objects.create(**skill_data)
                instance.skills.add(skill_instance)

        # Update other fields normally
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class AboutUsSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(
        child=serializers.CharField(),  # Expecting skill names as input
        required=False,  # Skills are optional
        write_only=True
    )

    class Meta:
        model = AboutUs
        fields = ['id', 'description', 'skills', 'user']

    def create(self, validated_data):
        skill_names = validated_data.pop('skills', [])  # Pop out skill names
        about_us = AboutUs.objects.create(**validated_data)

        if skill_names:
            skills = []
            for skill_name in skill_names:
                skill, created = Skill.objects.get_or_create(name=skill_name)
                skills.append(skill)
            about_us.skills.set(skills)

        return about_us

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        skills_list = instance.skills.all()
        representation['skills'] = [SkillSerializer(skill).data for skill in skills_list]
        return representation


class EditAboutUsSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(
        child=serializers.CharField(),  # Expecting skill names as strings
        required=False,  # Skills are optional
        write_only =True
    )  # Allow partial updates to skills with names

    class Meta:
        model = AboutUs
        fields = ['id', 'description', 'skills']  # Include ID, description, and skills
    
    def validate_skills(self, value):
        # Convert skill names to Skill objects
        skills = []
        for skill_name in value:
            skill, created = Skill.objects.get_or_create(name=skill_name)  # Get or create skill by name
            skills.append(skill)
        return skills  # Return the list of Skill objects

    def update(self, instance, validated_data):
        skills = validated_data.pop('skills', None)  # Get the skills if provided
        instance.description = validated_data.get('description', instance.description)  # Allow updating description
        
        if skills:
            instance.skills.set(skills)  # Update the skills relationship if skills are provided
        
        instance.save()  # Save the updated "About Us" instance
        return instance
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Debug print to check if 'skills' is a ManyRelatedManager
        print(f"Checking skills field: {instance.skills}")
        
        # Use a safer approach to iterate over ManyToMany field
        skills_list = []
        if hasattr(instance, 'skills'):  # Ensure the field exists
            skills_list = instance.skills.all()  # Use .all() to get an iterable object

        # Serialize the skills with error handling
        representation['skills'] = []
        for skill in skills_list:
            try:
                representation['skills'].append(SkillSerializer(skill).data)  # Serialize each skill
            except Exception as e:
                print(f"Error serializing skill: {e}")  # Debugging information if an error occurs
        
        return representation    

class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Experience
        fields = [
            'id', 'user', 'title', 'employment_type', 'company_name', 
            'location', 'location_type', 'currently_working', 'start_date', 
            'end_date', 'industry', 'description', 'profile_headline', 'skills', 'media'
        ]

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        experience = Experience.objects.create(**validated_data)

        skills = []
        for skill_data in skills_data:
            skill_name = skill_data.get('name')
            skill_description = skill_data.get('description', '')
            skill_category = skill_data.get('category', '')

            # Handle multiple objects returned exception
            try:
                skill = Skill.objects.get(name=skill_name)
                skill.description = skill_description
                skill.category = skill_category
                skill.save()
            except Skill.MultipleObjectsReturned:
                skill = Skill.objects.filter(name=skill_name).first()
            except Skill.DoesNotExist:
                skill = Skill.objects.create(
                    name=skill_name,
                    description=skill_description,
                    category=skill_category
                )

            skills.append(skill)
        experience.skills.set(skills)
        return experience

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['skills'] = SkillSerializer(instance.skills.all(), many=True).data
        return representation
    
class EditExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'employment_type', 'company_name', 
            'location', 'location_type', 'currently_working', 
            'start_date', 'end_date', 'industry', 'description', 
            'profile_headline', 'skills', 'media'
        ]

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills', None)  # Get the updated skills
        instance.title = validated_data.get('title', instance.title)
        instance.employment_type = validated_data.get('employment_type', instance.employment_type)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.location = validated_data.get('location', instance.location)
        instance.location_type = validated_data.get('location_type', instance.location_type)
        instance.currently_working = validated_data.get('currently_working', instance.currently_working)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.industry = validated_data.get('industry', instance.industry)
        instance.description = validated_data.get('description', instance.description)
        instance.profile_headline = validated_data.get('profile_headline', instance.profile_headline)
        
        if skills_data:
            skills = []
            for skill_data in skills_data:
                skill_name = skill_data.get('name')
                skill_description = skill_data.get('description', '')
                skill_category = skill_data.get('category', '')

                try:
                    skill = Skill.objects.get(name=skill_name)
                    skill.description = skill_description
                    skill.category = skill_category
                    skill.save()
                except Skill.MultipleObjectsReturned:
                    skill = Skill.objects.filter(name=skill_name).first()
                except Skill.DoesNotExist:
                    skill = Skill.objects.create(
                        name=skill_name,
                        description=skill_description,
                        category=skill_category
                    )

                skills.append(skill)
            instance.skills.set(skills)
        
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['skills'] = SkillSerializer(instance.skills.all(), many=True).data
        return representation
    
class PublicationSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),  # Ensure correct queryset
        required=True  # Authors should be provided
    )
    class Meta:
        model = Publication
        fields = ['id', 'title', 'publisher', 'publication_date', 'authors', 'publication_url', 'description', 'user']
    
    def create(self, validated_data):
        author_ids = validated_data.pop('authors', [])  # Extract author IDs
        publication = Publication.objects.create(**validated_data)  # Create the publication
        
        # Associate the authors with the publication
        if author_ids:
            publication.authors.set(author_ids)  # Assign authors by primary key IDs
        
        return publication

class EditPublicationSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)  # Reference authors by their user IDs, allow updates

    class Meta:
        model = Publication
        fields = ['id', 'title', 'publisher', 'publication_date', 'authors', 'publication_url', 'description']
    
    def validate_authors(self, value):
        # Validate that provided authors are valid User instances
        if not all(isinstance(author, User) for author in value):
            raise serializers.ValidationError("Invalid authors provided.")
        return value  # Return the validated list of User instances
    
    def update(self, instance, validated_data):
        authors = validated_data.pop('authors', None)  # Check if authors are provided
        
        # Update the existing instance with the validated data
        instance.title = validated_data.get('title', instance.title)
        instance.publisher = validated_data.get('publisher', instance.publisher)
        instance.publication_date = validated_data.get('publication_date', instance.publication_date)
        instance.publication_url = validated_data.get('publication_url', instance.publication_url)
        instance.description = validated_data.get('description', instance.description)
        
        if authors:
            instance.authors.set(authors)  # Update the many-to-many relationship with authors
        
        instance.save()  # Save the updated instance
        return instance

class LicenseOrCertificateSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(
        child=serializers.CharField(),  # Expecting skill names as strings
        required=False,  # Skills can be optional
        write_only=True  # Ensures it's only used for input
    )  # Allow partial updates to skills with names

    class Meta:
        model = LicenseOrCertificate
        fields = [
            'id', 'name', 'issuing_organisation', 'issue_date', 
            'expiration_date', 'credentials_id', 'credentials_url', 
            'skills', 'media', 'user'
        ]  # Include relevant fields

    def validate_skills(self, value):
        # Convert skill names to Skill objects
        skills = []
        for skill_name in value:
            skill, created = Skill.objects.get_or_create(name=skill_name)  # Get or create by name
            skills.append(skill)
        return skills  # Return the list of Skill objects
        
    def create(self, validated_data):
        skills = validated_data.pop('skills', [])  # Extract skills from validated data
        license_certificate = LicenseOrCertificate.objects.create(**validated_data)  # Create the license/certificate
        
        # Associate the related skills
        if skills:
            license_certificate.skills.set(skills)  # Set the many-to-many relationship
        
        return license_certificate
    
    # Proper iteration and error handling in to_representation
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Access the skills field with .all() to avoid "ManyRelatedManager" errors
        if hasattr(instance, 'skills'):
            skills_list = instance.skills.all()  # Get iterable object
            
            # Serialize the skills with error handling
            representation['skills'] = [SkillSerializer(skill).data for skill in skills_list]
        else:
            representation['skills'] = []  # Default to empty list if no skills
        
        return representation
    
class EditLicenseOrCertificateSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(
        child=serializers.CharField(),  # Expecting skill names as strings
        required=False,  # Skills can be optional
        write_only=True  # Ensures it's only used for input
    )  # Allow partial updates to skills with names

    class Meta:
        model = LicenseOrCertificate
        fields = [
            'id', 'name', 'issuing_organisation', 'issue_date', 
            'expiration_date', 'credentials_id', 'credentials_url', 
            'skills', 'media'
        ]
    
    def validate_skills(self, value):
        # Convert skill names to Skill objects
        skills = []
        for skill_name in value:
            skill, created = Skill.objects.get_or_create(name=skill_name)  # Get or create by name
            skills.append(skill)
        return skills  # Return the list of Skill objects
    
    def update(self, instance, validated_data):
        # Handle the update logic, supporting partial updates
        skills = validated_data.pop('skills', None)  # Get updated skills, if provided
        
        # Update the existing instance with the validated data
        instance.name = validated_data.get('name', instance.name)
        instance.issuing_organisation = validated_data.get('issuing_organisation', instance.issuing_organisation)
        instance.issue_date = validated_data.get('issue_date', instance.issue_date)
        instance.expiration_date = validated_data.get('expiration_date', instance.expiration_date)
        instance.credentials_id = validated_data.get('credentials_id', instance.credentials_id)
        instance.credentials_url = validated_data.get('credentials_url', instance.credentials_url)

        # Update the skills if provided
        if skills:
            instance.skills.set(skills)  # Update the many-to-many relationship
        
        # Update the media file if provided
        instance.media = validated_data.get('media', instance.media)
        
        instance.save()  # Save the changes
        return instance
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Debug print to check if 'skills' is a ManyRelatedManager
        print(f"Checking skills field: {instance.skills}")
        
        # Use a safer approach to iterate over ManyToMany field
        skills_list = []
        if hasattr(instance, 'skills'):  # Ensure the field exists
            skills_list = instance.skills.all()  # Use .all() to get an iterable object

        # Serialize the skills with error handling
        representation['skills'] = []
        for skill in skills_list:
            try:
                representation['skills'].append(SkillSerializer(skill).data)  # Serialize each skill
            except Exception as e:
                print(f"Error serializing skill: {e}")  # Debugging information if an error occurs
        
        return representation  

class UpdateUserContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'phoneno','username']
        extra_kwargs = {
            'email': {'required': False},
            'phoneno': {'required': False},
            'username': {'required': False},
        }

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'  # Include all fields of the Account model



class EditAboutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Adjust to your actual user model
        fields = ['about']



class ParentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentDetails
        fields = ['id','father_name', 'mother_name', 'father_phone', 'mother_phone', 'father_email', 'mother_email']

class HealthDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthData
        fields = ['id', 'blood_group', 'height', 'weight']

class ContactUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstname', 'lastname', 'profile_image']

class ContactRequestSerializer(serializers.ModelSerializer):
    from_user = ContactUserSerializer()
    to_user = ContactUserSerializer()

    class Meta:
        model = ContactRequest
        fields = ['id', 'from_user', 'to_user', 'created_at', 'status']
