from rest_framework.generics import ListAPIView, RetrieveAPIView

from users.models import Users
from .serializers import UserSerializer

class UserListView(ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer