from rest_framework import serializers 
from django.contrib.auth import get_user_model 
from django.contrib.auth import authenticate
# from rest_framework.response import Response 
from .models import Profile, Tag

Account = get_user_model()

# ACCOUNT SERIALIZER 
class AccountSerializer(serializers.ModelSerializer):
    profile             = serializers.SerializerMethodField('user_profile')

    class Meta:
        model = Account
        fields = (
            'id',
            'first_name',
            'get_full_name',
            'email',
            'joined_date',
            'profile',
            
        )

    def user_profile(self, obj):
        serializer = ProfileSerializer(obj.profile)
        return serializer.data

    

# REGISTER SERIALIZER 
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account 
        fields = ('email', 'first_name', 'last_name',  'password')

        extra_kwargs = {
            'password':{
                'write_only':True
            }
        }

    def create(self, validated_data):
        user = Account.objects.create_user(
               validated_data['email'],
                validated_data['first_name'], 
                validated_data['last_name'],               
                validated_data['password']
        )
        return user 


# LOGIN SERIALIZER
class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user 
        raise serializers.ValidationError('Incorrect Email or Password')



# PROFILE SERIALIZER 
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile 
        fields = (
            'profile_image',
            'followers',
            'following_tags',
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag 
        fields = (
            'id',
            'name',
            'description',
            'color',
        ) 


