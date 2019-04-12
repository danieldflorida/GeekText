"""djreact URL Configuration

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
from django.urls import path, include

from django.conf.urls.static import static 
from django.conf.urls import url
from django.conf import settings 
from rest_framework import routers 
from cart.api import views 
from profilemanagement.views import (UserViewSet, ProfileViewSet, ShippingInformationViewSet, CreditCardViewSet, CommentViewSet)

router = routers.DefaultRouter()
router.register( r'carts', views.CartListView )
router.register( r'cart_items', views.CartItemsView )
router.register(r'users', UserViewSet, base_name='user')
router.register(r'profiles', ProfileViewSet, base_name='profile')
router.register(r'shippinginformation', ShippingInformationViewSet, base_name='shippinginformation')
router.register(r'creditcards', CreditCardViewSet, base_name='creditcard')
router.register(r'comments', CommentViewSet, base_name='comment')

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('books.api.urls')),
    url( r'^', include(router.urls)),
    path('', include('browseandsorting.urls')),
    #path('cart/', include( 'cart.api.urls'))

] + static( settings.MEDIA_URL, document_root = settings.MEDIA_ROOT )
