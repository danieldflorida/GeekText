'''
from django.contrib import admin

from .models import Book

admin.site.register(Book)
'''

from django.contrib import admin

from .models import Book
from .models import Author
admin.site.register(Book)
admin.site.register(Author)