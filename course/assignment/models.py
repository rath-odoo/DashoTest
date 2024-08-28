from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime
from eclass.models import Class
from course.models import Course
# Create your models here.
User = get_user_model()

class AssignmentAttachment(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True);
      description = models.CharField(max_length=1000, null=True,blank=True);
      afile = models.FileField(max_length=1055, upload_to='documents/', null=True, blank=True);
      uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='file_uploader',null=True,blank=True);
      assignment = models.ForeignKey('Assignment', on_delete=models.CASCADE, related_name='attachments', null=True)
      def __str__(self):
       return self.name or "Unnamed"
      
class Assignment(models.Model):
    STATUS_OPTIONS = [
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('reviewed', 'Reviewed'),
    ]
    title = models.CharField(max_length=50, null=True,blank=True);
    creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creater_assignment',null=True,blank=True); 
    description = models.TextField(null=True)   
    publishDate = models.DateField(default=datetime.date.today, null=True,blank=True);
    dueDate = models.DateField(default=datetime.date.today, null=True,blank=True);
    credit = models.CharField(max_length=100, null=True,blank=True);
    questionFiles = models.ManyToManyField(AssignmentAttachment, blank=True,related_name='attachment_questions')
    answerFiles = models.ManyToManyField(AssignmentAttachment, blank=True,related_name='attachment_answer')
    class_details = models.ForeignKey(Class, on_delete=models.CASCADE, blank=True, null=True,)
    status = models.CharField(max_length=10, choices=STATUS_OPTIONS, default='open')
    no_of_students_enrolled = models.PositiveIntegerField(default=0)
    no_of_students_submitted = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True) 
    updated_at = models.DateTimeField(auto_now=True, null=True)
    

    def update_student_count(self):
        # Retrieve the count of students from all courses linked to this assignment
        courses = Course.objects.filter(assignments=self)
        self.no_of_students_enrolled = sum(course.enrolled_students.count() for course in courses)

    def save(self, *args, **kwargs):
        self.update_student_count()
        super().save(*args, **kwargs)

    def __str__(self):
       return self.title or "Unnamed"
    class Meta:
        ordering = ('dueDate',)
