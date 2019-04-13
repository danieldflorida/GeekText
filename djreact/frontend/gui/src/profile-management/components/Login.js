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
      e.preventDefault();
      axios.post('http://127.0.0.1:8000/users/login/',
      {
        username: user,
        password: pass
      })
      .then(res => {
        if(res.data.username == user) //if credentials were wrong it passes nothing
        {
          console.log("Correct credentials.");
          this.setState({
            loggedIn: true
          })
          
          this.props.onLoggedIn(this.state.Username); //Passes username to props
          window.location.href = `/profile/${this.state.Username}`
        }
        else
        {
          alert("Username and/or password are incorrect.");
          e.preventDefault();
        }
      })
      .catch(err => console.log(err))
      
  }

  
  render() {
    return (
      <Form className="custom-form" 
      //style={{padding: 10}}
      >
        <Form.Group as={Row} controlId="username"
         align="left"
          >
            <Form.Label column sm={4}>
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
        <Form.Group as={Row} controlId="password"
        align="left">
            <Form.Label column sm={4}>
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
        <div>
          <a align="center" href="/forgotusername" className="forgot-link">Forgot Username?</a>
          <a align="center" href="/forgotpassword" className="forgot-link">Forgot Password?</a>
        </div>
        
      </Form>
    )
  }
}

export default Login;