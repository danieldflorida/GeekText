from rest_framework import serializers
from parent.models import (Author, Book, ShoppingCart, CartItem, SavedItem, Category, Rating, BookSold,
User, Profile, CreditCard, ShippingInformation, Comment)

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    rating_set = RatingSerializer(many=True, read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'title', 'price', 'cover', 'category', 'description', 'publisher', 'publicationDate', 'ISBNThirteen', 'ISBNTen', 'pages', 'authors', 'rating_set', 'photo_url', 'created_at')

    def get_photo_url(self, book):
        request = self.context.get('request')
        photo_url = book.cover.url
        return request.build_absolute_uri(photo_url)

class CartSerializer(serializers.ModelSerializer):
    items = serializers.StringRelatedField(many = True) 
    saved = serializers.StringRelatedField(many = True) 

    class Meta:
        model = ShoppingCart
        fields = ('id', 'updated_at', 'items', 'price', 'saved')

class CartItemSerialize(serializers.ModelSerializer):
    cart = CartSerializer(read_only = True)
    itemsInCart = BookSerializer(read_only = True) 

    class Meta:
        model = CartItem
        fields = ('id', 'cart', 'itemsInCart', 'quantity')

class SavedItemSerialize(serializers.ModelSerializer):
    cart = CartSerializer(read_only = True)
    itemsSaved = BookSerializer(read_only = True) 

    class Meta: 
        model = SavedItem
        fields = ('id', 'cart', 'itemsSaved')


class BookSoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookSold
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'password', 'name', 'nickname', 'email', 'home_address', 'cart', 'created_at')

class ProfileSerializer(serializers.ModelSerializer):
    owned_books = serializers.StringRelatedField( many = True ) 
    class Meta:
        model = Profile
        fields = ('id', 'user', 'picture', 'bio', 'owned_books')

class ShippingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInformation
        fields = ('id', 'user', 'name','address', 'default', 'date_added')

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'user', 'number', 'expdate', 'holdername', 'seccode',
        'billing_address', 'date_added')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'book', 'shownick', 'comment', 'date_added')
