from rest_framework import serializers
from .models import Exam, SubExam
from eclass.models import Class
from course.models import Course
from institute.models import Institute, Batch
from django.contrib.auth import get_user_model
User = get_user_model()

#class GetAssignmentSerializer(serializers.ModelSerializer):
#   class Meta:
#        fields = ('id', 'title','creater','description', 'publishDate','dueDate','credit','questionFiles','answerFiles' )
#        model = Assignment

class CreateExamSerializer(serializers.ModelSerializer):
      #name = serializers.CharField(write_only=True)
      #link = serializers.CharField(write_only=True)
      #description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','name','difficultylevel')
          model = Exam

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date']  # Assuming these fields exist


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseFullName', 'courseGlobalCode']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id']
              
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstname', 'lastname', 'profile_image']

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'logo']


class SubExamSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True, required=False, allow_null=True)
    institutes = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), many=True, required=False, allow_null=True)
    class_details = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=False, allow_null=True)

    class Meta:
        model = SubExam
        fields = ['id', 'name', 'total_marks', 'courses', 'institutes', 'class_details']


class SubExamListSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    institutes = InstituteSerializer(many=True, read_only=True)
    class_details = ClassSerializer(read_only=True)

    class Meta:
        model = SubExam
        fields = ['id', 'name', 'total_marks', 'courses', 'institutes', 'class_details']

class ExamSerializer(serializers.ModelSerializer):
    creater = UserSerializer(read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    institutes = InstituteSerializer(many=True, read_only=True)
    class_details = ClassSerializer(read_only=True)
    batches = BatchSerializer(many=True, read_only=True)
    sub_exams = SubExamListSerializer(many=True, read_only=True, source='child_exams')

    class Meta:
        model = Exam
        fields = [
            'id', 'name', 'difficultylevel', 'readingTest', 'start_date', 'start_time',
            'platform', 'duration', 'total_marks', 'creater', 'courses', 'institutes',
            'class_details', 'batches', 'sub_exams'
        ]

class ExamCreateSerializer(serializers.ModelSerializer):
    course_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    institute_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    class_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = Exam
        fields = [
            'name', 'creater', 'difficultylevel', 'readingTest',
            'class_id', 'course_ids', 'institute_ids', 'start_date', 'start_time',
            'platform', 'duration'
        ]

    def create(self, validated_data):
        class_id = validated_data.pop('class_id')
        course_ids = validated_data.pop('course_ids')
        institute_ids = validated_data.pop('institute_ids')

        specific_class = Class.objects.get(pk=class_id)
        exam = Exam.objects.create(
            name=validated_data['name'],
            difficultylevel=validated_data['difficultylevel'],
            readingTest=validated_data.get('readingTest'),
            start_date=validated_data['start_date'],
            start_time=validated_data['start_time'],
            platform=validated_data['platform'],
            duration=validated_data['duration'],
            creater=validated_data['creater'],
            class_details=specific_class
        )

        # Add courses and institutes to the exam
        courses = Course.objects.filter(id__in=course_ids)
        institutes = Institute.objects.filter(id__in=institute_ids)
        exam.courses.set(courses)
        exam.institutes.set(institutes)
        exam.save()

        return [exam]


class ExamUpdateSerializer(serializers.ModelSerializer):
    class_id = serializers.IntegerField(write_only=True, required=False)
    course_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    institute_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Exam
        fields = [
            'name', 'difficultylevel', 'readingTest',
            'class_id', 'course_ids', 'institute_ids', 'start_date', 'start_time',
            'platform', 'duration'
        ]

    def update(self, instance, validated_data):
        # Update the basic fields
        instance.name = validated_data.get('name', instance.name)
        instance.difficultylevel = validated_data.get('difficultylevel', instance.difficultylevel)
        instance.readingTest = validated_data.get('readingTest', instance.readingTest)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.platform = validated_data.get('platform', instance.platform)
        instance.duration = validated_data.get('duration', instance.duration)

        # Update Class if provided
        class_id = validated_data.get('class_id')
        if class_id:
            specific_class = Class.objects.get(pk=class_id)
            instance.class_details = specific_class

        # Update Courses if provided
        course_ids = validated_data.get('course_ids')
        if course_ids:
            courses = Course.objects.filter(id__in=course_ids)
            instance.courses.set(courses)

        # Update Institutes if provided
        institute_ids = validated_data.get('institute_ids')
        if institute_ids:
            institutes = Institute.objects.filter(id__in=institute_ids)
            instance.institutes.set(institutes)

        instance.save()
        return instance



class ExamSubExamCreateSerializer(serializers.ModelSerializer):
    sub_exams = SubExamSerializer(many=True, write_only=True)
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True, required=False, allow_null=True)
    institutes = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), many=True, required=False, allow_null=True)
    class_details = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=False, allow_null=True)
    batches = serializers.PrimaryKeyRelatedField(queryset=Batch.objects.all(), many=True, required=False, allow_null=True)

    class Meta:
        model = Exam
        fields = ['id', 'name', 'difficultylevel', 'readingTest', 'start_date', 'start_time', 'platform', 'duration', 'total_marks', 
                  'courses', 'institutes', 'class_details', 'sub_exams', 'batches']
        extra_kwargs = {
            'courses': {'required': False, 'allow_null': True},
            'institutes': {'required': False, 'allow_null': True},
            'class_details': {'required': False, 'allow_null': True},
            'batches': {'required': False, 'allow_null': True},
        }

    def create(self, validated_data):
        sub_exams_data = validated_data.pop('sub_exams', [])
        courses = validated_data.pop('courses', [])
        institutes = validated_data.pop('institutes', [])
        batches = validated_data.pop('batches', [])
        class_details = validated_data.pop('class_details', None)

        exam = Exam.objects.create(**validated_data)
        
        if courses:
            exam.courses.set(courses)
        if institutes:
            exam.institutes.set(institutes)
        if batches:
            exam.batches.set(batches)
        if class_details:
            exam.class_details = class_details
            exam.save()

        total_marks = 0

        for sub_exam_data in sub_exams_data:
            sub_exam_courses = sub_exam_data.pop('courses', [])
            sub_exam_institutes = sub_exam_data.pop('institutes', [])
            sub_exam_class_details = sub_exam_data.pop('class_details', None)
            sub_exam = SubExam.objects.create(parent_exam=exam, **sub_exam_data)

            if sub_exam_courses:
                sub_exam.courses.set(sub_exam_courses)
            if sub_exam_institutes:
                sub_exam.institutes.set(sub_exam_institutes)
            if sub_exam_class_details:
                sub_exam.class_details = sub_exam_class_details
                sub_exam.save()

            total_marks += sub_exam.total_marks

        exam.total_marks = total_marks
        exam.save()

        return exam

    
