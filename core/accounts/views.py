from rest_framework import generics, viewsets
from .serializers import (
            AccountSerializer,
            RegisterSerializer,
            LoginSerializer, TagSerializer
)
from knox.models import AuthToken 
from rest_framework.response import Response 
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import Tag 


User = get_user_model()
# Account API 
class AccountAPI(generics.RetrieveAPIView):
    serializer_class = AccountSerializer 

    def get_object(self):
        return self.request.user 
    

# Register API 
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args , **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save() 
        return Response({
            "user":AccountSerializer(user, context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1],

        })
    



# Login API 
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args , **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data 
        return Response({
            "user":AccountSerializer(user, context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1],

        })

class FollowOrUnfollow(generics.GenericAPIView):

    def post(self, request, pk, *args, **kwargs):
        follower = request.user
        followed = get_object_or_404(User, pk=pk)
        
        following = False  
        if follower not in followed.profile.followers.all():
            followed.profile.followers.add(follower)
            following = True 
        else:
            followed.profile.followers.remove(follower)
        return Response({
            'following':following
        })
            


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer 
    
