from django.db import models

class ShoppingCart( models.Model ):
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField( max_digits = 6, decimal_places = 2, default = 0.0 )

class User(models.Model):
    #id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    nickname = models.CharField(max_length=200)
    email = models.EmailField()
    home_address = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.username


class ShippingInformation(models.Model):
    #id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    default = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "Shipping Information"
    def __str__(self):
        return self.address

class CreditCard(models.Model):
    #id = models.AutoField(primary_key=True)
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

class Profile(models.Model):
    #id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(default = '/images/DefaultProfile.png')
    bio = models.CharField(max_length=300)
    owned_books = models.ForeignKey(
        Book,
        null=True,
        related_name='owned_books',
        on_delete=models.CASCADE
    )
    def __str__(self):
        return self.user

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


class Comment(models.Model):
    #id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    shownick = models.BooleanField(default=True)
    comment = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.comment
