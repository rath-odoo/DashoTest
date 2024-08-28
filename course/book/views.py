from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser 
from .models import Book, ImageUploadTest
from .serializers import BookSerializer, ImageUploadTestSerializer, ImageUploadTestSerializer2


class BookView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer



class BookAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        print (request.data)
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        objs = Book.objects.all()
        serializer = BookSerializer(objs, many=True)
        return Response(serializer.data)







class ImageUploadTestView(generics.ListCreateAPIView):
    queryset = ImageUploadTest.objects.all()
    serializer_class = ImageUploadTestSerializer




class ImageUploadTestAPIView(APIView):
      parser_classes = [MultiPartParser, FormParser]
      def post(self, request, format=None):
          print (request.data)
          serializer = ImageUploadTestSerializer2(data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






