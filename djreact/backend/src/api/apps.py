from django.apps import AppConfig
"""(Book, Author, User, Category, ShippingInformation, 
CreditCard, Publishing, Comment, Rating, Cart, WishList, WishListDetails,
Order, OrderDetails)
"""
"""
class BooksConfig(AppConfig):
    name = 'books'
"""
class BookConfig(AppConfig):
    name = 'book'

class AuthorConfig(AppConfig):
    name = 'author'

class UserConfig(AppConfig):
    name = 'user'

class CategoryConfig(AppConfig):
    name = 'category'

class ShippingInformationConfig(AppConfig):
    name = 'shippinginformation'

class PublishingCardConfig(AppConfig):
    name = 'publishing'

class CommentConfig(AppConfig):
    name = 'comment'

class RatingConfig(AppConfig):
    name = 'rating'

class CartConfig(AppConfig):
    name = 'cart'

class WishListConfig(AppConfig):
    name = 'wishlist'

class WishListDetailsConfig(AppConfig):
    name = 'wishlistdetails'

class OrderConfig(AppConfig):
    name = 'order'

class OrderDetailsConfig(AppConfig):
    name = 'orderdetails'
