from rest_framework import serializers
from .models import ChatGroup,ChatComment
from django.contrib.auth import get_user_model
User = get_user_model()
from django.utils import timezone


class ChatCommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','groupId','commenter','commenttext','commenttime')
        model = ChatComment
    def create(self, validated_data):
        instance = ChatComment.objects.create(**validated_data);
        chatGroupObj = validated_data['groupId']
        #print ("chatgroupId", chatGroupObj)        
        chatGroupObj.chatcomments.add(instance);
        #print ("timezone.now: ", timezone.now())
        chatGroupObj.lastmsgTime = timezone.now();
        chatGroupObj.save();
        print ("validated_data['commenttext']: ", validated_data['commenttext'])
        commentText = validated_data['commenttext'];
        truncatedNext = (commentText[:30] + '..') if len(commentText) > 30 else commentText
        print ("trucated Text: ", truncatedNext)
        chatGroupObj.lastMsg = truncatedNext;
        chatGroupObj.save();
        print ("chatGroup.lastMsg: ", chatGroupObj.lastMsg)
        instance.save();
        return instance



class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name','displayname','groupuserObjects','groupType','chatcomments')
        model = ChatGroup

    def create(self, validated_data):
        #print ("course creation data", validated_data)
        groupuserObjects = validated_data.pop("groupuserObjects")
        #print ("groupuserObjects: ", groupuserObjects)
        instance = ChatGroup.objects.create(**validated_data)
        for userGroupObject in groupuserObjects:
            instance.groupuserObjects.add(userGroupObject)
            userGroupObject.generalchatgroups.add(instance);
        instance.save()
        #chatGroupCreater = self.user
        #print ("request user: ", chatGroupCreater)
        return instance




class GroupUserObjectsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','firstname','lastname','username','profile_image','usertype')
        model = User








class ChatGroupSerializerGET(serializers.ModelSerializer):
    groupuserObjects = GroupUserObjectsSerializer(many=True)
    class Meta:
        fields = ('id','name','displayname','groupuserObjects','groupType', 'lastmsgTime','lastMsg')
        model = ChatGroup
        #depth=1







