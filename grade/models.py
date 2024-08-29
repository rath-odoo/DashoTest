from django.db import models
from django.contrib.auth import get_user_model
from institute.models import Institute, Batch
from course.models import Course
from eclass.models import Class
from exam.models import Exam, SubExam
from assignment.models import Assignment, AssignmentAttachment

User = get_user_model()

class Grade(models.Model):
    name = models.CharField(verbose_name="name", max_length=20, blank=True, default="")
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='grades_institute', blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='grades_course', blank=True, null=True)
    class_details = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='grades_class', blank=True, null=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='grades_exam', blank=True, null=True)
    sub_exam = models.ForeignKey(SubExam, on_delete=models.CASCADE, related_name='grades_subexam', blank=True, null=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='grades_assignment', blank=True, null=True)
    answer_file = models.ForeignKey(AssignmentAttachment, on_delete=models.CASCADE, related_name='grades_attachment', blank=True, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, related_name='grades_batch', blank=True, null=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_grades')
    grade_value = models.CharField(max_length=5, blank=True, null=True)  # Adjust based on grading schema (e.g., A, B, C)
    comments = models.TextField(null=True, blank=True)
    marks_obtained = models.FloatField(null=True, blank=True)
    percentage = models.FloatField(null=True, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='added_grades')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.username} - {self.grade_value} in {self.assignment.name if self.assignment else 'No Assignment'}" or "Unnamed"
    
    def save(self, *args, **kwargs):
        if self.exam:
            total_marks = self.exam.total_marks
        elif self.sub_exam:
            total_marks = self.sub_exam.total_marks
        else:
            total_marks = None

        if self.marks_obtained is not None and total_marks not in (None, 0):
            self.percentage = (self.marks_obtained / total_marks) * 100
        else:
            self.percentage = None

        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_date']
        verbose_name = 'Grade'
        verbose_name_plural = 'Grades'
