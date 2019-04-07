import React, { Component } from 'react';
import Axios from 'axios';
import {Form, Row, Col, Button} from 'react-bootstrap'
import './Forms.css'
class ResetPassword extends Component {

constructor (props)
{
    super(props);
    this.state = {
        userid: 0,
        username: '',
        email: '',
        password: '',
        newPassword: '',
        passwordCheck: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleInputChange(e)
{
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
        [name]: value
    })
}
cancelSubmit (e)
{
    e.preventDefault();
    window.location.href = "/home";
    return false;
}
validatePassword(e)
{
    const pass = this.state.newPassword;
    //console.log(pass)
    
    
    //Make sure that it cannot have spaces or certain chars
    if(pass.includes(' ') || pass.includes('/')
    || pass.includes('\\') || pass.includes('<')
    || pass.includes('>')
    )
    {
        console.log("Password cannot have spaces,"
        + " parentheses, arrows or slashes. Only these" 
        + " special characters: ! @ # $ % ^ & * - _ + =")
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
        alert('Password not greater than 8 characters')
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
        alert('Password needs at least one special character')
        return false
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
        alert('Password needs upper and lowercase letters.')
        return false
    }
    
    if(pass !== this.state.passwordCheck)
    {
        console.log(pass + " " + this.state.passwordCheck);
        alert('Passwords are not the same!')
        return false
    }

    //PRINT PASSWORD STRENGTH HERE
    
    if(prec === 0)
    {
        return true
    }
    else if(prec === 1)
    {
        return false
    }
    else if(prec === 2)
    {
        return false
    }
    else if(prec === 3)
    {
        return false
    }

    return false
      
}

// The async keyword will automatically create a new Promise and return it.
async getUser(){

    // The await keyword saves us from having to write a .then() block.
    let json = await Axios.post("http://127.0.0.1:8000/api/users/find_user/",
    {
        email: this.state.email,
        username: this.state.username,
    });

    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    return json;
}

handleSubmit(e)
{
    e.preventDefault();
    const validate = this.validatePassword();
    if(validate)
    {
        
        Axios.post("http://127.0.0.1:8000/api/users/find_user/",
        {
            email: this.state.email,
            username: this.state.username,
        })
        .then((res) =>{
            this.setState({
                userid: res.data.id
            })            
            Axios.put(`http://127.0.0.1:8000/api/users/${this.state.userid}/change_password/`,
            {
                id: this.state.userid,
                password: this.state.newPassword
            })
            .catch(err=>{
                e.preventDefault();
                console.log(err)
            })
        })
  
 

        
        //window.location.href = "/home";
    }
    else
    {
        e.preventDefault();
    }
}

render()
{
    return(
        <div className="wide-block" >    
            <Form>
            <div className="top-block">
            <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={4}>
                        Email
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        size = "sm"
                        name="email"
                        type="email" 
                        onChange={this.handleInputChange}
                        />
                    </Col>
                </Form.Group>

                <div align="left" className="or">OR</div>
                <Form.Group as={Row} controlId="username">
                    <Form.Label column sm={4}>
                        Username
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        size = "sm"
                        name="username"
                        type="text" 
                        onChange={this.handleInputChange}
                        />
                    </Col>
                </Form.Group>
            </div>
            <div className="bottom-block">
                <Form.Group as={Row} controlId="newPassword">
                    <Form.Label column sm={4}>
                        New Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        size = "sm"
                        name="newPassword"
                        type="password" 
                        onChange={this.handleInputChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="retypePassword">
                    <Form.Label column sm={4}>
                        Retype New Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        size="sm"
                        name="passwordCheck"
                        type="password" 
                        onChange={this.handleInputChange}
                        />
                    </Col>
                </Form.Group>
            </div>
            <div>
            <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 2 }}>
                <Button 
                className="submit-button"
                variant="secondary"
                type="submit"
                onClick={(e) => {this.cancelSubmit(e)}}>Cancel</Button>
                <Button 
                className="submit-button"
                type="submit"
                onClick={(e) => {this.handleSubmit(e)}}>Save Changes</Button>
                </Col>
            </Form.Group>
            </div>
        </Form>
        </div>
    
    )}
}

export default ResetPassword;