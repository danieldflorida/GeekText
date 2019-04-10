/*
import React from 'react' ;
import { Route, Switch } from 'react-router-dom' ;

import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
import CartDetail from './shopping-cart/containers/CartDetailView' ;

const BaseRouter = () => (
    <div>
    <Switch>
        <Route exact path='/carts' component = {CartDetail} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/' component = {BookList} />
    </Switch>
    </div>
) ;

export default BaseRouter ;
*/
import React from 'react' ;
import { Route, Switch } from 'react-router-dom' ;

import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
import AuthorBooks from './book-details/containers/AuthorBooks';
import CartDetail from './shopping-cart/containers/CartDetailView' ;

const BaseRouter = () => (
    <div>
        <Switch> 
        <Route exact path='/carts' component = {CartDetail} />
        <Route exact path='/:id/AuthorBooks' component = {AuthorBooks}/>
        <Route exact path='/:id' component = {BookDetail} />
        <Route exact path='/' component = {BookList} />
        </Switch>
       {/*<Route path='/AuthorBooks' render = {() => AuthorBooks} />*/}
    </div>
) ;

export default BaseRouter ;
