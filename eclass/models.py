from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()

class Class(models.Model):
    statusOptions = (('scheduled','SCHEDULED'),('ongoing','ONGOING'),('completed','COMPLETED'),('postponed','POSTPONED'),('cancelled','CANCELLED'))
    courseId =  models.IntegerField(blank=True,null=True)
    serialNo = models.IntegerField(blank=True,null=True)
    status  = models.CharField(max_length=10, choices=statusOptions, default='scheduled')
    datetime = models.DateTimeField(default=timezone.now)
    duration = models.IntegerField(blank=True,null=True)    
    meetingLink = models.CharField(max_length=1000,blank=True,null=True)    
    address = models.CharField(max_length=250,blank=True,null=True)
    topics = models.ManyToManyField(to='syllabus.Topic',blank=True)
    about = models.TextField(max_length=5000, null=True,blank=True)
    videos = models.ManyToManyField(to='course.VideoObject', blank=True,related_name='video_objects_class')
    links = models.ManyToManyField(to='course.CourseLink', blank=True,related_name='link_objects_class')
    files =models.ManyToManyField(to='course.FileObject', blank=True,related_name='course_file_objects_class')
    participants = models.ManyToManyField(User, blank=True,related_name='class_participants')  
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_classes')

    class Meta:
        ordering = ('datetime',)

    def __str__(self):
        return str(self.id) or "Unnamed"