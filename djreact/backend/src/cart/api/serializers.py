from rest_framework import serializers
from cart.models import ShoppingCart, CartItem
from books.api.serializers import BookSerializer

class CartSerializer( serializers.ModelSerializer ):
    items = serializers.StringRelatedField( many = True ) 

    class Meta:
        model = ShoppingCart
        fields = ( 'id', 'updated_at', 'items', 'price' )

class CartItemSerialize( serializers.ModelSerializer ):

    cart = CartSerializer( read_only = True )
    itemsInCart = BookSerializer( read_only = True ) 

    class Meta:
        model = CartItem
        fields = ( 'id', 'cart', 'itemsInCart', 'quantity' )