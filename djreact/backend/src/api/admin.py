from django.contrib import admin

from .models import (Book, Author, User, Category, ShippingInformation, 
CreditCard, Publishing, Comment, Rating, Cart, WishList, WishListDetails,
Order, OrderDetails)


admin.site.register(Book)
admin.site.register(Author)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(ShippingInformation)
admin.site.register(CreditCard)
admin.site.register(Publishing)
admin.site.register(Comment)
admin.site.register(Rating)
admin.site.register(Cart)
admin.site.register(WishList)
admin.site.register(WishListDetails)
admin.site.register(Order)
admin.site.register(OrderDetails)