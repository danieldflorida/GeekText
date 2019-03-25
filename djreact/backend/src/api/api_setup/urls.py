"""
from django.urls import path

from django.conf.urls.static import static 
from django.conf import settings 

from .views import BookListView, BookDetailView

urlpatterns = [
    path('', BookListView.as_view()),
    path('<pk>', BookDetailView.as_view())
] + static( settings.MEDIA_URL )
"""
from django.urls import path

from django.conf.urls.static import static 
from django.conf import settings 

from api.api_setup.views import (UserViewSet, ProfileViewSet, BookViewSet, AuthorViewSet,
 CategoryViewSet, ShippingInformationViewSet, CreditCardViewSet,
PublishingViewSet, CommentViewSet, RatingViewSet, CartViewSet, WishListViewSet,
WishListDetailsViewSet, OrderViewSet, OrderDetailsViewSet)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'profiles', ProfileViewSet, base_name='profile')
router.register(r'books', BookViewSet, base_name='book')
router.register(r'authors', AuthorViewSet, base_name='author')
router.register(r'categories', CategoryViewSet, base_name='category')
router.register(r'shippinginformation', ShippingInformationViewSet, base_name='shippinginformation')
router.register(r'creditcards', CreditCardViewSet, base_name='creditcard')
router.register(r'publishers', PublishingViewSet, base_name='publishing')
router.register(r'comments', CommentViewSet, base_name='comment')
router.register(r'ratings', RatingViewSet, base_name='rating')
router.register(r'carts', CartViewSet, base_name='cart')
router.register(r'wishlists', WishListViewSet, base_name='wishlist')
router.register(r'wishlistdetails', WishListDetailsViewSet, base_name='wishlistdetails')
router.register(r'order', OrderViewSet, base_name='order')
router.register(r'orderdetails', OrderDetailsViewSet, base_name='orderdetails')
urlpatterns = router.urls
