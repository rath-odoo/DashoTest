from rest_framework import serializers
from .models import Syllabus, Chapter, Section, Topic, SectionNumber,ChapterNumber

class BaseSyllabusSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','classname','educationboard', 'subject')
          model = Syllabus
      
class CreateSyllabusSerializer(serializers.ModelSerializer):
      class Meta:
          fields = ('id','name','classname')
          model = Syllabus

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Topic

class SectionNumberSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = SectionNumber


class SectionSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True)
    class Meta:
        fields = ('id','name','topics','chapterid')
        model = Section

    def create(self, validated_data):
         basicTopicsData = validated_data.pop('topics')
         chapterId = validated_data['chapterid']         
         instance = Section.objects.create(**validated_data)
         ChapterObj = Chapter.objects.get(pk=chapterId)
         ChapterObj.sections.add(instance)
         for topic in basicTopicsData:
            topicObj = Topic.objects.create(**topic)
            instance.topics.add(topicObj)
         return instance

    def update(self, instance, validated_data):
        basicTopicsData = validated_data.pop('topics')
        for oldtopic in instance.topics.all():
            print ('oldopic----',oldtopic)
            instance.topics.remove(oldtopic)
            oldtopic.delete()
        for topic in basicTopicsData:
            topicObj = Topic.objects.create(**topic)
            instance.topics.add(topicObj)
        instance.save()
        return instance

class SectionEditSerializer(serializers.ModelSerializer):
    topicsText = serializers.CharField(write_only=True)
    class Meta:
        fields = ('id','name','topicsText','chapterid')
        model = Section
    def update(self, instance, validated_data):
        print ("validated_data: ", validated_data)
        topicsList = validated_data['topicsText'].split('.')
        for oldtopic in instance.topics.all():
            instance.topics.remove(oldtopic)
            oldtopic.delete()
        for newtopic in topicsList:
            print ("newtopic: ", newtopic)
            if newtopic !="":
               topicObj = Topic.objects.create(name=str(newtopic+'.'))
               instance.topics.add(topicObj)
        instance.save()
        return instance

class ChapterNumberSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ChapterNumber


class ChapterSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)
    class Meta:
        fields = ('id','name','sections','chapternum','syllabusid')
        model = Chapter

    def create(self, validated_data):
         
         chapterNum = validated_data['chapternum']
         basicSectionData = validated_data.pop('sections')
         instance = Chapter.objects.create(**validated_data)
         syllabusId = validated_data['syllabusid']
         SyllabusObj = Syllabus.objects.get(pk=syllabusId)
         for chapter in SyllabusObj.chapters.all():
             if chapter.chapternum.chapterno >= chapterNum.chapterno:
                 chapter.chapternum.chapterno = chapter.chapternum.chapterno+1
                 chapter.save()
         SyllabusObj.chapters.add(instance)       


         return instance

class EditChapterSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name')
        model = Chapter

class SyllabusSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True)
    class Meta:
        fields = ('id','name','classname','educationboard', 'subject','chapters')
        model = Syllabus
