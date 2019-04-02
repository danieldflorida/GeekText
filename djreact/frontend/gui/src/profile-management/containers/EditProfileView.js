import React from 'react' 
import Axios from 'axios'
import {Form, Row, Col, Button, Nav, Tab, SplitButton, Dropdown} from 'react-bootstrap'
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
            billingAddress: '',
            creditCards: [],
            //new password info
            newPassword: '',
            retypeNewPassword: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.saveCreditCards = this.saveCreditCards.bind(this);
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
         .catch((err) => {console.log(err)})

         //Access Credit Card
         /*
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
         .catch((err) => console.log(err))*/
          //Access credit cards
          Axios.post(`http://127.0.0.1:8000/api/creditcards/find_creditcards/`,
          {
              username: user
          })
          .then((res) => {
              var list = [] 
              list = res.data;
              console.log(list);
              this.setState({
                  creditCards: list
              })
              
              /*this.setState({
                  renderComments: this.renderComments()
              })*/
          
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
        /*
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
        })*/
    }
    //Submit password change button 
    //Verifies password and new password passes new requirements
    changePassword(e)
    {

    }
    //Save Credit cards button
    saveCreditCards(e)
    {

    }
    displayCreditCards()
    {
        const array = this.state.creditCards;

        const creditcards = array.map((elem,index)  =>
             
            <div className="creditcard-form" key={index+1}>
            <h5>Credit Card {index+1}</h5>
                <Form.Group as={Row} controlId="creditcardnum">
                    <Form.Label column sm={2}>
                        Credit Card Number
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control 
                        name="creditCardNum"
                        placeholder={elem.number} 
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
                    placeholder={elem.holdername} 
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
                    placeholder={elem.expdate}
                    onChange={this.handleInputChange} />
                </Col>

                <Form.Label column sm={1}>
                    CCV
                </Form.Label>
                <Col sm={2}>
                    <Form.Control
                    name="securityCode"
                    placeholder={elem.seccode} 
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
                    placeholder={elem.billing_address}
                    onChange={this.handleInputChange} />
                </Col>
            </Form.Group>
            
            </div>
        );
        const num = array.length + 1
        return (
            <div>
            {creditcards}
            <div className="creditcard-form">
            <h5>Credit Card {num}</h5>
                <Form.Group as={Row} controlId="creditcardnum">
                    <Form.Label column sm={2}>
                        Credit Card Number
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control 
                        name="creditCardNum"
                        placeholder="XXXX-XXXX-XXXX-XXXX" 
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
                    placeholder="Cardholder Name"
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
                    placeholder="mm/dd/yyyy"
                    onChange={this.handleInputChange} />
                </Col>

                <Form.Label column sm={1}>
                    CCV
                </Form.Label>
                <Col sm={2}>
                    <Form.Control
                    name="securityCode"
                    placeholder="CCV"
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
                    placeholder="Billing Address"
                    onChange={this.handleInputChange} />
                </Col>
            </Form.Group>
            </div>
            </div>)
    }

    render()
    {
        const settingsForm =  <Form className="form-div">
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

    const changePassword = 
    <Form>
        <Form.Group as={Row} controlId="password">
            <Form.Label column sm={2}>
                Password
            </Form.Label>
            <Col sm={6}>
                <Form.Control 
                name="password"
                type="password"
                onChange={this.handleInputChange} 
                />
            </Col>
        </Form.Group>

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

        <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
            <Button 
            type="submit"
            onClick={e => {this.changePassword(e)}}>Save Changes</Button>
            </Col>
        </Form.Group>
    </Form>

    const creditCardForm = 
    <Form>
        {this.displayCreditCards()}
        <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
            <Button 
            type="submit"
            onClick={e => {this.saveCreditCards(e)}}>Save Changes</Button>
            </Col>
        </Form.Group>
        
    </Form>
    

        return(
            <div style={{marginTop:150}} className="outer-div">
                <h3 className="main-header">Settings</h3>
                <Tab.Container id="tabs" defaultActiveKey="settings">
                    <Row
                     className="row-div"
                     >
                        <Col sm={3} 
                        className="pill-nav"
                        >
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="change-password">Change Password</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="creditCardForm">Credit Cards</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10} 
                        className="pill-content"
                        >
                            <Tab.Content>
                                <Tab.Pane eventKey="settings">
                                    {/*Settings */}
                                    {settingsForm}
                                </Tab.Pane>
                                <Tab.Pane eventKey="change-password">
                                    {changePassword}
                                </Tab.Pane>
                                <Tab.Pane eventKey="creditCardForm">
                                    {creditCardForm}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            
            </div>
        )
    }
}
export default EditProfileView;    