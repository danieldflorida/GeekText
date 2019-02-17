import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;
import CartDetail from './containers/CartDetailView' ;

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/carts' component = {CartDetail} />
    </div>
) ;

export default BaseRouter ;