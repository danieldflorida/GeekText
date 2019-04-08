import React, { Component } from 'react';
import Axios from 'axios';
import {Form, Row, Col, Button} from 'react-bootstrap'

class ResetPassword extends Component {

constructor (props)
{
    super(props);
    this.state = {

    };

}

cancelSubmit (e){
    window.location = "/home";
}
changePassword(e)
{

}
render()
{
    return(
        <div className="wide-block" >    
            <Form>
            <Form.Group as={Row} controlId="newPassword">
                <Form.Label column sm={2}>
                    New Password
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    name="newPassword"
                    type="password" 
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="retypePassword">
                <Form.Label column sm={2}>
                    Retype New Password
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    name="retypeNewPassword"
                    type="password" 
                    onChange={this.handleInputChange}
                    />
                </Col>
            </Form.Group>
            <div>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button 
                type="submit"
                onClick={e=>this.cancelSubmit(e)}>Cancel</Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button 
                type="submit"
                onClick={e => {this.changePassword(e)}}>Save Changes</Button>
                </Col>
            </Form.Group>
            </div>
        </Form>
        </div>
    
    )}
}

export default ResetPassword;