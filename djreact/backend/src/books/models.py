from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    home_address = models.CharField(max_length=200)
    date_added = models.DateField(auto_now_add=True)

class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    
class Category(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

class ShippingInformation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    default = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)

class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=100)
    expdate = models.CharField(max_length=50)
    holdername = models.CharField(max_length=200)
    seccode = models.CharField(max_length=50)
    billing_address = models.CharField(max_length=200)
    date_added = models.DateField(auto_now_add=True)

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    cover = models.FilePathField(path='browsing/images/covers')
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

class Publishing(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    publisher = models.CharField(max_length=200)
    release_date = models.DateField()
    date_added = models.DateField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    shownick = models.BooleanField(default=True)
    comment = models.TextField()
    date_added = models.DateField(auto_now_add=True)

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    shownick = models.BooleanField(default=True)
    starts = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    quantity = models.IntegerField()
    savedlater = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)

class WishList(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

class WishListDetails(models.Model):
    wishlist = models.ForeignKey(WishList, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)

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
