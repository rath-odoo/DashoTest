from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from course.models import Course
from eclass.models import Class
from institute.models import Institute, Batch
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Create your models here.
User = get_user_model()

class Anoption(models.Model):
      questionText = models.TextField(null=True);
      
class Question(models.Model):
      questionText = models.TextField(null=True);
      anoptions = models.ManyToManyField(Anoption, blank=True);

class ParagraphSection(models.Model):
      paragraphFile = models.FileField(max_length=5000, upload_to='images/', null=True, blank=True);
      paragraphText = models.TextField(null=True)
      duration = models.IntegerField(blank=True,null=True);
      questions = models.ManyToManyField(Question, blank=True);

class ReadingTest(models.Model):
      name= models.CharField(max_length=500, null=True,blank=True);
      testinstructions = models.TextField(null=True)
      testinstructionFile = models.FileField(max_length=5000, upload_to='images/', null=True, blank=True);
      paragraphSections = models.ManyToManyField(ParagraphSection, blank=True);

# the above classes may not be used since these were designed for Celpip test








class Exam(models.Model):
    doptions = (('easy', 'EASY'), ('medium', 'MEDIUM'), ('difficult', 'DIFFICULT'))
    name = models.CharField(max_length=500, null=True, blank=True)
    creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creater_exam', null=True, blank=True)
    difficultylevel = models.CharField(max_length=10, choices=doptions, default='medium')
    readingTest = models.ForeignKey(ReadingTest, on_delete=models.CASCADE, related_name='reading_test', null=True, blank=True)
    start_date = models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    platform = models.CharField(max_length=10, choices=[('online', 'Online'), ('offline', 'Offline')], default='offline')
    duration = models.DurationField(blank=True, null=True)
    total_marks = models.PositiveIntegerField(default=0)
    # Using ManyToManyField for courses and institutes
    courses = models.ManyToManyField(Course, related_name='course_exams', blank=True)
    institutes = models.ManyToManyField(Institute, related_name='institute_exams', blank=True)
    batches = models.ManyToManyField(Batch, related_name='batch_exams', blank=True)
    class_details = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='class_exams', blank=True, null=True)
    parent_exam = models.ForeignKey('self', on_delete=models.CASCADE, related_name='sub_exams', null=True, blank=True)

    def __str__(self):
        return self.name or "Unnamed"

    class Meta:
        ordering = ('id',)

class SubExam(models.Model):
    parent_exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='child_exams')
    name = models.CharField(max_length=500, null=True, blank=True)
    courses = models.ManyToManyField(Course, related_name='subexam_courses', blank=True)
    institutes = models.ManyToManyField(Institute, related_name='subexam_institutes', blank=True)
    class_details = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='subexam_classes', blank=True, null=True)
    total_marks = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name or "Unnamed"

    class Meta:
        ordering = ('id',)

@receiver(post_save, sender=SubExam)
@receiver(post_delete, sender=SubExam)
def update_exam_total_marks(sender, instance, **kwargs):
    exam = instance.parent_exam
    total_marks = sum(sub_exam.total_marks for sub_exam in exam.child_exams.all())
    exam.total_marks = total_marks
    exam.save()
