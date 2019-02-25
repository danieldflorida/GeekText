#from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from cart.models import *
from books.models import Book
from .serializers import CartSerializer 

class CartListView( viewsets.ModelViewSet ):
    queryset = ShoppingCart.objects.all() 
    serializer_class = CartSerializer

    @detail_route(methods=['post', 'put'])
    def add_to_cart( self, request, pk = None ):
        cart = self.get_object() 
        
        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        cart.price = cart.price + bookChoice.price 
        cart.save()

        alreadyInCart = CartItem.objects.filter( cart = cart, itemsInCart = bookChoice ).first()

        if alreadyInCart:
            alreadyInCart.quantity += 1
            alreadyInCart.save()
        else: 
            new_cart_item = CartItem( cart = cart, itemsInCart = bookChoice )
            new_cart_item.save() 

        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemsView( viewsets.ModelViewSet ):
    queryset = CartItem.objects.all() 
    serializer_class = CartSerializer