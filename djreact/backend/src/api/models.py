from django.db import models

class Cart( models.Model ):
    #user = models.ForeignKey(User, on_delete = models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField( max_digits = 6, decimal_places = 2, default = 0.0 )

class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    home_address = models.CharField(max_length=200)
    date_added = models.DateField(auto_now_add=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.username

class Publishing(models.Model):
    publisher = models.CharField(max_length=200)
    release_date = models.DateField()
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Publishers"
    def __str__(self):
        return self.publisher

class Book(models.Model):
    bookID = models.IntegerField( default = 0 ) 
    title = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    cover = models.ImageField( null = True, blank=True, upload_to="book_covers/" )
    genre = models.CharField(max_length=120, null=True)
    description = models.TextField(null=True)
    publisher = models.ForeignKey(Publishing, on_delete=models.CASCADE)
    publicationDate = models.DateField(null=True)
    ISBNThirteen = models.CharField(max_length=14, null=True)
    ISBNTen = models.CharField(max_length=11, null=True)
    pages = models.IntegerField(null=True)
    authors = models.ManyToManyField('Author', blank=False)

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(default = 'src/images/DefaultProfile.png')
    bio = models.CharField(max_length=300)
    owned_books = models.ForeignKey(
        Book,
        null=True,
        related_name='owned_books',
        on_delete=models.CASCADE
    )
    def __str__(self):
        return self.user

class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Categories"
    def __str__(self):
        return self.name

class ShippingInformation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    default = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Shipping Information"
    def __str__(self):
        return self.address

class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=100)
    expdate = models.CharField(max_length=50)
    holdername = models.CharField(max_length=200)
    seccode = models.CharField(max_length=50)
    billing_address = models.CharField(max_length=200)
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Credit Cards"
    def __str__(self):
        return self.number


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    shownick = models.BooleanField(default=True)
    comment = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.comment

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    shownick = models.BooleanField(default=True)
    stars = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.date_added



class CartItem( models.Model ):
    cart = models.ForeignKey( 
        Cart,
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
        d = '{}'.format( self.itemsInCart.bookID )
        

        ret = a + b + c + d

        return ret


class SavedItem( models.Model ):
    cart = models.ForeignKey( 
        Cart,
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

        return '"%s" | $%.2f | %d' % ( self.itemsSaved.title, self.itemsSaved.price, self.itemsSaved.bookID )
"""
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    quantity = models.IntegerField()
    savedlater = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)
"""
class WishList(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Wish Lists"


class WishListDetails(models.Model):
    wishlist = models.ForeignKey(WishList, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Wish List Details"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    totalprice = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)

class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    totalprice = models.IntegerField()
    class Meta:
        verbose_name_plural = "Order Details"

    
