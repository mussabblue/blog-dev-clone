from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views 

# blog urls
blog_list = views.BlogViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

blog_detail = views.BlogViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

blog_like = views.BlogViewSet.as_view({
    'post':'like'
})

blogs_author = views.BlogViewSet.as_view({
    'get':'authors_blogs'
})
dashboard_data = views.BlogViewSet.as_view({
    'get':'dashboard_data'
})
# comment urls
comment_list = views.CommentViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
# comment_create = views.CommentViewSet.as_view({
#     'post': 'create',
# })

comment_detail = views.CommentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

comment_like = views.CommentViewSet.as_view({
    'post':'like'
})


# reply
reply_list = views.ReplyViewSet.as_view({
    'get': 'list',
    'post': 'create',
})


reply_detail = views.ReplyViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
urlpatterns = format_suffix_patterns([
    # blog urls 
    path('', blog_list, name='blog-list'),
    path('dashboard_data/', dashboard_data, name='dashboard_data'),
    path('blogs_author/', blogs_author, name='blogs_author'),
    path('<int:pk>/',  blog_detail, name='blog-detail'),
    path('<int:pk>/like', blog_like, name='blog-like'),

    #comment urls
    path('comments/', comment_list, name='comment-list'),
    # path('comments/<int:pk>/create', comment_create, name='comment-create'),
    path('comments/<int:pk>/', comment_detail, name='comment-detail'),
    path('comments/<int:pk>/like', comment_like, name='comment-like'),

    # reply 
    path('replies/', reply_list, name='reply-list'),
    path('replies/<int:pk>/', reply_detail, name='reply-detail'),
    
])
