from django.urls import path, include
from knox import views as knox_views
from . import views 

tag_list = views.TagViewSet.as_view({
    'get':'list'
})
urlpatterns = [  

    path('user', views.AccountAPI.as_view()),
    path('followers/<int:pk>/',  views.FollowOrUnfollow.as_view()),
    path('register', views.RegisterAPI.as_view()),
    path('login', views.LoginAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view()),

    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('tags', tag_list, name='tag-list'),

]
