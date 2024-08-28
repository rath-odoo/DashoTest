from rest_framework import serializers
from .models import Assignment, AssignmentAttachment
from rest_framework import serializers, pagination
from course.models import Course
from institute.models import Institute
from eclass.models import Class
from grade.models import Grade
from django.contrib.auth import get_user_model
User = get_user_model()



class CreaterMiniSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('id', 'firstname','lastname','profile_image','phoneno','username')
        model = User




class GetAssignmentSerializer(serializers.ModelSerializer):
    creater = CreaterMiniSerializer();
    class Meta:
        fields = ('id', 'title','creater','description', 'publishDate','dueDate','credit','questionFiles','answerFiles' )
        model = Assignment

#class CreateAssignmentSerializer(serializers.ModelSerializer):
#    class Meta:
#        fields = ('id', 'title','creater','description', 'publishDate','dueDate','credit','questionFiles' )
#        model = Assignment

class CreateAssignmentSerializer(serializers.ModelSerializer):
      title = serializers.CharField(write_only=True)
      #link = serializers.CharField(write_only=True)
      description = serializers.CharField(write_only=True)
      class Meta:
          fields = ('id','title','description')
          model = Course

      def update(self, instance, validated_data):
        newAssignmentObj = Assignment.objects.create(**validated_data)
        instance.assignments.add(newAssignmentObj)
        instance.save()
        return instance

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname','profile_image']

class GradeSerializer(serializers.ModelSerializer):
    added_by = UserSerializer()

    class Meta:
        model = Grade
        fields = ['id', 'grade_value', 'comments', 'added_by', 'created_date', 'updated_date']


class AssignmentAttachmentSerializer(serializers.ModelSerializer):
    grades = serializers.SerializerMethodField()
    uploader = UserSerializer()
    class Meta:
        model = AssignmentAttachment
        fields = ['id', 'name', 'description', 'afile', 'uploader', 'grades']

    def get_grades(self, obj):
        grades = Grade.objects.filter(answer_file=obj)
        serializer = GradeSerializer(grades, many=True, context=self.context)
        return serializer.data

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseFullName', 'courseGlobalCode']


class AssignmentSerializer(serializers.ModelSerializer):
    questionFiles = serializers.SerializerMethodField()
    answerFiles = serializers.SerializerMethodField()
    courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='course_assignments')
    class_details = serializers.PrimaryKeyRelatedField(read_only=True)
    course_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    class_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'publishDate', 'dueDate', 'credit',
            'questionFiles', 'answerFiles', 'course_ids', 'class_id', 'courses',
            'class_details', 'no_of_students_enrolled', 'no_of_students_submitted',
            'status'
        ]

    def create(self, validated_data):
        course_ids = validated_data.pop('course_ids', [])
        class_id = validated_data.pop('class_id', None)

        assignment = Assignment.objects.create(**validated_data)

        if class_id:
            class_instance = Class.objects.get(pk=class_id)
            assignment.class_details = class_instance
            assignment.save()

        if course_ids:
            courses = Course.objects.filter(pk__in=course_ids)
            for course in courses:
                course.assignments.add(assignment)

        return assignment

    def get_questionFiles(self, obj):
        question_files = obj.questionFiles.all()
        return AssignmentAttachmentSerializer(question_files, many=True).data

    def get_answerFiles(self, obj):
        answer_files = obj.answerFiles.all()
        return AssignmentAttachmentSerializer(answer_files, many=True).data
    
class AssignmentUpdateSerializer(serializers.ModelSerializer):
    questionFiles = AssignmentAttachmentSerializer(many=True, required=False)
    answerFiles = AssignmentAttachmentSerializer(many=True, required=False)
    course_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    class_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'publishDate', 'dueDate', 'credit',
            'questionFiles', 'answerFiles', 'course_ids', 'class_id', 'status'
        ]

    def update(self, instance, validated_data):
        # Update basic assignment attributes
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.publishDate = validated_data.get('publishDate', instance.publishDate)
        instance.dueDate = validated_data.get('dueDate', instance.dueDate)
        instance.credit = validated_data.get('credit', instance.credit)
        instance.status = validated_data.get('status', instance.status)

        # Update class details if provided
        class_id = validated_data.get('class_id')
        if class_id:
            try:
                specific_class = Class.objects.get(pk=class_id)
                instance.class_details = specific_class
            except Class.DoesNotExist:
                raise serializers.ValidationError(f"Class with ID {class_id} does not exist.")

        # Save updated instance attributes
        instance.save()

        # Update course assignments if provided
        course_ids = validated_data.get('course_ids', [])
        if course_ids:
            courses = Course.objects.filter(pk__in=course_ids)
            instance.course_assignments.set(courses)

        # Update question files if provided
        question_files_data = validated_data.get('questionFiles')
        if question_files_data:
            existing_attachments = list(instance.questionFiles.all())
            new_attachments = [
                AssignmentAttachment.objects.create(**file_data)
                for file_data in question_files_data
            ]
            instance.questionFiles.set(existing_attachments + new_attachments)

        # Update answer files if provided
        answer_files_data = validated_data.get('answerFiles')
        if answer_files_data:
            existing_attachments = list(instance.answerFiles.all())
            new_attachments = [
                AssignmentAttachment.objects.create(**file_data)
                for file_data in answer_files_data
            ]
            instance.answerFiles.set(existing_attachments + new_attachments)

        return instance
    
class ClassDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'topics', 'about']

