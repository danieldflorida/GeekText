import React from 'react' 
import Axios from 'axios'
import {Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../containers/EditProfileView.css';
class EditProfileView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            //personal info
            profilePic: '',
            bio: '',
            //users table
            username: '',
            password: '',
            email: '',
            homeAddress: '',
            //shipping information
            mailingAddress: '',
            //credit card
            creditCardNum: '',
            expDate: '',
            holderName: '',
            securityCode: '',
            billingAddress: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
         
    handleInputChange = (e) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
       
    //Access all the data to initialize states    
    fetchProfileData(user)
    {
         //Access user data
         Axios.post(`http://127.0.0.1:8000/api/users/find_user/`, 
            {username : user},
            {headers: {"Content-Type": "application/json"}})
         .then((res) => {
            this.setState({
                username: res.data.username,
                password: res.data.password,
                email: res.data.email,
                homeAddress: res.data.home_address,
            })
         })
 
         //Access profile data
         Axios.post(`http://127.0.0.1:8000/api/profiles/find_profile/`,
         {
             username: user
         })
         .then((res) => {
             this.setState({
                 profilePic: res.data.picture,
                 bio: res.data.bio
             })
         })

         //Access Shipping Information
         Axios.post(`http://127.0.0.1:8000/api/profiles/find_shippinginformation/`,
         {
             username: user
         })
         .then((res) => {
            this.setState({
                mailingAddress: res.data.address

            })
         })

         //Access Credit Card
         Axios.post(`http://127.0.0.1:8000/api/profiles/find_creditcard/`,
         {
             username: user
         })
         .then((res) => {
            this.setState({
                creditCardNum: res.data.number,
                expDate: res.data.expdata,
                holderName: res.data.holdername,
                securityCode: res.data.seccode,
                billing_address: res.data.billing_address
            })
         })
    }

    
    componentDidMount()
    {
        const user = this.props.match.params.username;
        //Update the values inside the text boxes
        this.fetchProfileData(user);

    }
    
    handleSubmit = (e) =>
    {
        e.preventDefault();

        //Update profile
        Axios.post(`http://127.0.0.1:8000/api/profiles/find_pk/`,
        {
            username: this.state.username
        })
        .then((res) => {
            //console.log(res);
            Axios.put(`http://127.0.0.1:8000/api/profiles/${res.data}/update_profile/`,
            {
                username: this.state.username,
                bio: this.state.bio,
                picture: this.state.profilePic
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
        
        })
        .catch(err => {console.log(err)})

        //Update Credit Card //TODO
        Axios.post(`http://127.0.0.1:8000/api/creditcard/find_pk/`,
        {
            username: this.state.username
        })
        .then((res) => {
            console.log(res);
            Axios.put(`http://127.0.0.1:8000/api/creditcards/${res.data}/update_creditcard/`,
            {
                username: this.state.username,
                number: this.state.creditCardNum,
                expdate: this.state.expDate,
                holdername: this.state.holderName,
                seccode: this.state.securityCode,
                billing_address: this.state.billingAddress
            })
            .then((res)=>{console.log(res)})
            .catch((err) => {
                console.log(err);
            } 
            )
        
        })
        .catch(err => {
            console.log(err)
            Axios.post(`http://127.0.0.1:8000/api/creditcards/create_creditcard/`,
            {
                username: this.state.username,
                number: this.state.creditCardNum,
                expdate: this.state.expDate,
                holdername: this.state.holderName,
                seccode: this.state.securityCode,
                billing_address: this.state.billingAddress
            })
            .then((res)=>{console.log(res)})
            .catch((err) => {
                console.log(err);
            } 
            )
        })
    }

    render()
    {
        return(
            <div style={{marginTop:150}} className="outer-div">
                <h3 className="main-header">Settings</h3>
                <div className= "settings-nav">

                </div>

                <Form className="form-div">
                    <Form.Group as={Row} controlId="bio">
                        <Form.Label column md={2}>
                            Bio
                        </Form.Label>
                        <Col>
                            <Form.Control 
                            as="textarea" 
                            rows="8"
                            cols="75"
                            name="bio"
                            placeholder={this.state.bio}
                            onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <br/>

                    <Form.Group as={Row} controlId="username">
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            placeholder={this.state.username} 
                            onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            type="email" 
                            name="email"
                            placeholder={this.state.email}
                            onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            type="password" 
                            placeholder={this.state.password} //change this to not show password
                            />
                        </Col>
                    </Form.Group>

                    <br/>

                    <Form.Group as={Row} controlId="address">
                        <Form.Label column sm={2}>
                            Address
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            name="homeAddress"
                            placeholder={this.state.homeAddress}
                            onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="mailingaddress">
                        <Form.Label column sm={2}>
                            Mailing Address
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            name="mailingAddress"
                            placeholder={this.state.mailingAddress}
                            onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>

                    <br/>
                    <Form.Group as={Row} controlId="creditcardnum">
                        <Form.Label column sm={2}>
                            Credit Card Number
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            name="creditCardNum"
                            placeholder={this.state.creditCardNum} 
                            onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>
 
                    <Form.Group as={Row} controlId="cardholder">
                        <Form.Label column sm={2}>
                            Cardholder Name
                        </Form.Label>
                        <Col sm={6}>
                          <Form.Control 
                          name="holderName"
                          placeholder={this.state.holderName} 
                          onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} 
                    //controlId="exp-CCV-form"
                    >
                        <Form.Label column sm={2}>
                            Expiration Date
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control 
                            name="expDate"
                            placeholder={this.state.expDate}
                            onChange={this.handleInputChange} />
                        </Col>

                        <Form.Label column sm={1}>
                            CCV
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                            name="securityCode"
                            placeholder={this.state.securityCode} 
                            onChange={this.handleInputChange}/>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="billingaddress">
                        <Form.Label column sm={2}>
                            Billing Address
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            name="billingAddress"
                            placeholder={this.state.billingAddress}
                            onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="rememberMeCheckbox">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button 
                        type="submit"
                        onClick={e => {this.handleSubmit(e)}}>Save Changes</Button>
                        </Col>
                    </Form.Group>

                </Form>

            
            </div>
        )
    }
}
export default EditProfileView;    