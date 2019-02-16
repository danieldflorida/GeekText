from django.db import models

from books.models import Book


# Create your models here.
class ShoppingCart( models.Model ):
    updated_at = models.DateTimeField(auto_now=True)

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

    def __str__( self ):
        return '%s' % (self.itemsInCart.title)
