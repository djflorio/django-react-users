from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsUserOrAdmin
from .serializers import ( 
    UserSerializer, UserAdminSerializer, UserListSerializer, UserTokenSerializer
)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer

class UserAdminCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer

class UserRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend,)
    ordering_fields = ('username', 'date_joined',)
    filter_fields = ('is_staff',)

class UserDestroyView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrAdmin,)

class UserTokenView(TokenObtainPairView):
    serializer_class = UserTokenSerializer