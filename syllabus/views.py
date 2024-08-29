from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .models import Syllabus, Chapter, Section, Topic, ChapterNumber
from .serializers import SyllabusSerializer, ChapterSerializer, SectionSerializer, TopicSerializer,ChapterNumberSerializer, CreateSyllabusSerializer, SectionEditSerializer, EditChapterSerializer

class SyllabusView(generics.ListCreateAPIView):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer

class CreateSyllabusView(generics.ListCreateAPIView):
      queryset = Syllabus.objects.all()
      serializer_class = CreateSyllabusSerializer

class SyllabusByIdView(APIView):
    def get_object(self, pk):
        try:
            return Syllabus.objects.get(pk=pk)
        except Syllabus.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SyllabusSerializer(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SyllabusSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChapterView(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


class ChapterByIdView(APIView):
    def get_object(self, pk):
        try:
            return Chapter.objects.get(pk=pk)
        except Chapter.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = ChapterSerializer(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = ChapterSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk, format=None):
        ChapObj = self.get_object(pk)
        ChapObj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeleteChapterView(APIView):
      def get_object(self, sid, cid):
        try:
            return Chapter.objects.get(pk=cid)
        except Chapter.DoesNotExist:
            raise Http404
      def get(self, request, sid, cid, format=None):
        Object = self.get_object(pk)
        serializer = ChapterSerializer(Object)
        return Response(serializer.data)

      def delete(self, request, sid, cid, format=None):
        ChapObj = self.get_object(cid)
        SyllabusObject = Syllabus.objects.get(pk=str(sid))
         
        for chapter in SyllabusObject.chapters.all():
            if chapter.chapternum.chapterno > ChapObj.chapternum.chapterno :
                chapter.chapternum.chapterno = chapter.chapternum.chapterno - 1
                chapter.save()

        ChapObj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EditChapterByIdView(APIView):
      def get_object(self, pk):
        try:
            return Chapter.objects.get(pk=pk)
        except Chapter.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = EditChapterSerializer(Object)
        return Response(serializer.data)

      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = EditChapterSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

class SectionView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class SectionByIdView(APIView):
    def get_object(self, pk):
        try:
            return Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SectionSerializer(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SectionSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        SecObj = self.get_object(pk)
        SecObj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SectionEditByIdView(APIView):
      def get_object(self, pk):
        try:
            return Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SectionSerializer(Object)
        return Response(serializer.data)

      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = SectionEditSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopicView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class TopicByIdView(APIView):
    def get_object(self, pk):
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = TopicSerializer(Object)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = TopicSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChapterNumberView(generics.ListCreateAPIView):
       queryset = ChapterNumber.objects.all()
       serializer_class = ChapterNumberSerializer
