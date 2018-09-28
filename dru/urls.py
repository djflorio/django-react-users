"""dru URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
)
from users.views import (
  UserCreateView, UserUpdateView, UserAdminCreateView, UserRetrieveView,
  UserListView, UserDestroyView, UserTokenView
)

urlpatterns = [
    path('api/users/', UserListView.as_view()),
    path('api/users/new/', UserCreateView.as_view()),
    path('api/users/edit/<int:pk>/', UserUpdateView.as_view()),
    path('api/users/<int:pk>/', UserRetrieveView.as_view()),
    path('api/users/admin-new/', UserAdminCreateView.as_view()),
    path('api/users/delete/<int:pk>/', UserDestroyView.as_view()),
    path('api/admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', UserTokenView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/token/verify', TokenVerifyView.as_view()),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
