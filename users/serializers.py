from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',)

class UserAdminSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)
    is_staff = serializers.BooleanField()

    def create(self, validated_data):
        if (validated_data['is_staff']):
            user = User.objects.create_superuser(
                validated_data['username'],
                validated_data['email'],
                validated_data['password'],
            )
        else:
            user = User.objects.create_user(
                validated_data['username'],
                validated_data['email'],
                validated_data['password'],
            )
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_staff',)

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'date_joined',)

class UserTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(UserTokenSerializer, cls).get_token(user)

        # Add custom claims
        token['is_staff'] = user.is_staff
        token['username'] = user.username

        return token