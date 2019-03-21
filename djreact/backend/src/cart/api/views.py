#from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from cart.models import ShoppingCart, CartItem, SavedItem
from books.models import Book
from .serializers import CartSerializer 

class CartListView( viewsets.ModelViewSet ):
    queryset = ShoppingCart.objects.all() 
    serializer_class = CartSerializer

    @detail_route(methods=['put'])
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
    
    @detail_route( methods = [ 'put' ] )
    def save_later( self, request, pk = None ):
        cart = self.get_object() 

        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        alreadySaved = SavedItem.objects.filter( cart = cart, itemsSaved = bookChoice ).first()

        if alreadySaved:
            return Response( CartSerializer(cart).data )
        else: 
            new_saved_item = SavedItem( cart = cart, itemsSaved = bookChoice )
            new_saved_item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @detail_route( methods = [ 'put' ] )
    def rem_later( self, request, pk = None ):
        cart = self.get_object() 

        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        saved = SavedItem.objects.filter( cart = cart, itemsSaved = bookChoice )

        if saved:
            saved.delete() 

        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemsView( viewsets.ModelViewSet ):
    queryset = CartItem.objects.all() 
    serializer_class = CartSerializer

class SavedItemsView( viewsets.ModelViewSet ):
    queryset = SavedItem.objects.all() 
    serializer_class = CartSerializer