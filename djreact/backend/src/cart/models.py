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
        c = '${} | '.format( self.itemsInCart.price )
        d = '{}'.format( self.itemsInCart.id )
        

        ret = a + b + c + d

        return ret

class SavedItem( models.Model ):
    cart = models.ForeignKey( 
        ShoppingCart,
        related_name= 'saved', 
        on_delete = models.CASCADE,
        null = True,
        blank = True
    )

    itemsSaved = models.ForeignKey(
        Book, 
        related_name='saved',
        on_delete=models.CASCADE,
    )

    def __str__( self ):

        return '"%s" | $%.2f | %d' % ( self.itemsSaved.title, self.itemsSaved.price, self.itemsSaved.id )