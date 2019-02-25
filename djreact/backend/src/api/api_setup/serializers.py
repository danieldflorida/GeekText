from rest_framework import serializers

from api.models import (Book, Author, User, Category, ShippingInformation, 
CreditCard, Publishing, Comment, Rating, Cart, WishList, WishListDetails,
Order, OrderDetails)
"""
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('bookID', 'title', 'content', 'cover')
"""
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('author', 'category', 'name', 'cover', 'description', 'date_added')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'bio', 'date_added')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'name', 'email', 'home_address', 'date_added')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description', 'date_added')


class ShippingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInformation
        fields = ('user', 'address', 'default', 'date_added')

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('user', 'number', 'expdate', 'holdername', 'seccode',
        'billing_address', 'date_added')


class PublishingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publishing
        fields = ('book', 'publisher', 'release_date', 'date_added')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('user', 'book', 'shownick', 'comment', 'date_added')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('user', 'book', 'shownick', 'stars', 'date_added')

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('user', 'book', 'quantity', 'savedlater', 'date_added')

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ('user', 'name', 'description', 'date_added')

class WishListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishListDetails
        fields = ('wishlist', 'book', 'quantity', 'date_added')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user', 'quantity', 'totalprice', 'date_added')


class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = ('order', 'book', 'quantity', 'totalprice')
