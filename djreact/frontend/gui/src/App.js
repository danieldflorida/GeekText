import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom' ;
import BaseRouter from './routes' ;
import 'antd/dist/antd.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import CustomLayout from './Layout' ;


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
      return '';
    }
    else
    {
      return this.state.username;
    }
      
  }

componentDidUpdate()
{
  sessionStorage.setItem("username", this.state.username);
}

render() {
    return (
      <div className="App">
        <Router>
            <CustomLayout username={this.returnUser(sessionStorage.getItem("username"))}>
              <BaseRouter data={this.handleData}/>
            </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
