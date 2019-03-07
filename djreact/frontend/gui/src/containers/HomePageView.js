import React from 'react' 
import axios from 'axios'
import Login from '../components/Login'
//import { Tabs } from 'antd'

import {Tabs, Tab, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/HomePageView.css'
import AccountCreation from '../components/AccountCreation';


class HomePage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            username: '',
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
    
        if(user === '')
        {
            return 'block'
        }
        else
        {
            return 'none'
        }
    }
  

    render( ) {
        console.log(this.displayLogin());
        return(
            <Container align ="center" className="loginBlock" style={{display: this.displayLogin()}}>
                
                <div className ="ml-auto p-2">
                <Tabs   
                    defaultActiveKey="login"
                    position="center"
                    align="center"
                    >
                    <Tab eventKey="login" title="Login">
                        <Login onLoggedIn={this.handleUser}/>
                    </Tab>
                    <Tab eventKey="createAccount" title="Sign Up" align="center">
                        <AccountCreation/>
                    </Tab>
                </Tabs>
                </div>
            </Container>
        )
    } 

}

export default HomePage ;