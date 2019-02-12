import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;
import HomePage from './containers/HomePageView'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/home' component = {HomePage} />
    </div>
) ;

export default BaseRouter ;