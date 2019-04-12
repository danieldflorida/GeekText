from django.db import models
from cart.models import ShoppingCart as Cart
from books.models import Book
# Create your models here.

class User(models.Model):
    #id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    home_address = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.username

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

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    shownick = models.BooleanField(default=True)
    comment = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.comment

