import React from 'react' ;
import { Route, Switch } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;
import CartDetail from './containers/CartDetailView' ;

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