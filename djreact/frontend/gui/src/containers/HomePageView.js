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
            username: ''
        }
        this.handleUser = this.handleUser.bind(this);
    }
    

    handleUser = (user) => {
        this.setState({username: user});
        this.props.user(this.state.username);
    }
    

    render( ) {
        return(
            <Container align ="center">
                <div>
                <Tabs   
                    defaultActiveKey="login"
                    position="center"
                    align="center"
                    //tabwidth={10}
                    >
                    <Tab eventKey="login" title="Login" align="center">
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