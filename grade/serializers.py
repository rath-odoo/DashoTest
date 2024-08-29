from rest_framework import serializers
from .models import Grade
from institute.models import Institute 
from course.models import Course
from eclass.models import Class 
from exam.models import Exam, SubExam
from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import get_object_or_404
from institute.models import Batch

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseFullName', 'courseGlobalCode']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id']
              
class ExamSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','difficultylevel', 'readingTest', 'start_date', 'start_time', 'platform', 'duration', 'total_marks')
          model = Exam

# Serializer for user data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname','lastname','profile_image']

class GradeListSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    class_details = ClassSerializer(read_only=True)
    exam = ExamSerializer(read_only=True)

    class Meta:
        model = Grade
        fields = [
            'name', 'institute', 'course', 'class_details', 'exam',
            'assignment', 'answer_file', 'batch', 'student', 'grade_value', 'comments', 'added_by'
        ]
        extra_kwargs = {
            'student': {'required': False},
            'batch': {'required': False},
            'course': {'required': False},
        }

    def validate(self, data):
        student = data.get('student')
        exam = data.get('exam')
        course = data.get('course')

        if student and exam and course and Grade.objects.filter(student=student, exam=exam, course=course).exists():
            raise serializers.ValidationError("This student already has a grade for the specified exam and course.")

        return data

    def create(self, validated_data):
        return Grade.objects.create(**validated_data)

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = [
            'name', 'institute', 'course', 'class_details', 'exam',
            'assignment', 'answer_file', 'batch', 'student', 'grade_value', 'comments', 
            'added_by', 'marks_obtained', 'percentage'
        ]
        extra_kwargs = {
            'student': {'required': False},
            'batch': {'required': False},
            'course': {'required': False},
        }

    def validate(self, data):
        student = data.get('student')
        exam = data.get('exam')
        course = data.get('course')

        if student and exam and course and Grade.objects.filter(student=student, exam=exam, course=course).exists():
            raise serializers.ValidationError("This student already has a grade for the specified exam and course.")

        return data

    def create(self, validated_data):
        return Grade.objects.create(**validated_data)
      
class BulkGradeCreateSerializer(serializers.Serializer):
    grades = GradeSerializer(many=True)

    def create(self, validated_data):
        grades_data = validated_data.pop('grades')
        created_grades = []
        for grade_data in grades_data:
            grade = Grade.objects.create(**grade_data)
            created_grades.append(grade)
        return created_grades
    
class GradeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = [
            'name','institute', 'course', 'class_details', 'exam',
            'student', 'grade_value', 'comments'
        ]

    def validate(self, data):
        """
        Custom validation to ensure the student isn't receiving duplicate grades
        for the same exam and class.
        """
        student = data.get('student')
        exam = data.get('exam')
        class_details = data.get('class_details')

        if Grade.objects.filter(student=student, exam=exam, class_details=class_details).exists():
            raise serializers.ValidationError("This student already has a grade for the specified exam and class.")

        return data

class GradeAssignmentCreateSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    exam = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all(), required=False, allow_null=True)
    sub_exam = serializers.PrimaryKeyRelatedField(queryset=SubExam.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Grade
        fields = ['student', 'grade_value', 'comments', 'exam', 'sub_exam']
        extra_kwargs = {
            'student': {'required': True},
            'grade_value': {'required': True}
        }
        
class GradeUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    exam_id = serializers.IntegerField(required=False)
    batch_id = serializers.IntegerField(required=False)
    institute_id = serializers.IntegerField(required=True)
    class_id = serializers.IntegerField(required=False)
    assignment_id = serializers.IntegerField(required=False)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'profile_image']

class GradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'grade_value', 'comments', 'marks_obtained', 'percentage']

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'name', 'difficultylevel', 'readingTest', 'start_date', 'start_time', 'platform', 'duration', 'total_marks']

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'logo']

# class SubExamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubExam
#         fields = ['id', 'name', 'courses', 'institutes', 'class_details']

class SubExamSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    institutes = InstituteSerializer(many=True, read_only=True)
    class_details = ClassSerializer(read_only=True)

    class Meta:
        model = SubExam
        fields = ['id', 'name', 'courses', 'institutes', 'class_details']

class BatchGradeSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    batch = serializers.PrimaryKeyRelatedField(queryset=Batch.objects.all())
    exam = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all(), required=False, allow_null=True)
    sub_exam = serializers.PrimaryKeyRelatedField(queryset=SubExam.objects.all(), required=False, allow_null=True)
    grade_value = serializers.CharField(required=False, allow_null=True)
    marks_obtained = serializers.FloatField(required=False, allow_null=True)

    class Meta:
        model = Grade
        fields = ['id', 'name', 'institute', 'course', 'batch', 'student', 'grade_value', 'comments', 'marks_obtained', 'percentage', 'exam', 'sub_exam', 'added_by']

    def validate(self, data):
        if data.get('grade_value') is None and data.get('marks_obtained') is None:
            raise serializers.ValidationError("Either 'grade_value' or 'marks_obtained' must be provided.")
        return data

