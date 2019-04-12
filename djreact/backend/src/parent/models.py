from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    home_address = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=120, null=False)
    biography = models.TextField(null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    authors = models.ManyToManyField(Author)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    cover = models.ImageField(null = True, blank=True, upload_to="book_covers/")
    title = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    description = models.TextField(null=True)
    publisher = models.CharField(max_length=120, null=True)
    publicationDate = models.DateField(null=True)
    ISBNThirteen = models.CharField(max_length=14, null=True)
    ISBNTen = models.CharField(max_length=11, null=True)
    pages = models.IntegerField(null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

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
    created_at = models.DateField(auto_now_add=True)

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
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):

        return '"%s" | $%.2f | %d' % (self.itemsSaved.title, self.itemsSaved.price, self.itemsSaved.id)

class BookSold(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    count = models.IntegerField()

class Publishing(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    publisher = models.CharField(max_length=200)
    release_date = models.DateField()
    created_at = models.DateField(auto_now_add=True)

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    shownick = models.BooleanField(default=True)
    stars = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
