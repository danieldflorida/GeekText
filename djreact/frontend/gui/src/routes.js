import React from 'react' ;
import { Route } from 'react-router-dom' ;

import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
import AuthorBooks from './book-details/containers/AuthorBooks';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/:id' component = {BookDetail} />
       <Route exact path='/:id/AuthorBooks' component = {AuthorBooks}/>
       {/*<Route path='/AuthorBooks' render = {() => AuthorBooks} />*/}
    </div>
) ;

export default BaseRouter ;
