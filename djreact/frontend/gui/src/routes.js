import React from 'react' ;
import { Route } from 'react-router-dom' ;

import HomePage from './containers/HomePageView'
import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;


const BaseRouter = (props) => {
    var handleUser = (user) =>
    {
        props.data(user);
    }
    return(
    
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/bookID' component = {BookDetail} />
        <Route exact path='/home' 
        render = {(props) => <HomePage {...props} user={handleUser}/>}/>
    </div>
)} ;

export default BaseRouter ;
