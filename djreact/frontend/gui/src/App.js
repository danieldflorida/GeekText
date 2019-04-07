import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom' ;
import BaseRouter from './routes' ;
import 'antd/dist/antd.css';

import CustomLayout from './Layout' ;


class App extends Component {
<<<<<<< HEAD
  render() {
=======
  
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
    
    if(user === "")
    {
      return "";
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
>>>>>>> 690c25ecbaffae8462b03ba66a8e783d19944126
    return (
      <div className="App">
        <Router>
          <CustomLayout>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
