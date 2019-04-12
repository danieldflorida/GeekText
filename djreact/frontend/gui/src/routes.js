import React from 'react' ;
import { Route, Switch } from 'react-router-dom' ;

//import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
import AuthorBooks from './book-details/containers/AuthorBooks';
import CartDetail from './shopping-cart/containers/CartDetailView';
import App from './book-browsing-and-sorting/components/App';
import HomePage from './HomePageView'
import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import EditProfileView from './profile-management/containers/EditProfileView';
import ProfileView from './profile-management/containers/ProfileView';
import ResetPassword from './profile-management/components/ResetPassword';
import ForgotUsername from './profile-management/components/ForgotUsername';

const BaseRouter = (props) => {
    var handleUser = (user) =>
    {
        props.data(user);
    }
    return(
    <div>
        <Switch> 
        <Route exact path='/home' 
        render = {(props) => <HomePage {...props} user={handleUser}/>}/>
        <Route exact path='/forgotpassword' component = {ResetPassword}/>
        <Route exact path='/forgotusername' component = {ForgotUsername}/>
        <Route exact path='/carts' component = {CartDetail} />
        <Route exact path='/:id/AuthorBooks' component = {AuthorBooks}/>
        <Route exact path='/:id' component = {BookDetail} />
        <Route exact path='/settings/:username' component={EditProfileView} />
        <Route exact path='/profile/:username' component = {ProfileView} />
        <Route exact path='/' component = {App} />
        
        </Switch>
        
       
        
       {/*<Route path='/AuthorBooks' render = {() => AuthorBooks} />*/}
    </div>
    )
} ;
        //<Route exact path='/' component = {BookList} />

export default BaseRouter ;
