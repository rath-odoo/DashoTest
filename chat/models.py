from django.db import models
from django.contrib.auth import get_user_model
#from django.contrib.postgres.fields import ArrayField
User = get_user_model()
from django.utils import timezone


# Create your models here.


#add a variable that shows if user is added
#search for finding user inside the added 
#last message
#read or unread information
# attch file
#send emoji



class ChatGroup(models.Model):
    groptions = (('oneoone','ONEOONE'),('group','GROUP'),);
    name = models.CharField(max_length=100,unique=True );#make it false
    displayname = models.CharField(max_length=50, null=True, blank=True);
    #groupusers = ArrayField(models.IntegerField(default=list))
    groupuserObjects = models.ManyToManyField(User, blank=True,related_name="groupuser_Objects");
    groupType  = models.CharField(max_length=10, choices=groptions, default='group',null=True,blank=True);
    lastmsgTime = models.DateTimeField(default=timezone.now);
    lastMsg = models.CharField(max_length=500, null=True, blank=True);
    chatcomments = models.ManyToManyField(to='chat.ChatComment', blank=True); 
    def __str__(self):
        return str(self.id) or "Unnamed"








class ChatComment(models.Model):
      groupId = models.ForeignKey(ChatGroup, on_delete=models.CASCADE, related_name='chatcomment')
      commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatcommenter')
      commenttext = models.TextField()
      commenttime = models.DateTimeField(default=timezone.now)
      title = models.CharField(max_length=100, default="chatcomment")
      class Meta:
          ordering = ('commenttime',)

      def __str__(self):
          return str(str(self.groupId) +"--"+ str(self.commenter.id)) or "Unnamed"













