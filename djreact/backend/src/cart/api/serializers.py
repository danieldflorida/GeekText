from rest_framework import serializers
from parent.models import ShoppingCart, CartItem, SavedItem
from books.api.serializers import BookSerializer

class CartSerializer( serializers.ModelSerializer ):
    items = serializers.StringRelatedField( many = True ) 
    saved = serializers.StringRelatedField( many = True ) 

    class Meta:
        model = ShoppingCart
        fields = ( 'id', 'updated_at', 'items', 'price', 'saved' )

class CartItemSerialize( serializers.ModelSerializer ):

    cart = CartSerializer( read_only = True )
    itemsInCart = BookSerializer( read_only = True ) 

    class Meta:
        model = CartItem
        fields = ( 'id', 'cart', 'itemsInCart', 'quantity' )

class SavedItemSerialize( serializers.ModelSerializer ):
    cart = CartSerializer( read_only = True )
    itemsSaved = BookSerializer( read_only = True ) 

    class Meta: 
        model = SavedItem
        fields = ( 'id', 'cart', 'itemsSaved' )