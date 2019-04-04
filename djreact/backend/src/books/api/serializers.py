from rest_framework import serializers
from books.models import Book
from books.models import Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'biography', 'books')
        #depth = 1


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = ('id', 'title', 'price', 'cover', 'genre', 'description', 'publisher', 'publicationDate', 'ISBNThirteen', 'ISBNTen', 'pages', 'authors')


