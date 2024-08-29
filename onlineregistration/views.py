from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.http import Http404
from rest_framework.permissions import IsAuthenticated, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions, AllowAny
from rest_framework import generics,status
from rest_framework.parsers import MultiPartParser, FormParser


from .serializers import AddRegistrantSerializer


from .models import Registrant

class CreateOnlineRegistrationView(APIView):
      parser_classes = [MultiPartParser, FormParser]
      def post(self, request ,format=None):
        serializer = AddRegistrantSerializer(data=request.data, context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






class GetOnlineRegistrationView(generics.ListCreateAPIView):
    queryset = Registrant.objects.all()
    serializer_class = AddRegistrantSerializer



