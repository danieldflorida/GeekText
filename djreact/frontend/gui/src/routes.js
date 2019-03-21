import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:id' component = {BookDetail} />
    </div>
) ;

export default BaseRouter ;
