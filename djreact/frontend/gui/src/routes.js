import React from 'react' ;
import { Route, Switch } from 'react-router-dom' ;

import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
<<<<<<< HEAD
import CartDetail from './shopping-cart/containers/CartDetailView' ;

const BaseRouter = () => (
=======
import EditProfileView from './profile-management/containers/EditProfileView';
import ProfileView from './profile-management/containers/ProfileView';
import ResetPassword from './profile-management/components/ResetPassword';
const BaseRouter = (props) => {
    var handleUser = (user) =>
    {
        props.data(user);
    }
    return(
    
>>>>>>> 690c25ecbaffae8462b03ba66a8e783d19944126
    <div>
    <Switch>
        <Route exact path='/carts' component = {CartDetail} />
        <Route exact path='/:bookID' component = {BookDetail} />
        <Route exact path='/' component = {BookList} />
<<<<<<< HEAD
    </Switch>
=======
        <Route exact path='/bookID' component = {BookDetail} />
        <Route exact path='/home' 
        render = {(props) => <HomePage {...props} user={handleUser}/>}/>
        <Route exact path='/profile/:username' component = {ProfileView} />
        <Route exact path='/settings/:username' component={EditProfileView} />
        <Route exact path='/forgotpassword' component = {ResetPassword}/>
    
>>>>>>> 690c25ecbaffae8462b03ba66a8e783d19944126
    </div>
) ;

export default BaseRouter ;