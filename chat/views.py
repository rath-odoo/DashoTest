from django.shortcuts import render
from .models import ChatComment,ChatGroup
from .serializers import ChatCommentSerializer,ChatGroupSerializer, ChatGroupSerializerGET
from rest_framework import generics, status
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from django.http import Http404
from rest_framework import pagination
from django.db.models import Q

from django.contrib.auth import get_user_model
User = get_user_model()



def chatindex(request):
    return render(request, 'chat/chatIndex.html',{})



def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })


class ChatCommentsAll(generics.ListCreateAPIView):
    queryset = ChatComment.objects.all()
    serializer_class = ChatCommentSerializer


class ChatGroups(generics.ListCreateAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer



class ChatGroups1(APIView):
    def post(self, request, format=None):
        #print ("user id: ", request.user)
        serializer = ChatGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, format=None):
        #print ("user id: ", request.user)
        serializer = ChatGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 





class ChatGroupCommentsSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50
    def get_paginated_response(self, data):
        return Response({
            
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


#class ChatGroupCommentsSetPagination(pagination.PageNumberPagination):
#    page_size = 10
#    page_size_query_param = 'page_size'
#    max_page_size = 50





class ChatCommentsbyGroupId(generics.ListAPIView):
    serializer_class = ChatCommentSerializer
    pagination_class = ChatGroupCommentsSetPagination

    def get_object(self, groupId):
        try:
            return ChatGroup.objects.get(pk=groupId)
        except ChatGroup.DoesNotExist:
            raise Http404

    def get_queryset(self):
        groupId = self.kwargs['groupId']
        #print ("----Type----",groupId)
        group_id = int(groupId)
        groupObj= ChatGroup.objects.get(pk=group_id);
        CommentObjects = groupObj.chatcomments.all().order_by('-id')
        return CommentObjects

class GroupInfoByIdView(APIView):
    def get_object(self, groupId):
        try:
            return ChatGroup.objects.get(pk=groupId)
        except ChatGroup.DoesNotExist:
            raise Http404

    def get(self, request, groupId, format=None):
        ChatGroupObject = self.get_object(groupId)
        serializer = ChatGroupSerializerGET(ChatGroupObject)
        return Response(serializer.data)



#class GeneralChatGroupView(generics.ListAPIView):
#    permission_classes = [IsAuthenticated]
#    serializer_class = GeneralChatGroupsSerializer
#    pagination_class = UserChatGroupsSetPagination
#    def get_queryset(self):
#          chatgroups = self.request.user.generalchatgroups.all();
#          return chatgroups;




#class SearchPersonalChatGroupView(generics.ListAPIView):
#      def get_loggedIn_user(self):
#        try:
#            return self.request.user
#        except self.request.user.DoesNotExist:
#            raise Http404
      
#      queryset = User.objects.all()
#      serializer_class = UserSerializerFew
#      filter_backends = [filters.SearchFilter]
#      search_fields = ['username', 'firstname','lastname','email']
#      pagination_class = StandardResultsSetPagination




class PersonalChatGroupsSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 500
    def get_paginated_response(self, data):
        return Response({

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })




class SearchPersonalChatGroupView(APIView):
    pagination_class = PersonalChatGroupsSetPagination

    def get(self, request, namestring):
        searchstring = self.kwargs['namestring']
        queryset = self.request.user.generalchatgroups.all().filter(
            Q(displayname__icontains=searchstring) |
            Q(groupuserObjects__firstname__icontains=searchstring) |
            Q(groupuserObjects__lastname__icontains=searchstring) |
            Q(groupuserObjects__username__icontains=searchstring)
        ).distinct()

        #print ("all chat groups: ", len(queryset));

        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = ChatGroupSerializerGET(paginated_queryset, many=True)


        #print ("paginated_queryset: ", paginator.get_paginated_response(serializer.data));
        return paginator.get_paginated_response(serializer.data)




