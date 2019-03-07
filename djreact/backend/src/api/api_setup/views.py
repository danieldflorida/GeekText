#from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from api.models import (Book, Author, User, Category, ShippingInformation, 
CreditCard, Publishing, Comment, Rating, Cart, WishList, WishListDetails,
Order, OrderDetails)

from .serializers import (BookSerializer, AuthorSerializer, 
UserSerializer, CategorySerializer, ShippingInformationSerializer,
CreditCardSerializer, PublishingSerializer, CommentSerializer,
RatingSerializer, WishListSerializer, WishListDetailsSerializer,
OrderSerializer, OrderDetailsSerializer)
  
"""
class BookListView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
"""
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @detail_route(methods=['post', 'put'])
    def add_user(self, request, pk = None, url_path = 'add-user', url_name = 'add-user'):
        user = User(
            username = request.data['username'],
            password = request.data['password'],
            name = request.data['name'],
            email = request.data['email'],
            home_address = request.data['home_address']
            )
        
        #Search for existing user
        userExists = User.objects.filter(username = request.data['username']).first()

        if userExists:
            return 
        else:
            user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data)


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ShippingInformationViewSet(viewsets.ModelViewSet):
    serializer_class = ShippingInformationSerializer
    queryset = ShippingInformation.objects.all()

class CreditCardViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = CreditCard.objects.all()

class PublishingViewSet(viewsets.ModelViewSet):
    serializer_class = PublishingSerializer
    queryset = Publishing.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = Comment.objects.all()


class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = Rating.objects.all()


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = Cart.objects.all()


class WishListViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = WishList.objects.all()


class WishListDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = WishListDetails.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = Order.objects.all()


class OrderDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = OrderDetails.objects.all()