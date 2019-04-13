import React from 'react' 
import axios from 'axios'
//import { Tabs } from 'antd'

import {Tabs, Tab, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styling/HomePageView.css'
import AccountCreation from './profile-management/components/AccountCreation';
import Login from './profile-management/components/Login'


class HomePage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            username: null,
            displayLoginBox: true
        }
        this.handleUser = this.handleUser.bind(this);
    }
    

    handleUser = (user) => {
        this.setState({username: user});
        this.props.user(this.state.username);
        
    }
    
    displayLogin ()
    {
        const user = sessionStorage.getItem("username");
        console.log(user)
        if(user === "" || user === null)
        {
            return 'block'
        }
        else
        {
            return 'none'
        }
    }
  

    render( ) {
        //console.log(this.displayLogin());
        console.log("Home Page View: " + this.state.username);
        return(
            <div align="center">
            <div 
            className="loginBlock" 
            style={{
                display: this.displayLogin()
                }}>
                
                <div className ="ml-auto p-2">
                <Tabs   
                    defaultActiveKey="login"
                    position="center"
                    align="center"
                    >
                    <Tab eventKey="login" title="Login" align="center">
                        <Login onLoggedIn={this.handleUser} align="center"/>
                    </Tab>
                    <Tab eventKey="createAccount" title="Sign Up" align="center">
                        <AccountCreation align="center"/>
                    </Tab>
                </Tabs>
                </div>
            </div>
            </div>
        )
    } 

}

export default HomePage ;