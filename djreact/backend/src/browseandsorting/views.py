from django.shortcuts import render
from django.http import Http404, HttpResponse

from parent.models import Book, Category, Author, BookSold
from parent.serializers import BookSerializer, AuthorSerializer, CategorySerializer, BookSoldSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

#class BookCreate(generics.ListCreateAPIView):
#    queryset = Book.objects.all()
#    serializer_class = BookSerializer
#
#class AuthorCreate(generics.ListCreateAPIView):
#    queryset = Author.objects.all()
#    serializer_class = AuthorSerializer
#
#class CategoryCreate(generics.ListCreateAPIView):
#    queryset = Category.objects.all()
#    serializer_class = CategorySerializer


#Class that handle list of book
class BookList(APIView):
    def get_objects(self, category=None, author=None):
        if category==None and author==None:
            return Book.objects.all()
        elif category:
            return Book.objects.filter(category=category)
        elif author:
            return Book.objects.filter(authors=author)
        
    def get(self, request, category=None, author=None, limit=None):
        if category:
            books = self.get_objects(category=category)
        elif author:
            books = self.get_objects(author=author)
        else:
            books = self.get_objects()

        if limit and limit != 0:
            books = books[:limit]
            
        serializer = BookSerializer(books, many=True, context={"request": request})
        return Response(serializer.data)

#Class that handles a single book item
class BookItem(APIView):
    def get_object(self, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Book.DoesNotExist

        return book

    def get(self, request, pk):
        try:
            serializer = BookSerializer(self.get_object(pk=pk))
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data)

class CategoryList(APIView):
    def get(self, request, limit=None):
        categoryList = Category.objects.all()

        if limit and limit != 0:
            categoryList = categoryList[:limit]

        serializer = CategorySerializer(categoryList, many=True)
        return Response(serializer.data)

class CategoryItem(APIView):
    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

class AuthorList(APIView):
    def get(self, request, limit=None, category=None):
        if category:
            authorList = []
            for book in Book.objects.filter(category=category):
                #temp = book.author
                found = False

                for author in book.authors.all():
                    found = False
                    for item in authorList:
                        if author.id == item.id:
                            found = True
                            break
                    if not found:
                        authorList.append(author)
        else:
            authorList = Author.objects.all()

        if limit and limit != 0:
            authorList = authorList[:limit]

        serializer = AuthorSerializer(authorList, many=True)
        return Response(serializer.data)

class AuthorItem(APIView):
    def get(self, request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

class BookSoldList(APIView):
    def get(self, request, category=None, author=None, limit=None):
        bookSoldList = BookSold.objects.all()

        if category:
            bookSoldList = bookSoldList.filter(category=category)

        if author:
            bookSoldList = bookSoldList.filter(author=author)
            
        if limit and limit != 0:
            bookSoldList = bookSoldList[:limit]

        serializer = BookSoldSerializer(bookSoldList, many=True)
        return Response(serializer.data)
