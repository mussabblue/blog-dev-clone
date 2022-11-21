from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets 
from rest_framework.decorators import action
from  rest_framework.response import Response 
from .serializers import BlogSerializer, CommentSerializer, ReplySerializer
from .models import Blog, Comment,Reply


class BlogViewSet(viewsets.ModelViewSet):
    queryset                = Blog.objects.all()
    serializer_class        = BlogSerializer


    @action(detail=True)
    def like(self, request, *args, **kwarags):
        blog = self.get_object() 
        user = request.user 
        liked = False
        if user in blog.likes.all():
            blog.likes.remove(user)
        else:
            blog.likes.add(user)
            liked = True 
        return Response({
            'status':liked
        })
    
    @action(detail=False)
    def authors_blogs(self, request, *args, **kwargs):
        blogs = Blog.objects.filter(author=request.user)
        return Response({
            'authors_posts':BlogSerializer(blogs, many=True).data
        })
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False)
    def dashboard_data(self, request, *args, **kwargs):
        user = request.user 
        blogs = Blog.objects.filter(author=user)
        return Response({
            "Total_post_reactions":sum(b.likes.count() for b in blogs),
            "Total_post_views":7,
            "Listings_created":5,
            "Credits_available":2,
            "list":[
                {
                'title':'Posts',
                'id':1,
                'count':blogs.count(),
                'content':BlogSerializer(blogs, many=True).data
                },
                 {
                'title':'Followers',
                'id':2,
                'count':7,
                'content':BlogSerializer(blogs, many=True).data
                },
                 {
                'title':'Following tags',
                'count':7,
                'id':3,
                'content':BlogSerializer(blogs, many=True).data
                },
            ]
        })





class CommentViewSet(viewsets.ModelViewSet):
    queryset                = Comment.objects.all()
    serializer_class        = CommentSerializer


    @action(detail=True)
    def like(self, request, *args, **kwarags):
        comment = self.get_object() 
        user = request.user 
        liked = False
        if user in comment.likes.all():
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
            liked = True 
        return Response({
            'status':liked
        })
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)




class ReplyViewSet(viewsets.ModelViewSet):
    queryset                = Reply.objects.all()
    serializer_class        = ReplySerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

