import React, { Component } from 'react';
import axios from 'axios'
import {Form, Button, Row, Col} from 'react-bootstrap' 
import './Forms.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { //Setting different state values here
      Username: '',
      Password: '',
      loggedIn: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; //checks if the state is not a checkbox
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  loginClick(e, user, pass){

      //verifies login credentials
      axios.get( `http://127.0.0.1:8000/api/users/` )
            .then( res => {
              console.log("request success")
              
              var users = res.data;

              var incorrect = true;
              
              users.forEach(elem => {
                
                if(pass === elem.password && user === elem.username)
                {
                  console.log("User exists with correct user and password")
                  this.setState({
                    loggedIn: true
                  })
                  
                  incorrect = false;
                  this.props.onLoggedIn(this.state.Username);
                }
                
              });
                
                if(incorrect == true)
                {
                  console.log("Username or password is incorrect");
                  alert("Username or password is incorrect");
                  e.preventDefault();
                }
                  
                
            }) 
            .catch(function (error) {
              console.log(error)
            })
            
  }

  
  render() {
    return (
      <Form className="custom-form" 
      //style={{padding: 10}}
      >
        <Form.Group as={Row} controlId="username"
         //className="input-box"
          >
            <Form.Label column sm={3}>
                Username
            </Form.Label>
            <Col sm={8}>
                <Form.Control 
                //size="sm"
                name="Username"
                type="text" 
                value = {this.state.Username}
                onChange={this.handleInputChange}
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="password">
            <Form.Label column sm={3}>
                Password
            </Form.Label>
            <Col sm={8}>
                <Form.Control 
                //size="sm"
                name="Password"
                type="password" 
                value = {this.state.Password}
                onChange={this.handleInputChange}
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
            <Button 
            type="submit"
            onClick={e => {this.loginClick(e, this.state.Username, this.state.Password)}}>Login</Button>
            </Col>
        </Form.Group>
        <a align="left" href="/forgotpassword">Forgot Password?</a>
      </Form>
    )
  }
}

export default Login;