class AssignmentListSerializer(serializers.ModelSerializer):
    questionFiles = serializers.SerializerMethodField()
    answerFiles = serializers.SerializerMethodField()
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)
    class_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'publishDate', 'dueDate', 'credit','status',
            'questionFiles', 'answerFiles', 'course_id', 'class_id', 'course',
            'class_details_id'
        ]

    def get_questionFiles(self, obj):
        request = self.context.get('request')
        if not request:
            return []
        question_files = obj.questionFiles.all()
        serializer = AssignmentAttachmentSerializer(question_files, many=True, context={'request': request})
        return serializer.data

    def get_answerFiles(self, obj):
        request = self.context.get('request')
        if not request:
            return []
        answer_files = obj.answerFiles.all()
        serializer = AssignmentAttachmentSerializer(answer_files, many=True, context={'request': request})
        return serializer.data

    def create(self, validated_data):
        # Extract the course and class IDs
        course_id = validated_data.pop('course_id')
        class_id = validated_data.pop('class_id')

        # Create the assignment object
        assignment = Assignment.objects.create(**validated_data)

        # Add the assignment to the specific course using the primary key (ID)
        course = Course.objects.get(pk=course_id)
        course.assignments.add(assignment)

        # Link the assignment to the class
        specific_class = Class.objects.get(pk=class_id)
        assignment.class_field = specific_class  # Adjust this based on the correct field name
        assignment.save()

        # Create and associate question file attachments
        created_question_attachments = [
            AssignmentAttachment.objects.create(**file_data)
            for file_data in validated_data.pop('questionFiles', [])
        ]
        assignment.questionFiles.set(created_question_attachments)

        # Create and associate answer file attachments
        created_answer_attachments = [
            AssignmentAttachment.objects.create(**file_data)
            for file_data in validated_data.pop('answerFiles', [])
        ]
        assignment.answerFiles.set(created_answer_attachments)

        return assignment


class AssignmentAnswerAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentAttachment
        fields = ['id', 'name', 'description', 'afile']
        read_only_fields = ['uploader', 'assignment']

    def create(self, validated_data):
        uploader = self.context['uploader']
        assignment = self.context['assignment']
        return AssignmentAttachment.objects.create(uploader=uploader, assignment=assignment, **validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.afile = validated_data.get('afile', instance.afile)
        instance.save()
        return instance
    
class GradeSerializer(serializers.ModelSerializer):
    added_by = UserSerializer()
    class Meta:
        model = Grade
        fields = ['id', 'grade_value', 'comments', 'added_by', 'created_date']

class UserSubmissionSerializer(serializers.Serializer):
    user = UserSerializer()
    answer_files = serializers.SerializerMethodField()

    def get_answer_files(self, obj):
        answer_files = obj['answer_files']
        serializer = AssignmentAttachmentSerializer(answer_files, many=True, context=self.context)
        return serializer.data

class UserSubmissionDetailSerializer(serializers.Serializer):
    user = UserSerializer()
    submissions = AssignmentAttachmentSerializer(many=True)
    grades = serializers.SerializerMethodField()

    def get_answer_files(self, obj):
        answer_files = obj['answer_files']
        return AssignmentAttachmentSerializer(answer_files, many=True).data
    
    def get_grades(self, obj):
        grades = Grade.objects.filter(assignment=obj['assignment'], uploader=obj['user'])
        return GradeSerializer(grades, many=True).data

class GradeForAnswerFileSerializer(serializers.Serializer):
    answer_file = AssignmentAttachmentSerializer()
    grade = GradeSerializer()

class UserSubmissionDetailSerializerst(serializers.Serializer):
    user = UserSerializer()
    answer_files_with_grades = serializers.SerializerMethodField()

    def get_answer_files_with_grades(self, obj):
        answer_files_with_grades = obj['answer_files_with_grades']
        return [
            {
                "answer_file": AssignmentAttachmentSerializer(afg["answer_file"]).data,
                "grade": GradeSerializer(afg["grade"]).data if afg["grade"] else None
            }
            for afg in answer_files_with_grades
        ]

class PaginatedAssignmentAttachmentSerializer(pagination.PageNumberPagination):
    page_size = 10

    def to_representation(self, data):
        page = self.paginate_queryset(data, self.context['request'])
        serializer = AssignmentAttachmentSerializer(page, many=True, context=self.context)
        return {
            'count': data.count(),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': serializer.data
        }

class GradeSerializers(serializers.ModelSerializer):
    added_by = UserSerializer()    
    class Meta:
        model = Grade
        fields = ['id', 'grade_value', 'comments', 'added_by', 'created_date', 'updated_date']

class AssignmentAttachmentSerializers(serializers.ModelSerializer):
    grades = serializers.SerializerMethodField()
    uploader = UserSerializer()
    class Meta:
        model = AssignmentAttachment
        fields = ['id', 'name', 'description', 'afile', 'uploader', 'grades']

    def get_grades(self, obj):
        grades = Grade.objects.filter(answer_file=obj)
        serializer = GradeSerializers(grades, many=True, context=self.context)
        return serializer.data


class AssignmentDetailSerializer(serializers.ModelSerializer):
    questionFiles = serializers.SerializerMethodField()
    answerFiles = serializers.SerializerMethodField()
    
    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'status', 'publishDate', 'dueDate', 'credit', 'questionFiles', 'answerFiles']

    def get_questionFiles(self, obj):
        request = self.context.get('request')
        paginator = PaginatedAssignmentAttachmentSerializer()
        page = paginator.paginate_queryset(obj.questionFiles.all(), request)
        serializer = AssignmentAttachmentSerializers(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data).data

    def get_answerFiles(self, obj):
        request = self.context.get('request')
        answer_files = obj.answerFiles.all()
        serializer = AssignmentAttachmentSerializers(answer_files, many=True, context={'request': request})
        return serializer.data
