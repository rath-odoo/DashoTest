from django.db import models
import datetime
from django.utils import timezone

from django.contrib.auth import get_user_model
User = get_user_model()

class LinkObjs(models.Model):
      name = models.CharField(max_length=1000,blank=True,null=True);
      link = models.CharField(max_length=1000,blank=True,null=True);
      def __str__(self):
        return self.name or "Unnamed"

class Talkfile(models.Model):
      name = models.CharField(max_length=500,blank=True,null=True,default="Namenotgiven");
      talkfile = models.FileField(max_length=5000, upload_to='images/', null=True, blank=True);
      def __str__(self):
        return self.name or "Unnamed"

class Presentation(models.Model):
      talktitle = models.CharField(max_length=1000,blank=True,null=True);
      talkdate = models.DateField(default=datetime.date.today, blank=True,null=True);
      talktime = models.TimeField(null=True, blank=True);
      duration = models.IntegerField(blank=True,null=True);
      speaker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='speaker_talk',null=True,blank=True);
      outspeaker = models.CharField(max_length=200,blank=True,null=True);
      talkfiles = models.ManyToManyField(Talkfile, blank=True);
      def __str__(self):
        return self.talktitle or "Unnamed"

class Meeting(models.Model):
    # event = models.ForeignKey('Event', on_delete=models.SET_NULL, null=True, blank=True, related_name='meetings')
    name = models.CharField(max_length=1000,blank=True,null=True);
    about = models.TextField(max_length=5000, null=True,blank=True);
    statusOptions = (('scheduled','SCHEDULED'),('ongoing','ONGOING'),('cancelled','CANCELLED'),('postponed','POSTPONED'),('completed','COMPLETED'))
    creater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creater_meeting',null=True,blank=True)
    participants = models.ManyToManyField(User,blank=True)
    courseId = models.IntegerField(blank=True,null=True)
    serialNo = models.IntegerField(blank=True,null=True)
    meetingStatus  = models.CharField(max_length=10, choices=statusOptions, default='scheduled')
    datetime = models.DateTimeField(default=timezone.now)
    duration = models.IntegerField(blank=True,null=True)    
    meetingLink = models.CharField(max_length=1000,blank=True,null=True);    
    address = models.CharField(max_length=250,blank=True,null=True);
    contributions = models.ManyToManyField(Presentation,blank=True)

    class Meta:
        ordering = ('datetime',)

    def __str__(self):
        return self.name or "Unnamed"

