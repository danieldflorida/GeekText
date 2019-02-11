from django.urls import path

from django.conf.urls.static import static 
from django.conf import settings 

from .views import UserListView, UserDetailView

urlpatterns = [
    path('', UserListView.as_view()),
    path('<pk>', UserDetailView.as_view())
] + static( settings.MEDIA_URL )