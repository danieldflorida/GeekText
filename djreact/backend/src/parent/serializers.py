from rest_framework import serializers
from parent.models import Author, Book, ShoppingCart, CartItem, SavedItem, Category, Rating, BookSold

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
    category = CategorySerializer(read_only=True)
    
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