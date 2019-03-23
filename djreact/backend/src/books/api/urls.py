##################
'''
from django.urls import path, include
from .import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('Books', views.BookView)
router.register('Authors', views.AuthorView)

urlpatterns = [
    path('', include(router.urls)),
]
'''
#####################


######################

from django.urls import path

from django.conf.urls.static import static 
from django.conf import settings 

from .views import BookListView, BookDetailView 
from .views import AuthorListView, AuthorDetailView


urlpatterns = [
    path('', BookListView.as_view()),
    path('<pk>', BookDetailView.as_view())
] + static( settings.MEDIA_URL )

##########################
