from django.urls import path, include
from . import views

urlpatterns = [
    #path('api/lead/', views.BookCreate.as_view()),
    #path('api/lead/author', views.AuthorCreate.as_view()),
    #path('api/lead/category', views.CategoryCreate.as_view()),
    #path('api/lead/all', views.BookList.as_view()),
    #path('api/lead/all/category/<int:category>', views.BookList.as_view()),
    #path('api/lead/all/author/<int:author>', views.BookList.as_view()),
    #path('api/lead/book/<int:pk>', views.BookItem.as_view()),

    #BOOK
    path('api/list/book', views.BookList.as_view()),
    path('api/list/book/<int:limit>', views.BookList.as_view()),
    path('api/list/book/category/<int:category>', views.BookList.as_view()),
    path('api/list/book/author/<int:author>', views.BookList.as_view()),


    path('api/single/book/<int:pk>', views.BookItem.as_view()),

    #CATEGORY
    path('api/list/category', views.CategoryList.as_view()),
    path('api/list/category/<int:limit>', views.CategoryList.as_view()),
    path('api/single/category/<int:pk>', views.CategoryItem.as_view()),

    #AUTHOR
    path('api/list/author', views.AuthorList.as_view()),
    path('api/list/author/<int:limit>', views.AuthorList.as_view()),
    path('api/single/author/<int:pk>', views.AuthorItem.as_view()),
    path('api/list/author/category/<int:category>', views.AuthorList.as_view()), #Retuns authors that have books in the specified category

    #BookSold (BEST SELLER)
    path('api/list/bestseller', views.BookSoldList.as_view()),
    path('api/list/bestseller/<int:limit>', views.BookSoldList.as_view()),
    path('api/list/bestseller/author/<int:author>', views.BookSoldList.as_view()),
    path('api/list/bestseller/category/<int:category>', views.BookSoldList.as_view()),

    #Rating
    path('api/list/rating/<int:value>', views.RatingList.as_view()),

]
