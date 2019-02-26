from django.db import models

from books.models import Book


# Create your models here.
class ShoppingCart( models.Model ):
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField( max_digits = 6, decimal_places = 2, default = 0.0 )

class CartItem( models.Model ):
    cart = models.ForeignKey( 
        ShoppingCart,
        related_name= 'items', 
        on_delete = models.CASCADE,
        null = True,
        blank = True
    )
    itemsInCart = models.ForeignKey(
        Book, 
        related_name='items',
        on_delete=models.CASCADE,
    )
    quantity = models.IntegerField( default = 1 )

    def __str__( self ):
        
        a = '"{}" | '.format( self.itemsInCart.title )
        b = '{} | '.format( self.quantity )
        c = '${}'.format( self.itemsInCart.price )

        ret = a + b + c    

        return ret