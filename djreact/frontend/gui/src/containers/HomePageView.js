import React from 'react' 
import axios from 'axios'

import Login from '../components/Login'
import { Tabs } from 'antd'
import AccountCreation from '../components/AccountCreation';

class HomePage extends React.Component {

    state = { 
        
    }

    componentDidMount() {
        //use this method to display a user's profile in the corner perhaps?
        const username = this.props.match.params.username;
        axios.get( `http://127.0.0.1:8000/api/users/${username}` )
            .then( res => {
                this.setState({
                    //user: res.data
                });
            })
    }

    render( ) {
        return(
            <div className="loginBlock" align="middle">
                <Tabs
                    id="loginBlock"
                    type="card" 
                    tabPosition="top"
                    defaultActiveKey="login">
                    <Tabs.TabPane
                    key="login" 
                    tab="Login">
                        <Login/>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                    key="createAccount"
                    tab="Create Account">
                        <AccountCreation/>
                    </Tabs.TabPane>
                </Tabs>;
                
                
            </div> 
            
        )
    } 

}

export default HomePage ;