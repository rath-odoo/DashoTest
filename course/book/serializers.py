from rest_framework import serializers

from .models import Book, ImageUploadTest

class BookSerializer(serializers.ModelSerializer):
      class Meta:
          fields = '__all__'
          model = Book
      def create(self, validated_data):
          chapters_ = validated_data.pop('chapters',None)
          print ("book creation Data: ", validated_data);
          instance = Book.objects.create(**validated_data);
          instance.save()
          return instance;


class ImageUploadTestSerializer(serializers.ModelSerializer):
    #test = serializers.CharField(write_only=True)
    class Meta:
        fields =('id','coverimage')
        model = ImageUploadTest
    def create(self, validated_data):
          #print ("Validated Data: ", validated_data);
          #test = validated_data.pop('test',None)
          #print ("Image Data: ", validated_data);
          instance = ImageUploadTest.objects.create(**validated_data);
          instance.save()
          return instance;



class ImageUploadTestSerializer2(serializers.ModelSerializer):
     class Meta:
         fields='__all__';
         model = ImageUploadTest




