from django.contrib import admin
from .models import Author, Book, ShoppingCart, CartItem, SavedItem, Category, Rating, User

# Register your models here.
admin.site.register(User)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Category)
admin.site.register(Rating)
admin.site.register(ShoppingCart)
admin.site.register(CartItem)
admin.site.register(SavedItem)
