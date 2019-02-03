from django.db import models


class Book(models.Model):
    bookID = models.IntegerField( default = 0 ) 
    title = models.CharField(max_length=120)
    content = models.TextField()
    cover = models.ImageField( null = True, blank=True, upload_to="book_covers/" )

    def __str__(self):
        return self.title