class BatchCourseSerializer(serializers.ModelSerializer):
    enrolled_students = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseGlobalCode', 'courseLocalCode', 'courseStartDate', 'courseEndDate', 'enrolled_students', 'exams']

    def get_enrolled_students(self, obj):
        batch_id = self.context.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        student_id = self.context.get('student_id')

        if student_id:
            students = obj.enrolled_students.filter(batches=batch, id=student_id)
        else:
            students = obj.enrolled_students.filter(batches=batch)

        return [
            {
                'student': UserSerializer(student).data,
                'grades': self.get_student_grades(obj, student)
            } for student in students
        ]

    def get_exams(self, obj):
        exam_id = self.context.get('exam_id')
        sub_exam_id = self.context.get('sub_exam_id')
        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            sub_exams = SubExam.objects.filter(parent_exam=exam)
            if sub_exam_id:
                sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
                return [SubExamSerializer(sub_exam).data]
            return [ExamSerializer(exam).data] + SubExamSerializer(sub_exams, many=True).data
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            return [SubExamSerializer(sub_exam).data]
        else:
            exams = Exam.objects.filter(grades_exam__course=obj).distinct()
            sub_exams = SubExam.objects.filter(grades_subexam__course=obj).distinct()
            return ExamSerializer(exams, many=True).data + SubExamSerializer(sub_exams, many=True).data

    def get_student_grades(self, course, student):
        exam_id = self.context.get('exam_id')
        sub_exam_id = self.context.get('sub_exam_id')
        grades = []
        
        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            sub_exams = SubExam.objects.filter(parent_exam=exam)
            if sub_exams.exists():
                for sub_exam in sub_exams:
                    grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
                    grades.append({
                        'sub_exam': SubExamSerializer(sub_exam).data,
                        'grade': GradeSerializer(grade).data if grade else None,
                        'has_given_sub_exam': grade is not None
                    })
            else:
                grade = Grade.objects.filter(exam=exam, course=course, student=student).first()
                grades.append({
                    'exam': ExamSerializer(exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_exam': grade is not None
                })
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
            grades.append({
                'sub_exam': SubExamSerializer(sub_exam).data,
                'grade': GradeSerializer(grade).data if grade else None,
                'has_given_sub_exam': grade is not None
            })
        else:
            exams = Exam.objects.filter(grades_exam__course=course).distinct()
            sub_exams = SubExam.objects.filter(grades_subexam__course=course).distinct()
            for exam in exams:
                grade = Grade.objects.filter(exam=exam, course=course, student=student).first()
                grades.append({
                    'exam': ExamSerializer(exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_exam': grade is not None
                })
            for sub_exam in sub_exams:
                grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
                grades.append({
                    'sub_exam': SubExamSerializer(sub_exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_sub_exam': grade is not None
                })
        return grades


class CourseWithGradesSerializer(serializers.ModelSerializer):
    enrolled_students = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseGlobalCode', 'courseLocalCode', 'courseStartDate', 'courseEndDate', 'enrolled_students', 'exams']

    def get_enrolled_students(self, obj):
        batch_id = self.context.get('batch_id')
        batch = get_object_or_404(Batch, pk=batch_id)
        student_id = self.context.get('student_id')

        if student_id:
            students = obj.enrolled_students.filter(batches=batch, id=student_id)
        else:
            students = obj.enrolled_students.filter(batches=batch)

        return [
            {
                'student': UserSerializer(student).data,
                'grades': self.get_student_grades(obj, student)
            } for student in students
        ]

    def get_exams(self, obj):
        exam_id = self.context.get('exam_id')
        sub_exam_id = self.context.get('sub_exam_id')
        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            sub_exams = SubExam.objects.filter(parent_exam=exam)
            if sub_exam_id:
                sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
                return [SubExamSerializer(sub_exam).data]
            return [ExamSerializer(exam).data] + SubExamSerializer(sub_exams, many=True).data
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            return [SubExamSerializer(sub_exam).data]
        else:
            exams = Exam.objects.filter(grades_exam__course=obj).distinct()
            sub_exams = SubExam.objects.filter(grades_subexam__course=obj).distinct()
            return ExamSerializer(exams, many=True).data + SubExamSerializer(sub_exams, many=True).data

    def get_student_grades(self, course, student):
        exam_id = self.context.get('exam_id')
        sub_exam_id = self.context.get('sub_exam_id')
        grades = []
        
        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            sub_exams = SubExam.objects.filter(parent_exam=exam)
            if sub_exams.exists():
                for sub_exam in sub_exams:
                    grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
                    grades.append({
                        'sub_exam': SubExamSerializer(sub_exam).data,
                        'grade': GradeSerializer(grade).data if grade else None,
                        'has_given_sub_exam': grade is not None
                    })
            else:
                grade = Grade.objects.filter(exam=exam, course=course, student=student).first()
                grades.append({
                    'exam': ExamSerializer(exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_exam': grade is not None
                })
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
            grades.append({
                'sub_exam': SubExamSerializer(sub_exam).data,
                'grade': GradeSerializer(grade).data if grade else None,
                'has_given_sub_exam': grade is not None
            })
        else:
            exams = Exam.objects.filter(grades_exam__course=course).distinct()
            sub_exams = SubExam.objects.filter(grades_subexam__course=course).distinct()
            for exam in exams:
                grade = Grade.objects.filter(exam=exam, course=course, student=student).first()
                grades.append({
                    'exam': ExamSerializer(exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_exam': grade is not None
                })
            for sub_exam in sub_exams:
                grade = Grade.objects.filter(sub_exam=sub_exam, course=course, student=student).first()
                grades.append({
                    'sub_exam': SubExamSerializer(sub_exam).data,
                    'grade': GradeSerializer(grade).data if grade else None,
                    'has_given_sub_exam': grade is not None
                })
        return grades