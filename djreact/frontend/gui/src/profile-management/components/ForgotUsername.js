import React, { Component } from 'react';
import Axios from 'axios';
import {Form, Row, Col, Button} from 'react-bootstrap'
import './Forms.css'
class ForgotUsername extends Component {

constructor (props)
{
    super(props);
    this.state = {
        userid: 0,
        username: '',
        email: ''
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

handleSubmit(e)
{
    e.preventDefault();

    
    Axios.post("http://127.0.0.1:8000/api/users/find_user/",
    {
        username: '', //Username doesn't exist
        email: this.state.email
    })
    .then((res) =>{
        console.log(res.data.username)
        this.setState({
            username: res.data.username
        })
    })
  
}

render()
{
    return(
        <div className="wide-block" >    
        <Form>
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

                <Form.Group as={Row} controlId="username">
                    <Form.Label column sm={4}>
                        Username
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        size = "sm"
                        name="username"
                        type="text"
                        disabled={true} 
                        value={this.state.username}
                        />
                    </Col>
                </Form.Group>
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
                        onClick={(e) => {this.handleSubmit(e)}}>Get Username</Button>
                        </Col>
                    </Form.Group>
                </div>
        </Form>
        </div>
    
    )}
}

export default ForgotUsername;