class ExamSubExamUpdateSerializer(serializers.ModelSerializer):
    sub_exams = SubExamSerializer(many=True, write_only=True)
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True, required=False, allow_null=True)
    institutes = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), many=True, required=False, allow_null=True)
    class_details = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=False, allow_null=True)
    batches = serializers.PrimaryKeyRelatedField(queryset=Batch.objects.all(), many=True, required=False, allow_null=True)

    class Meta:
        model = Exam
        fields = ['id', 'name', 'difficultylevel', 'readingTest', 'start_date', 'start_time', 
                  'platform', 'duration', 'total_marks', 'courses', 'institutes', 'class_details', 'sub_exams', 'batches']
        extra_kwargs = {
            'courses': {'required': False, 'allow_null': True},
            'institutes': {'required': False, 'allow_null': True},
            'class_details': {'required': False, 'allow_null': True},
            'batches': {'required': False, 'allow_null': True},
        }

    def validate(self, data):
        data['courses'] = data.get('courses') or []
        data['institutes'] = data.get('institutes') or []
        data['batches'] = data.get('batches') or []
        return data

    def update(self, instance, validated_data):
        sub_exams_data = validated_data.pop('sub_exams', [])
        courses = validated_data.pop('courses', [])
        institutes = validated_data.pop('institutes', [])
        batches = validated_data.pop('batches', [])
        class_details = validated_data.pop('class_details', None)

        instance.name = validated_data.get('name', instance.name)
        instance.difficultylevel = validated_data.get('difficultylevel', instance.difficultylevel)
        instance.readingTest = validated_data.get('readingTest', instance.readingTest)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.platform = validated_data.get('platform', instance.platform)
        instance.duration = validated_data.get('duration', instance.duration)

        if batches:
            instance.batches.set(batches)

        if courses is not None:
            instance.courses.set(courses)
        if institutes is not None:
            instance.institutes.set(institutes)
        if class_details is not None:
            instance.class_details = class_details

        instance.save()

        # Handle sub exams
        sub_exam_ids = [sub_exam['id'] for sub_exam in sub_exams_data if 'id' in sub_exam]
        existing_sub_exams = instance.child_exams.filter(id__in=sub_exam_ids)
        total_marks = 0

        for sub_exam_data in sub_exams_data:
            if 'id' in sub_exam_data:
                sub_exam = existing_sub_exams.get(id=sub_exam_data['id'])
                sub_exam.name = sub_exam_data.get('name', sub_exam.name)
                sub_exam.total_marks = sub_exam_data.get('total_marks', sub_exam.total_marks)
                sub_exam_courses = sub_exam_data.pop('courses', [])
                sub_exam_institutes = sub_exam_data.pop('institutes', [])
                sub_exam_class_details = sub_exam_data.pop('class_details', None)

                sub_exam.save()

                if sub_exam_courses:
                    sub_exam.courses.set(sub_exam_courses)
                if sub_exam_institutes:
                    sub_exam.institutes.set(sub_exam_institutes)
                if sub_exam_class_details:
                    sub_exam.class_details = sub_exam_class_details
                    sub_exam.save()
            else:
                sub_exam_courses = sub_exam_data.pop('courses', [])
                sub_exam_institutes = sub_exam_data.pop('institutes', [])
                sub_exam_class_details = sub_exam_data.pop('class_details', None)

                sub_exam = SubExam.objects.create(parent_exam=instance, **sub_exam_data)

                if sub_exam_courses:
                    sub_exam.courses.set(sub_exam_courses)
                if sub_exam_institutes:
                    sub_exam.institutes.set(sub_exam_institutes)
                if sub_exam_class_details:
                    sub_exam.class_details = sub_exam_class_details
                    sub_exam.save()

            total_marks += sub_exam.total_marks

        instance.total_marks = total_marks
        instance.save()

        return instance
