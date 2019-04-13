import React, { Component } from 'react';
import Axios from 'axios';
import './Forms.css';
import {Form, Row, Col, Button} from 'react-bootstrap';
class AccountCreation extends Component {

constructor (props)
{
    super(props);
    this.state = {
        email: '',
        name: '',
        username: '',
        user: {}, //user returned from account creation
        password: '',
        passwordCheck: '',
        passwordStrength: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.createAccount = this.createAccount.bind(this);
}

    handleInputChange(event) 
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
        [name]: value
        });
        
    }

  verifyPassword(){
    const pass = this.state.password;
    var string = "";
    //console.log(pass)
    
   
    //Make sure that it cannot have spaces or certain chars
    if(pass.includes(' ') || pass.includes('/')
    || pass.includes('\\') || pass.includes('<')
    || pass.includes('>')
    )
    {
        console.log("Password cannot contain spaces, slashes, or arrows.")
       string = string + "Password cannot contain spaces, slashes, or arrows.\n"
        return false
    }    

     //Include a minimum length of 8 characters, at least one uppercase, lowercase, and special character.
    //These are the four preconditions
    
    var prec = 4 //this would be a state variable
    if(pass.length >= 8)
    {
        prec--
        console.log('Password greater than 8')
    }
    else
    {
        console.log('Password not greater than 8 characters')
        string = string + "Password must be greater than 7 characters.\n"
    }

    if(pass.includes('!') || pass.includes('@') 
    || pass.includes('#') || pass.includes('$') 
    || pass.includes('%') || pass.includes('^')
    || pass.includes('&') || pass.includes('*')
    || pass.includes('-') || pass.includes('_')
    || pass.includes('+') || pass.includes('=')
    || pass.includes('?'))
    {
        prec--
        console.log('Password includes special character.')
    }
    else
    {
        console.log('Password needs at least one special character')
        string = string + "Password must have at least one of these special characters: ! @ # $ % ^ & * - _ + = .\n"
    }

    var i = 0, upper = false, lower = false;
    while(i < pass.length)
    {
        
        if(pass.charAt(i) === pass.charAt(i).toUpperCase() && upper === false)
        {
            upper = true;
            prec--;
        }
        
        if(pass.charAt(i) === pass.charAt(i).toLowerCase() && lower === false)
        {
            lower = true;
            prec--;
        }
        i++
    }

    if(!lower || !upper)
    {
        console.log('Password needs upper and lowercase letters.')
        string = string + "Password needs at least one upper and lowercase letter.\n"
    }
    
    if(pass !== this.state.passwordCheck)
    {
        console.log('Passwords are not the same!')
        string += "Passwords are not the same!\n"
        return false
    }
    if(string != "")
    {
        console.log(string);
        alert(string);
    }
    //PRINT PASSWORD STRENGTH HERE
    
    if(prec === 0)
    {
      this.setState({ passwordStrength: 'Very Strong'})
      return true
    }
    else if(prec === 1)
    {
        this.setState({passwordStrength: 'Strong'})
        return false
    }
    else if(prec === 2)
    {
        this.setState({passwordStrength: 'OK'})
        return false
    }
    else if(prec === 3)
    {
        this.setState({passwordStrength: 'Weak'})
        return false
    }

    return false
  }

    //Used in onClick
    createAccount(e)
    {
        e.preventDefault();
        //console.log('Password verified: ' + this.verifyPassword())
        if(this.verifyPassword() === true)
        {
            //Creates the user
            //Also creates all related tables
            Axios.post("http://127.0.0.1:8000/users/add_user/", 
            {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                home_address: '',
            },
            {headers: {"Content-Type": "application/json"}})
            .then(res => {  
                console.log(res.data);
                this.setState({
                    user: res.data
                })
                window.location.href = "/home"
            })
            .catch(error => {
                console.error(error)
            })
            

        }
        else
        {
            e.preventDefault();
            //alert('Incorrect input');
        }
    }




render() 
{
    return(
        <Form className="custom-form">
            <Form.Group as={Row} controlId="email"
            //className="input-box"
            >
                <Form.Label column sm={4}
                align="left">
                    Email
                </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                    size="sm"
                    name="email"
                    type="email" 
                    value = {this.state.email}
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="name"
            align="left"
            >
                <Form.Label column sm={4}>
                    Name
                </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                    size="sm"
                    name="name"
                    type="text" 
                    value = {this.state.name}
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="username"
            align="left"
            >
                <Form.Label column sm={4}>
                    Username
                </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                    size="sm"
                    name="username"
                    type="text" 
                    value = {this.state.username}
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
                    size="sm"
                    name="password"
                    type="password" 
                    value = {this.state.password}
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="passwordCheck"
            align="left">
                <Form.Label column sm={4}>
                    Re-enter Password
                </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                    size="sm"
                    name="passwordCheck"
                    type="password" 
                    value = {this.state.passwordCheck}
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button 
                type="submit"
                onClick={e => {this.createAccount(e)}}>Sign Up</Button>
                </Col>
            </Form.Group>
            
      </Form>
    )
  }
}

export default AccountCreation;