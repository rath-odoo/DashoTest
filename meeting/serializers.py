from rest_framework import serializers
from .models import Meeting, Presentation, Talkfile
import datetime

from course.models import  Course
from syllabus.serializers import ChapterSerializer

from accountAPIs.serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()






class EditMeetingSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','about','address','meetingStatus','datetime','duration','meetingLink')
          model = Meeting


class TalkfileSerializerGET(serializers.ModelSerializer):
    class Meta:
        fields ="__all__"
        model = Talkfile
        depth=1




class PresentationSerializerPUT(serializers.ModelSerializer):
       
      class Meta:
          fields = ('id','talktitle','talktime','duration')
          model = Presentation


class MeetingCreaterSerializer(serializers.ModelSerializer):
      class Meta:
          fields =('id','firstname','lastname','username', 'profile_image')
          model = User


class PresentationSerializerGET(serializers.ModelSerializer):
      talkfiles = TalkfileSerializerGET( many=True)
      speaker = MeetingCreaterSerializer()
      class Meta:
          fields = ('id','talktitle','talkdate','talktime','duration','speaker','outspeaker','talkfiles')
          model = Presentation





class MeetingSerializerGET(serializers.ModelSerializer):
    contributions = PresentationSerializerGET(many=True)
    creater = MeetingCreaterSerializer()
    class Meta:
        fields = ('id','name','about','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater','contributions')
        model = Meeting
        



class TalkFileUploadSerializer(serializers.ModelSerializer):
    talkId = serializers.CharField(write_only=True)
    class Meta:
         model = Talkfile
         fields = ('id','talkfile','talkId')
         
    def create(self, validated_data):
        talkId = validated_data.pop('talkId', None)
        #print ("-----upload file validated data ", validated_data)
        instance = Talkfile.objects.create(**validated_data);
        instance.save();
        PresentationObj = Presentation.objects.get(pk=int(talkId))
        PresentationObj.talkfiles.add(instance)
        return instance
    


class PresentationSerializerCREATE(serializers.ModelSerializer):
      meetingid = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','talktitle','talktime','duration','speaker','outspeaker','meetingid')
          model = Presentation
      def create(self, validated_data):
          meetingid = validated_data.pop('meetingid', None)
          meetingId = int(meetingid)
          instance = Presentation.objects.create(**validated_data);
          instance.save()
          meetingObj = Meeting.objects.get(pk=meetingId)
          meetingObj.contributions.add(instance)
          return instance




class MeetingSerializer(serializers.ModelSerializer):
    #chapter = ChapterSerializer(many=True)
    class Meta:
        fields = ('id','name','about','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater','contributions')
        model = Meeting
        #depth=1
    def create(self, validated_data):
        topics = validated_data.pop('topics', None)
        instance = Meeting.objects.create(**validated_data);
        course_id = validated_data["courseId"]
        #print ("course Id : ", course_id)
        CourseObj = Course.objects.get(pk=course_id)
        CourseObj.meetings.add(instance)
        instance.save();
        return instance


class DashboardMeetingSerializer(serializers.ModelSerializer):
    #chapter = ChapterSerializer(many=True)
    class Meta:
        fields = ('id','name','about','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater','contributions')
        model = Meeting
        #depth=1
    def create(self, validated_data):
        topics = validated_data.pop('topics', None)
        instance = Meeting.objects.create(**validated_data);
        creater_id = validated_data["creater"]

        #print ("validated_data: " , validated_data )
        UserObj = User.objects.get(username=creater_id)
        UserObj.generalmeetings.add(instance);
        UserObj.save();
        #CourseObj.meetings.add(instance)
        instance.save();
        return instance


class CreateOneMeetingSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('id','name','about','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater')
        model =  Meeting

      def create(self, validated_data):
          print ("validated_data: ", validated_data)
          instance = Meeting.objects.create(**validated_data);
          creater = validated_data["creater"]
          #UserObj = User.objects.get(pk=creater_id)
          creater.generalmeetings.add(instance);
          creater.save();
          instance.save();
          return instance













