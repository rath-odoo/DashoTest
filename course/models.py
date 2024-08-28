from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
import datetime
from eclass.models import Class
from meeting.models import Meeting
from django.contrib.auth import get_user_model
# from course.models import Course

User = get_user_model()

#class 
class CourseDesignedFor(models.Model):
    name = models.CharField(max_length=100)
    boardofeducation = ArrayField(models.CharField(max_length=100),size=99)
    def __str__(self):
        return self.name if self.name else "Unnamed designed for"

class EducationBoard(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name if self.name else "Unnamed"

class ClassSection(models.Model):
    name=models.CharField(max_length=30)
    def __str__(self):
         return self.name if self.name else "Unnamed"

class Subject(models.Model):
    name = models.CharField(max_length=100)
    classname = models.ForeignKey(CourseDesignedFor, on_delete=models.CASCADE, default=1)
    board = models.ForeignKey(EducationBoard, on_delete=models.CASCADE, default=1)
    def __str__(self):
        return self.name if self.name else "Unnamed"

def get_default_card_cover_image():
        return "codingwithmitch/coursedefault.png"

class CourseLink(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True)
      link = models.CharField(max_length=1000, null=True,blank=True)
      description = models.CharField(max_length=500, null=True,blank=True)
      creationDate = models.DateField(default=datetime.date.today, null=True,blank=True)
      creationTime = models.TimeField(default=timezone.now, null=True, blank=True);
      def __str__(self):
        return self.name if self.name else "Unnamed"
      class Meta:
        ordering = ('creationDate',)

class FileObject(models.Model):
      displayname = models.CharField(max_length=200, null=True,blank=True)
      fileaddress = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True); 
      description = models.CharField(max_length=500, null=True,blank=True)
      creationDate = models.DateField(default=datetime.date.today, null=True,blank=True)
      creationTime = models.TimeField(default=timezone.now, null=True, blank=True);
      def __str__(self):
        return self.displayname if self.displayname else "Unnamed"
      class Meta:
        ordering = ('creationDate',)

class VideoObject(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True)
      link = models.CharField(max_length=1000, null=True,blank=True)
      description = models.CharField(max_length=500, null=True,blank=True)
      creationDate = models.DateField(default=datetime.date.today, null=True,blank=True)
      creationTime = models.TimeField(default=timezone.now, null=True, blank=True);
      def __str__(self):
        return self.name if self.name else "Unnamed"
      class Meta:
        ordering = ('creationDate',)

class Course(models.Model):
    # name = models.CharField(max_length=255) 
    
    aoptions = (('closed','CLOSED'),('ongoing','ONGOING'),) 
    teachers = models.ManyToManyField(User, blank=True, related_name='allcourse_teachers')
    creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_creater',null=True,blank=True)
    courseShortName = models.CharField(max_length=500, null=True,blank=True)
    courseFullName = models.CharField(max_length=150, null=True,blank=True)
    courseGlobalCode = models.CharField(max_length=10);
    courseLocalCode = models.CharField(max_length=10, null=True,blank=True);
    courseStatus  = models.CharField(max_length=10, choices=aoptions, default='ongoing',null=True,blank=True)
    courseStartDate = models.DateField(default=datetime.date.today, null=True,blank=True)
    courseEndDate = models.DateField(default=datetime.date.today, null=True,blank=True)
    designedFor = models.ForeignKey(CourseDesignedFor, on_delete=models.CASCADE, default=1,null=True,blank=True);
    classsection = models.ForeignKey(ClassSection, on_delete=models.CASCADE, default=1);
    educationboard = models.CharField(max_length=100, null=True,blank=True); 
    subject = models.CharField(max_length=100, null=True,blank=True);
    abouttheCourse = models.TextField(max_length=5000, null=True,blank=True);
    instituteName = models.CharField(max_length=200, null=True,blank=True);
    instituteCity = models.CharField(max_length=100, null=True,blank=True);
    instituteCountry = models.CharField(max_length=100, null=True,blank=True);
    enrolled_students = models.ManyToManyField(User, blank=True,related_name='enrolled_students')
    enrolement_requests = models.ManyToManyField(User, blank=True,related_name='enrolement_requests')
    noticearray = ArrayField(models.IntegerField(default='0'),size=99,default=list, null=True,blank=True);# to be depreciated
    noticeobjects = models.ManyToManyField(to='noticeboard.NoticeBoard', blank=True)
    syllabus = models.ForeignKey(to='syllabus.Syllabus', on_delete=models.CASCADE, related_name='course_syllabus',null=True,blank=True);
    classes = models.ManyToManyField(Class, blank=True,related_name='classes') 
    meetings = models.ManyToManyField(Meeting, blank=True,related_name='meetings')
    card_cover_image = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_card_cover_image);
    coursecredit = models.CharField(max_length=100, null=True,blank=True); 
    videos = models.ManyToManyField(VideoObject, blank=True,related_name='video_objects')
    courselinks = models.ManyToManyField(CourseLink, blank=True,related_name='link_objects')
    coursefiles =models.ManyToManyField(FileObject, blank=True,related_name='course_file_objects')
    assignments = models.ManyToManyField(to='assignment.Assignment',blank=True,related_name='course_assignments');
    tickets = models.ManyToManyField(to='tickets.Ticket',blank=True,related_name='course_tickets');
    ticketCategories =  models.ForeignKey(to='tickets.AllCategoriesOfCourse', on_delete=models.CASCADE, related_name="ticket_cat_course",null=True,blank=True);
    coursechatgroups = models.ManyToManyField(to='chat.ChatGroup', blank=True);
    published = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    archive_date = models.DateTimeField(null=True, blank=True)
    admins = models.ManyToManyField(User, blank=True, related_name='course_admins')
    linked_batch = models.ForeignKey('institute.Batch', on_delete=models.SET_NULL, null=True, blank=True, related_name='linked_courses')
    linked_institute = models.ForeignKey('institute.Institute', on_delete=models.SET_NULL, null=True, blank=True, related_name='linked_courses')



    def __str__(self):
      return str(self.id) if self.id else "Unnamed Course"
    
    def save(self, **kwargs):
      created = not self.pk
      super().save(**kwargs)
      if created:
          self.courseGlobalCode = str(100000+self.pk)
          super().save()
          #self.save() 
    
    def archive(self):
      self.archived = True 
      self.archive_date = timezone.now()
      self.save()
