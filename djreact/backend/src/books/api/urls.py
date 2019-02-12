from django.urls import path

from django.conf.urls.static import static 
from django.conf import settings 

from .views import BookListView, BookDetailView

urlpatterns = [
    path('', BookListView.as_view()),
    path('<pk>', BookDetailView.as_view())
] + static( settings.MEDIA_URL )

