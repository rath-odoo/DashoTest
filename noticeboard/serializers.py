from rest_framework import serializers
from .models import NoticeBoard
from institute.models import Batch, Institute, InstituteMembership
from django.contrib.auth import get_user_model
User = get_user_model()
from course.models import Course
from institute.models import Institute, Batch
from django.shortcuts import get_object_or_404

class NoticeCreaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','firstname', 'lastname','profile_image')

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date']

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'address', 'websiteurl', 'logo']

class NoticeBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeBoard
        fields = ('id','creater','noticeTitle','noticeText','postCourses','noticefile', 'batches', 'institutes')
        
    def create(self, validated_data):
         #basicopicsData = validated_data.pop('topics')
         createrObj = validated_data['creater'];
         postCourses = validated_data['postCourses'];
         instance = NoticeBoard.objects.create(**validated_data)
         createrObj.noticeids.add(instance)
         createrObj.save();
         for courseId in postCourses:
             courseObj = Course.objects.get(pk=courseId)
             courseObj.noticeobjects.add(instance)
             courseObj.save();

         return instance
    
class NoticeBoardSerializerBatchInstitute(serializers.ModelSerializer):
    creater = NoticeCreaterSerializer(read_only=True)
    batches = BatchSerializer(read_only=True, many=True)
    institutes = InstituteSerializer(read_only=True, many=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    batch_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    institute_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = NoticeBoard
        fields = (
            'id', 'creater', 'user_id', 'noticefile', 'noticeText', 'postCourses', 
            'noticeTitle', 'batches', 'batch_ids', 'institutes', 'institute_ids'
        )

    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        batch_ids = validated_data.pop('batch_ids', [])
        institute_ids = validated_data.pop('institute_ids', [])

        if user_id:
            user = get_object_or_404(User, id=user_id)
        else:
            user = self.context['request'].user

        # Ensure 'creater' is not passed in validated_data
        validated_data['creater'] = user

        # Create the notice
        notice = NoticeBoard.objects.create(**validated_data)

        # Helper function to add notice to user's noticeids
        def add_notice_to_users(users):
            for member in users:
                member.noticeids.add(notice)
                member.save()

        # Associate notice with all members of the batches
        if batch_ids:
            for batch_id in batch_ids:
                batch = get_object_or_404(Batch, id=batch_id)
                add_notice_to_users(batch.users.all())
                notice.batches.add(batch)

        # Associate notice with all members of the institutes
        if institute_ids:
            for institute_id in institute_ids:
                institute = get_object_or_404(Institute, id=institute_id)
                add_notice_to_users(institute.people.all())
                notice.institutes.add(institute)

        return notice

    def update(self, instance, validated_data):
        batch_ids = validated_data.pop('batch_ids', [])
        institute_ids = validated_data.pop('institute_ids', [])

        # Update the notice details
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Helper function to add notice to user's noticeids
        def add_notice_to_users(users):
            for member in users:
                member.noticeids.add(instance)
                member.save()

        # Update batches associated with the notice
        if batch_ids:
            instance.batches.clear()
            for batch_id in batch_ids:
                batch = get_object_or_404(Batch, id=batch_id)
                add_notice_to_users(batch.users.all())
                instance.batches.add(batch)

        # Update institutes associated with the notice
        if institute_ids:
            instance.institutes.clear()
            for institute_id in institute_ids:
                institute = get_object_or_404(Institute, id=institute_id)
                add_notice_to_users(institute.people.all())
                instance.institutes.add(institute)

        return instance


class DashboardNoticeBoardSerializer(serializers.ModelSerializer):
    read = serializers.SerializerMethodField()
    creater = NoticeCreaterSerializer()

    class Meta:
        model = NoticeBoard
        fields = ('id', 'creater', 'noticeTitle', 'noticeText', 'postCourses', 'noticefile', 'read', 'creationTime')

    def get_read(self, instance):
        user = self.context['request'].user
        return instance in user.noticeids.all()