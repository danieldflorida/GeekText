import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;
import ShoppingCart from './containers/ShoppingCart';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/cart' component = {ShoppingCart} />
    </div>
) ;

export default BaseRouter ;