class MeetingMultiCreatePersonalSerializer(serializers.ModelSerializer):
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
        fields = ('id','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater',
                'startdate','enddate',
                'checkedMon','mondaytime','mondayduration',
                'checkedTues','tuesdaytime','tuesdayduration',
                'checkedWed','wednesdaytime','wednesdayduration',
                'checkedThurs','thursdaytime','thursdayduration',
                'checkedFri','fridaytime','fridayduration',
                'checkedSat','saturdaytime','saturdayduration',
                'checkedSun','sundaytime','sundayduration',)
        model = Meeting
  
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
        instance1 = Meeting()
        #instance2 = Class.objects.create(**validated_data)
        delta = datetime.timedelta(days=1)
        startDate_=startDate;
        endDate_=endDate;
        while startDate_ <= endDate_:
            if checkedMon and startDate_.strftime("%A")=="Monday":                    
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = mondayTime;
                instance1.duration = mondayDuration;
                instance1.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
            startDate_ += delta

        startDate_= startDate;
        endDate_= endDate;
        #for tuesday 
        while startDate_ <= endDate_:
            if checkedTues and startDate_.strftime("%A")=="Tuesday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = tuesdayTime;
                instance1.duration = tuesdayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for wednesday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for wednes: ", startDate_)
            #print ("checkedWed: ",checkedWed)
            if checkedWed and startDate_.strftime("%A")=="Wednesday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = wednesdayTime;
                instance1.duration = wednesdayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta
        
        #for thursday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for thurs: ", startDate_)
            if checkedWed and startDate_.strftime("%A")=="Thursday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = thursdayTime;
                instance1.duration = thursdayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta

        
        #for friday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for fri: ", startDate_)
            if checkedFri and startDate_.strftime("%A")=="Friday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = fridayTime;
                instance1.duration = fridayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for saturday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for sat: ", startDate_)
            if checkedSat and startDate_.strftime("%A")=="Saturday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = saturdayTime;
                instance1.duration = saturdayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for sunday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for sun: ", startDate_)
            if checkedSun and startDate_.strftime("%A")=="Sunday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = sundayTime;
                instance1.duration = sundayDuration;
                instance1.save();
                creater_id = validated_data["creater"]
                UserObj = User.objects.get(username=creater_id)
                UserObj.generalmeetings.add(instance1);
                UserObj.save();
                #course_id = instance1.courseId;
                #CourseObj = Course.objects.get(pk=course_id)
                #CourseObj.meetings.add(instance1)
            startDate_ += delta


        return instance1
        #return super().create(validated_data)







#class MeetingMultiCreatePersonalSerializer(serializers.ModelSerializer):



class MeetingMultiCreateSerializer(serializers.ModelSerializer):
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
        fields = ('id','courseId','serialNo','meetingStatus','datetime','duration','meetingLink','address','creater',
                'startdate','enddate',
                'checkedMon','mondaytime','mondayduration',
                'checkedTues','tuesdaytime','tuesdayduration',
                'checkedWed','wednesdaytime','wednesdayduration',
                'checkedThurs','thursdaytime','thursdayduration',
                'checkedFri','fridaytime','fridayduration',
                'checkedSat','saturdaytime','saturdayduration',
                'checkedSun','sundaytime','sundayduration',)
        model = Meeting
  
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
        instance1 = Meeting()
        #instance2 = Class.objects.create(**validated_data)
        delta = datetime.timedelta(days=1)
        startDate_=startDate;
        endDate_=endDate;
        while startDate_ <= endDate_:
            if checkedMon and startDate_.strftime("%A")=="Monday":                    
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = mondayTime;
                instance1.duration = mondayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta

        startDate_= startDate;
        endDate_= endDate;
        #for tuesday 
        while startDate_ <= endDate_:
            if checkedTues and startDate_.strftime("%A")=="Tuesday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = tuesdayTime;
                instance1.duration = tuesdayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for wednesday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for wednes: ", startDate_)
            #print ("checkedWed: ",checkedWed)
            if checkedWed and startDate_.strftime("%A")=="Wednesday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = wednesdayTime;
                instance1.duration = wednesdayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta
        
        #for thursday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for thurs: ", startDate_)
            if checkedWed and startDate_.strftime("%A")=="Thursday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = thursdayTime;
                instance1.duration = thursdayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta

        
        #for friday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for fri: ", startDate_)
            if checkedFri and startDate_.strftime("%A")=="Friday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = fridayTime;
                instance1.duration = fridayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for saturday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for sat: ", startDate_)
            if checkedSat and startDate_.strftime("%A")=="Saturday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = saturdayTime;
                instance1.duration = saturdayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta

        #for sunday
        startDate_= startDate;
        endDate_= endDate;
        while startDate_ <= endDate_:
            #print ("for sun: ", startDate_)
            if checkedSun and startDate_.strftime("%A")=="Sunday":
                instance1 = Meeting.objects.create(**validated_data);
                instance1.meetingdate = startDate_;
                instance1.meetingtime = sundayTime;
                instance1.duration = sundayDuration;
                instance1.save();
                course_id = instance1.courseId;
                CourseObj = Course.objects.get(pk=course_id)
                CourseObj.meetings.add(instance1)
            startDate_ += delta


        return instance1
        #return super().create(validated_data
