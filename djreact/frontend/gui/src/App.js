import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom' ;
import BaseRouter from './routes' ;
import 'antd/dist/antd.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import CustomLayout from './containers/Layout' ;
import HomePage from './containers/HomePageView';

class App extends Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      username: ''
    }
    this.handleData = this.handleData.bind(this);
  }
  
  handleData = (user) =>
  {
    this.setState({username: user});
  }

  returnUser = (user) =>
  {
    
    if(user === '')
    {
      return 'Username';
    }
    else
    {
      return this.state.username;
    }
      
  }

  render() {
    return (
      <div className="App">
        <Router>
            <CustomLayout username={this.returnUser(this.state.username)}>
              <BaseRouter data={this.handleData}/>
            </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
