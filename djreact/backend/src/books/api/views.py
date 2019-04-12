from rest_framework.generics import ListAPIView, RetrieveAPIView
from parent.models import Book, Author
from parent.serializers import BookSerializer, AuthorSerializer

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