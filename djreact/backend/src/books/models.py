from django.db import models


class Book(models.Model):
    bookID = models.IntegerField( default = 0 ) 
    title = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    cover = models.ImageField( null = True, blank=True, upload_to="book_covers/" )
    genre = models.CharField(max_length=120, null=True)
    description = models.TextField(null=True)
    publisher = models.CharField(max_length=120, null=True)
    publicationDate = models.DateField(null=True)



    def __str__(self):
        return self.title
