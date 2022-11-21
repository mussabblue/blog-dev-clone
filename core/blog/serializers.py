from rest_framework import serializers 
from .models import Blog, Comment, Reply 
from  accounts.serializers import AccountSerializer

class BlogSerializer(serializers.ModelSerializer):
    comments                = serializers.SerializerMethodField('get_blog_comments')
    author                  = serializers.SerializerMethodField('get_blog_author')
    class Meta:
        model = Blog 
        fields = (
            'id', 
            'title', 
            'content', 
            'cover_image',
            'pub_date',
            'author',
            'likes',
            'comments',
            'blog_tags',
            )
    
    def get_blog_comments(self, obj):
        serializer = CommentSerializer(obj.comments.all(), many=True)
        return serializer.data
    
    def get_blog_author(self, obj):
        return AccountSerializer(obj.author).data


class CommentSerializer(serializers.ModelSerializer):
    author                  = serializers.SerializerMethodField('get_blog_author')
    replies                 =serializers.SerializerMethodField('get_comment_replies')
    class Meta:
        model = Comment
        fields = (
            'id', 
            'blog',
            'content', 
            'pub_date',
            'author',
            'likes',
            'replies'
            )

    def get_blog_author(self, obj):
        return AccountSerializer(obj.author).data
    
    def get_comment_replies(self,obj):
        return ReplySerializer(obj.replies.all(),many=True).data




class ReplySerializer(serializers.ModelSerializer):
    author                  = serializers.SerializerMethodField('get_blog_author')
    class Meta:
        model = Reply
        fields = (
            'id', 
            'comment',
            'content', 
            'pub_date',
            'author',
            )

    def get_blog_author(self, obj):
        return AccountSerializer(obj.author).data



