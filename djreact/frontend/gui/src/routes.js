import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './containers/BookListView' ;
import BookDetail from './containers/BookDetailView' ;

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:bookID' component = {BookDetail} />
    </div>
) ;

export default BaseRouter ;