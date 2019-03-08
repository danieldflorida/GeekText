from rest_framework import serializers
from books.models import Book
from books.models import Author


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('bookID', 'title', 'price', 'cover', 'genre', 'description', 'publisher', 'publicationDate', 'ISBNThirteen', 'ISBNTen', 'pages', 'authors')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'biography')