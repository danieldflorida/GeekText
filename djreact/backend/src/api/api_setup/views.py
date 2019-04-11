#from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.decorators import list_route
from django.views.generic.edit import UpdateView
from django.contrib.auth.hashers import make_password, check_password

from api.models import (Book, Author, User, Profile, Category, ShippingInformation, 
CreditCard, Publishing, Comment, Rating, Cart, WishList, WishListDetails, CartItem, 
Order, OrderDetails, SavedItem)

from api.api_setup.serializers import (BookSerializer, AuthorSerializer, CartSerializer,
UserSerializer, ProfileSerializer, CategorySerializer, ShippingInformationSerializer,
CreditCardSerializer, PublishingSerializer, CommentSerializer, CartItemSerializer,
RatingSerializer, WishListSerializer, WishListDetailsSerializer, SavedItemSerializer,
OrderSerializer, OrderDetailsSerializer)
  
"""
class BookListView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
"""
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    #populates the rest of the tables when creating accounts
    def create_account(self, user):
        
        #CREATE PROFILE
        profile = Profile(
            user = user,
            bio = ''
        )
        profile.save()

        #CREATE WISHLIST
        wishlist = WishList(
            user = user,
            name = '',
            description=''
        )

        wishlist.save()

        #CREATE CART     
        cart = Cart(
            user = user,
            price = 0
            )
        cart.save()

        user.cart = cart #references the new cart on the user
        user.save() 
        print(user.cart)
        return

    @list_route(methods=['post', 'put'])
    def add_user(self, request, pk = None):
        
        hashedPass = make_password(request.data['password'])
        user = User(
            username = request.data['username'],
            password = hashedPass,
            name = request.data['name'],
            email = request.data['email'],
            home_address = request.data['home_address']
            )
        print(user.password) #testing the hash

        #Search for existing user
        userExists = User.objects.filter(username = request.data['username']).first()

        if userExists:
            return Response(data=None)
        else:
            user.save()

        self.create_account(user) #pass user to make the rest of the tables

        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    
    @detail_route(methods=['put'])
    def update_user(self, request, pk=None):
        
        obj, created = User.objects.update_or_create(username=request.data['username'], 
        defaults={
            'email': request.data['email'],
            'nickname' : request.data['nickname'],
            'home_address': request.data['home_address'],
            'name': request.data['name']
            })
        print(created)
        
        serializer = UserSerializer(obj)
        return Response(serializer.data)

    @list_route(methods=['get', 'post'])
    def find_user(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        exists = User.objects.filter(username = request.data['username']).exists()
        if not exists: #filter by username then by email
            user = User.objects.filter(email=request.data['email']).first()
        
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @list_route(methods=['post'])
    def find_pk(self, request):
        user = User.objects.get(username=request.data['username'])
        return Response(data=user.pk)

    @detail_route(methods=['put'])
    def set_cart(self, request, pk=None):
        cart = Cart.objects.get(pk=request.data['cart'])
        obj, created = User.objects.update_or_create(username=request.data['username'], 
        defaults={'cart': cart})
        print(created)
        
        serializer = UserSerializer(obj)
        return Response(serializer.data)
    
    @list_route(methods=['post'])
    def login(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        check = check_password(request.data['password'], user.password)
        if check:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            print('Login credentials incorrect')
            return

    @detail_route(methods=['put'])
    def change_password(self, request, pk=None):
        obj = User.objects.get(id=request.data['id'])
        if not obj:
            return 
        else:
            hashed = make_password(request.data['password'], salt=None, hasher='default')
            obj.password = hashed
            obj.save()
            """obj, created = User.objects.update_or_create(id=request.data['id'], 
            defaults={
                'password': request.data['password']
                })
            print(created)"""
            serializer = UserSerializer(obj)
            return Response(serializer.data)

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @list_route(methods=['post'])
    def create_profile(self, request):
        
        user = User.objects.get(username=request.data['username'])

        profile = Profile(
            user = user,
            bio = ''
        )
        profile.save()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    @list_route(methods=['get', 'post'])
    def find_profile(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        profile = Profile.objects.filter(user = user).first()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    @list_route(methods=['post'])
    def find_pk(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        profile = Profile.objects.get(user = user)
        return Response(profile.pk)

    @detail_route(methods=['put'])
    def update_profile(self, request, pk=None):
        user = User.objects.filter(username=request.data['username']).first()

        obj, created = Profile.objects.update_or_create(user=user.id, 
        defaults={
            #'picture': request.data['picture'], 
            'bio': request.data['bio']
            })
        print(created)

        serializer = ProfileSerializer(obj)
        return Response(serializer.data)


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ShippingInformationViewSet(viewsets.ModelViewSet):
    serializer_class = ShippingInformationSerializer
    queryset = ShippingInformation.objects.all()

    @list_route(methods=['get', 'post'])
    def find_shippinginformation(self, request): #returns the list of credit cards for a user
        user = User.objects.filter(username = request.data['username']).first()
        addresses = ShippingInformation.objects.filter(user = user)
        info = list(addresses)
        data = []
        for i in range(len(info)):
            serializer = ShippingInformationSerializer(info[i])
            data.append(serializer.data)
        
        print(data)
        return Response(data=data)

    @list_route(methods=['post'])
    def create_shippinginformation(self, request):
        user = User.objects.filter(username=request.data['username']).first()
        info = ShippingInformation.objects.filter(user=user, address=request.data['address']).exists()
        if info: #if a credit card num exists for that user
            return
        else:
            shipping = ShippingInformation(user=user, 
            name=request.data['name'],
            address=request.data['address']
            )
            shipping.save()

            serializer = ShippingInformationSerializer(shipping)
            return Response(serializer.data)
        
    @detail_route(methods=['put'])
    def update_shippinginformation(self, request, pk=None):
        user = User.objects.filter(username=request.data['username']).first()
        print(request.data['id'])
        obj, created = ShippingInformation.objects.update_or_create(id=request.data['id'], 
        defaults=
        {'user' : user,
         'name' : request.data['name'],
         'address' : request.data['address']
         })
        print(created)

        serializer = ShippingInformationSerializer(obj)
        return Response(serializer.data)

class CreditCardViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = CreditCard.objects.all()

    @list_route(methods=['get','post'])
    def find_creditcard(self, request):
        user = User.objects.filter(username = request.data['username'].first())
        creditcard = CreditCard.objects.filter(user = user)

        if creditcard:
            serializer = CreditCardSerializer(creditcard)
            return Response(serializer.data)
        else:
            return
        

    @list_route(methods=['post'])
    def find_pk(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        creditcard = CreditCard.objects.get(user = user)
        return Response(creditcard.pk)

    @detail_route(methods=['put'])
    def update_creditcard(self, request, pk=None):
        user = User.objects.filter(username=request.data['username']).first()
        print(request.data['id'])
        obj, created = CreditCard.objects.update_or_create(id=request.data['id'], 
        defaults=
        {'user' : user,
         'number': request.data['number'],
         'expdate': request.data['expdate'],
         'holdername': request.data['holdername'],
         'seccode': request.data['seccode'],
         'billing_address': request.data['billing_address']})
        print(created)

        serializer = CreditCardSerializer(obj)
        return Response(serializer.data)

    @list_route(methods=['post'])
    def create_creditcard(self, request):
        user = User.objects.filter(username=request.data['username']).first()
        ccnum = CreditCard.objects.filter(user=user, number=request.data['number']).exists()
        if ccnum: #if a credit card num exists for that user
            return
        else:
            creditcard = CreditCard(user=user, 
            number = request.data['number'],
            expdate = request.data['expdate'],
            holdername = request.data['holdername'],
            seccode = request.data['seccode'],
            billing_address = request.data['billing_address']
            )
            creditcard.save()

            serializer = CreditCardSerializer(creditcard)
            return Response(serializer.data)
    
    @list_route(methods=['get', 'post'])
    def find_creditcards(self, request): #returns the list of credit cards for a user
        user = User.objects.filter(username = request.data['username']).first()
        creditcards= CreditCard.objects.filter(user = user)
        cards = list(creditcards)
        data = []
        for i in range(len(cards)):
            serializer = CreditCardSerializer(cards[i])
            data.append(serializer.data)
        
        print(data)
        return Response(data=data)


class PublishingViewSet(viewsets.ModelViewSet):
    serializer_class = PublishingSerializer
    queryset = Publishing.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    @list_route(methods=['get', 'post'])
    def find_comments(self, request):
        user = User.objects.filter(username = request.data['username']).first()
        userComments=Comment.objects.filter(user = user)
        comments = list(userComments)
        data = []
        for i in range(len(comments)):
            serializer = CommentSerializer(comments[i])
            data.append(serializer.data)
        
        
        return Response(data=data)

class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

class CartListView( viewsets.ModelViewSet ):
    queryset = Cart.objects.all() 
    serializer_class = CartSerializer

    @list_route(methods=['post', 'put'])
    def create_cart(self, request): #creates cart and returns pk
        
        user = User.objects.get(id=request.data['userid'])
        cart = Cart(
            user = user,
            price = 0
            )
        cart.save()

        user.cart = cart #references the new cart on the user
        user.save() 

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @detail_route(methods=['put'])
    def add_to_cart( self, request, pk = None ):
        cart = self.get_object() 
        
        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        cart.price = cart.price + bookChoice.price 
        cart.save()

        alreadyInCart = CartItem.objects.filter( cart = cart, itemsInCart = bookChoice ).first()

        if alreadyInCart:
            alreadyInCart.quantity += 1
            alreadyInCart.save()
        else: 
            new_cart_item = CartItem( cart = cart, itemsInCart = bookChoice )
            new_cart_item.save() 

        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @detail_route( methods = [ 'put' ] )
    def save_later( self, request, pk = None ):
        cart = self.get_object() 

        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        alreadySaved = SavedItem.objects.filter( cart = cart, itemsSaved = bookChoice ).first()

        if alreadySaved:
            return Response( CartSerializer(cart).data )
        else: 
            new_saved_item = SavedItem( cart = cart, itemsSaved = bookChoice )
            new_saved_item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @detail_route( methods = [ 'put' ] )
    def rem_later( self, request, pk = None ):
        cart = self.get_object() 

        bookChoice = Book.objects.get( 
            pk = request.data[ 'book_id' ]
        )

        saved = SavedItem.objects.filter( cart = cart, itemsSaved = bookChoice )

        if saved:
            saved.delete() 

        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemsView( viewsets.ModelViewSet ):
    queryset = CartItem.objects.all() 
    serializer_class = CartSerializer

class SavedItemsView( viewsets.ModelViewSet ):
    queryset = SavedItem.objects.all() 
    serializer_class = CartSerializer
"""
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
"""

class WishListViewSet(viewsets.ModelViewSet):
    serializer_class = WishListSerializer
    queryset = WishList.objects.all()

    @list_route(methods=['post'])
    def create_wishlist(self, request):
        
        user = User.objects.get(username=request.data['username'])

        wishlist = WishList(
            user = user,
            name = '',
            description=''
        )

        wishlist.save()

        serializer = WishListSerializer(wishlist)
        return Response(serializer.data)

class WishListDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = WishListDetailsSerializer
    queryset = WishListDetails.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class OrderDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = OrderDetailsSerializer
    queryset = OrderDetails.objects.all()
"""
class SettingsUpdate(UpdateView):
    model = User
    model2 = Profile
    fields = ['name']
"""