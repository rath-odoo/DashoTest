from django.db import models
from course.models import EducationBoard,Subject
# Create your models here.
from django.contrib.auth import get_user_model
User = get_user_model()
from django.utils import timezone


class Topic(models.Model):
    name=models.TextField(max_length=200)
    def __str__(self):
        return self.name or "Unnamed"


class SectionNumber(models.Model):
      sectionno = models.FloatField(blank=True, null=True)
      def __str__(self):
        return str(self.id) or "Unnamed"

class Section(models.Model):
    name=models.CharField(max_length=200)
    topics = models.ManyToManyField(Topic)
    chapterid = models.IntegerField(blank=True,null=True)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.name or "Unnamed"
    class Meta:
        ordering = ('created_at',)

class ChapterNumber(models.Model):
      chapterno = models.IntegerField(blank=True, null=True)
      def __str__(self):
        return str(self.id) or "Unnamed"

class Chapter(models.Model):
    name=models.CharField(max_length=100)
    chapternum = models.ForeignKey(ChapterNumber, on_delete=models.CASCADE,null=True,blank=True)
    sections = models.ManyToManyField(Section,blank=True)
    syllabusid = models.IntegerField(blank=True,null=True)

    class Meta:
        ordering = ('chapternum',)

    def __str__(self):
        return self.name or "Unnamed"


class Syllabus(models.Model):
    name = models.CharField(max_length=50)
    creater = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True)
    classname = models.ForeignKey(to="course.CourseDesignedFor", on_delete=models.CASCADE, null=True,blank=True)
    educationboard = models.ForeignKey(EducationBoard, on_delete=models.CASCADE, null=True,blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True,blank=True)
    chapters = models.ManyToManyField(Chapter)
    def __str__(self):
        return self.name or "Unnamed"