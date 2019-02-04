import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;
import Login from './components/Login'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/loginform' component = {Login} />
    </div>
) ;

export default BaseRouter ;