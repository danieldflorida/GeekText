

################
'''
from django.db import models


class Book(models.Model):
    bookID = models.IntegerField( default = 0 ) 
    title = models.CharField(max_length=120)
    content = models.TextField()
    cover = models.ImageField( null = True, blank=True, upload_to="book_covers/" )
    price = models.DecimalField( max_digits = 6, decimal_places = 2, default = 0.0 )

    def __str__(self):
        return self.title
'''        
################

from django.db import models


class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    cover = models.ImageField( null = True, blank=True, upload_to="book_covers/" )
    genre = models.CharField(max_length=120, null=True)
    description = models.TextField(null=True)
    publisher = models.CharField(max_length=120, null=True)
    publicationDate = models.DateField(null=True)
    ISBNThirteen = models.CharField(max_length=14, null=True)
    ISBNTen = models.CharField(max_length=11, null=True)
    pages = models.IntegerField(null=True)
    authors = models.ManyToManyField('Author', blank=True)

    def __str__(self):
        return self.title


class Author(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=120, null=False)
    biography = models.TextField(null=True)
    

    def __str__(self):
        return self.name

