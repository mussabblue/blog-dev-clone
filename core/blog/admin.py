from django.contrib import admin
from .models import Blog, Comment, Reply


class ReplyTabularInline(admin.TabularInline):
    model = Reply
    extra = 1
    verbose_name = 'Reply'
    verbose_name_plural = 'Replies'


class CommentTabularInline(admin.TabularInline):
    model = Comment
    extra = 1
    verbose_name = 'Comment'
    verbose_name_plural = 'Comments'
    inlines = [ReplyTabularInline, ]


class CommentAdmin(admin.ModelAdmin):
    display_list= ('content', 'date_created')  
    
    inlines = [ReplyTabularInline,] 


class BlogAdmin(admin.ModelAdmin):
    display_list = ('title', 'content', 'date_created')
    inlines = [CommentTabularInline,]


admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment, CommentAdmin)