########################
'''
from django.shortcuts import render
from rest_framework import viewsets
from books.models import Book
from .serializers import BookSerializer, AuthorSerializer

class BookView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
'''
########################


################

from rest_framework.generics import ListAPIView, RetrieveAPIView
from books.models import Book
from .serializers import BookSerializer

from books.models import Author
from .serializers import AuthorSerializer

class AuthorListView(ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetailView(RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookListView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer





#######################