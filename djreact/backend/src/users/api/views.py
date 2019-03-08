#from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import viewsets
from users.models import Users
from .serializers import UserSerializer

from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
"""
class UserListView(ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class UserCreateView(CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class UserUpdateView(UpdateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class UserDeleteView(DestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    """

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Users.objects.all()
    