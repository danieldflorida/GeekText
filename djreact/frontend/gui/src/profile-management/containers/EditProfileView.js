import React from 'react' 
import Axios from 'axios'
import {Form, Row, Col, Button, Nav, Tab} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../containers/EditProfileView.css';

class EditProfileView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            //personal info
            profile: {},
            profilePic: '',
            bio: '',
            //users table
            user: {},
            username: '',
            nickname: '',
            password: '',
            name: '',
            email: '',
            homeAddress: '',
            //shipping information
            shippingInfo: [],
            //for NEW shipping address
            shippingName: '',
            newMailingAddress: '', 
            //for NEW credit card addition
            creditCardNum: '',
            expDate: '',
            holderName: '',
            securityCode: '',
            billingAddress: '',
            //List of credit cards on file
            creditCards: [],
            //new password info
            newPassword: '',
            retypeNewPassword: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveCreditCard = this.saveCreditCard.bind(this);
        this.createCreditCard = this.createCreditCard.bind(this);
        this.handleCreditCards = this.handleCreditCards.bind(this);
        this.handleShippingInfo = this.handleShippingInfo.bind(this);
        this.createShippingInfo = this.createShippingInfo.bind(this);
        this.saveShippingInfo = this.saveShippingInfo.bind(this);
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
         Axios.post(`http://127.0.0.1:8000/users/find_user/`, 
            {username : user},
            {headers: {"Content-Type": "application/json"}})
         .then((res) => {
            // console.log(res.data.id);
            this.setState({
                user: res.data,
                username: res.data.username,
                nickname: res.data.nickname,
                password: res.data.password,
                email: res.data.email,
                homeAddress: res.data.home_address,
                name: res.data.name
            })
         })
 
         //Access profile data
         Axios.post(`http://127.0.0.1:8000/profiles/find_profile/`,
         {
             username: user
         })
         .then((res) => {
             this.setState({
                 profile: res.data,
                 profilePic: res.data.picture,
                 bio: res.data.bio
             })
         })

         //Access Shipping Information
         Axios.post(`http://127.0.0.1:8000/shippinginformation/find_shippinginformation/`,
         {
             username: user
         })
         .then((res) => {
            console.log(res.data);
            this.setState({
                shippingInfo: res.data //res.data should return a list of addresses

            })
         })
         .catch((err) => {console.log(err)})

         
          //Access credit cards
          Axios.post(`http://127.0.0.1:8000/creditcards/find_creditcards/`,
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

          })       
    }

    
    componentDidMount()
    {
        const user = this.props.match.params.username;
        //Update the values inside the text boxes
        this.fetchProfileData(user);

    }
    submitProfile(e)
    {
        Axios.put(`http://127.0.0.1:8000/profiles/${this.state.profile.id}/update_profile/`,
        {
            username: this.state.username,
            bio: this.state.bio
            //picture: this.state.profilePic
        })
        .then((res)=>{
            console.log(res)
            alert("Profile successfully updated.")
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
     
    }

    //Handles submission for updating the user settings
    handleSubmit (e)
    {
        e.preventDefault();
        
        //Update user
        
        Axios.put(`http://127.0.0.1:8000/users/${this.state.user.id}/update_user/`,
        {
            username: this.state.username, //this is only for querying
            nickname: this.state.nickname,
            home_address: this.state.homeAddress,
            email: this.state.email,
            name: this.state.name
        })
        .then((res)=>{
            console.log(res);
            alert("User settings successfully updated.")
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    validate(card)
    {
        let validate = true;
        //Credit card number must be 16 digits
        let num = card.number.split(" ").join('');//replace whitespace with nothing
        num = num.split('-').join(''); //replace dashes with nothing 

        //console.log(num);
        if(num.length !== 16) 
        {
            validate = false;
            alert("Credit card number must be 16 digits");
        }

        //Security code must be 3 digits
        if(card.seccode.toString().length !== 3)
        {
            validate = false;
            alert("Security code must be 3 digits");
        }

        //Validating Expiration date
        let date = card.expdate.split("/");
        //console.log(date);
        if(date.length === 3)
        {
            const month = parseInt(date[0]);
            const day = parseInt(date[1]);
            const year = parseInt(date[2]);
            
            if((month < 0 || month > 12) ||
            (day < 0 || day > 31) || 
            (year < new Date().getFullYear())) //expiration date has passed
            {
                validate = false;
                alert("Enter a valid date.")
            }
                
        }
        else
        {
            validate = false;
            alert("Enter a valid date.")
        }    
        return validate;
    }
    
    //Save Credit cards button for updating cards
    saveCreditCard(e, i)
    {
        e.preventDefault();
        const array = this.state.creditCards;
        const validate = this.validate(array[i]);
        if (validate)
        {   
            var id = array[i].id;
            Axios.put(`http://127.0.0.1:8000/creditcards/${id}/update_creditcard/`,
            {
                id: id,
                username: this.state.username,
                number: array[i].number,
                expdate: array[i].expdate,
                holdername: array[i].holdername,
                seccode: array[i].seccode,
                billing_address: array[i].billing_address
            })
            .then(res => {
                alert("Credit Card successfully updated.")
                window.location.reload();
            })
        }
    }

    createCreditCard(e)
    {
        e.preventDefault();
        //New credit card

        //No fields must be empty if one field is filled out
        const holder = this.state.holderName;
        const num = this.state.creditCardNum;
        const date = this.state.expDate;
        const code = this.state.securityCode;
        const billing = this.state.billingAddress;
        
        let card = 
        {
            'holdername': holder,
            'number': num,
            'expdate': date,
            'seccode': code,
            'billing_address': billing
        }

        console.log(card);
        const validate = this.validate(card);

        if(validate && holder && num && date && code && billing)
        {
            Axios.post("http://127.0.0.1:8000/creditcards/create_creditcard/",
            {
                username: this.state.username,
                number: num,
                expdate: date,
                holdername: holder,
                seccode: code,
                billing_address: billing
            })
            .then(res => {
                window.location.reload();
                alert("Credit Card successfully added.")
                console.log("Credit Card POST success");
            })
            .catch(console.log("error"));
        }
    }

    handleCreditCards = (e, index) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        const array = this.state.creditCards;
        if(index !== null) //an existing credit card
        {
            switch(name)
            {
                case 'number':
                    let num = value.split(" ").join('');//replace whitespace with nothing
                    num = num.split('-').join(''); //replace dashes with nothing 
                    array[index].number = num; 
                break;
                case 'holdername':
                    array[index].holdername = value; 
                break;
                case 'expdate':
                    array[index].expdate = value; 
                break;
                case 'seccode':
                    array[index].seccode = value; 
                break;
                case 'billing_address':
                    array[index].billing_address = value; 
                break;
                default:
                break;
            }
            
            this.setState({
                creditCards: array
            })  
        }
        else //not an existing credit card
        {
            var val;
            switch(name)
            {
                case 'creditCardNum':
                    let num = value.split(" ").join('');//replace whitespace with nothing
                    num = num.split('-').join(''); //replace dashes with nothing 
                    val = num; 
                break;
                case 'holderName':
                    val = value; 
                break;
                case 'expDate':
                    val = value; 
                break;
                case 'securityCode':
                    val = value; 
                break;
                case 'billingAddress':
                    val = value; 
                break;
                default:
                break;
            }
            
            this.setState({
                [name]: val
            })  
        }
        
    }
    deleteCreditCard(e, index)
    {   
        e.preventDefault();
        const array = this.state.creditCards;
        Axios.delete(`http://127.0.0.1:8000/creditcards/${array[index].id}`)
        .catch(err => {
            console.log(err);    
            alert("Credit Card successfully deleted.")
            window.location.reload();
        });
    }
    displayCreditCards()
    {
        const array = this.state.creditCards;

        const creditcards = array.map((elem,index)  =>
             
            <div className="creditcard-form" key={index+1}>
            <h5 align="left">Credit Card {index+1}</h5>
                <Form.Group as={Row}>
                    <Form.Label column sm={3} 
                    align="left">
                        Credit Card Number
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                        size="sm" 
                        name="number"
                        placeholder={elem.number} 
                        onChange={e=> {this.handleCreditCards(e, index)}}
                        />
                    </Col>
                </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={3}
                align="left">
                    Cardholder Name
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    name="holdername"
                    placeholder={elem.holdername} 
                    onChange={e=> {this.handleCreditCards(e, index)}}
                    />
                </Col>
            </Form.Group>
            
            <Form.Group as={Row}
            //controlId="exp-CCV-form"
            >
                <Form.Label column sm={3}
                align="left">
                    Expiration Date
                </Form.Label>
                <Col sm={3}>
                    <Form.Control 
                    size="sm"
                    name="expdate"
                    placeholder={elem.expdate}
                    onChange={e=> {this.handleCreditCards(e, index)}}
                     />
                </Col>

                <Form.Label column sm={1}>
                    CCV
                </Form.Label>
                <Col sm={2}>
                    <Form.Control
                    size="sm"
                    name="seccode"
                    placeholder={elem.seccode} 
                    onChange={e=> {this.handleCreditCards(e, index)}}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm={3}
                align="left">
                    Billing Address
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    name="billing_address"
                    placeholder={elem.billing_address}
                    onChange={e=> {this.handleCreditCards(e, index)}} 
                    />
                </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button 
                    className="card-button"
                    variant="danger"
                    type="submit"
                    onClick={e => {this.deleteCreditCard(e, index)}}>Delete</Button>
                    <Button 
                    type="submit"
                    onClick={e => {this.saveCreditCard(e, index)}}>Save Changes</Button>
                </Col>
            </Form.Group>
            </div>
        );
        const num = array.length + 1
        return (
            <div>
            {creditcards}
                <div className="creditcard-form">
                <h5 align="left">Credit Card {num}</h5>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}
                        align="left">
                            Credit Card Number
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                            size="sm"
                            name="creditCardNum"
                            placeholder="XXXX-XXXX-XXXX-XXXX" 
                            onChange={e=> {this.handleCreditCards(e, null)}}
                            />
                        </Col>
                    </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={3}
                    align="left">
                        Cardholder Name
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                        size="sm" 
                        name="holderName"
                        placeholder="Cardholder Name"
                        onChange={e=> {this.handleCreditCards(e, null)}}/>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} 
                //controlId="exp-CCV-form"
                >
                    <Form.Label column sm={3}
                    align="left">
                        Expiration Date
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                        size="sm"
                        name="expDate"
                        placeholder="mm/dd/yyyy"
                        onChange={e=> {this.handleCreditCards(e, null)}} />
                    </Col>

                    <Form.Label column sm={1}>
                        CCV
                    </Form.Label>
                    <Col sm={2}>
                        <Form.Control
                        size="sm"
                        name="securityCode"
                        placeholder="CCV"
                        onChange={e=> {this.handleCreditCards(e, null)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm={3}
                    align="left">
                        Billing Address
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control 
                        size="sm"
                        name="billingAddress"
                        placeholder="Billing Address"
                        onChange={e=> {this.handleCreditCards(e, null)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button 
                    type="submit"
                    onClick={e => {this.createCreditCard(e)}}>Add Card</Button>
                    </Col>
                </Form.Group>
                </div>
            </div>)
    }
    handleShippingInfo = (e, index) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        const array = this.state.creditCards;
        if(index !== null) //an existing shipping information
        {
            switch(name)
            {
                case 'name':
                    array[index].name = value; 
                break;
                case 'address':
                    array[index].address = value;
                break;
                default:
                break;
            }
            
            this.setState({
                shippingInfo: array
            })  
        }
        else //not an existing shipping information
        {  
            this.setState({
                [name]: value
            })  
        }
    }
    createShippingInfo(e)
    {
        //e.preventDefault();
        const name = this.state.shippingName;
        const mailing = this.state.newMailingAddress;
        console.log(name);
        console.log(mailing);
        if(name && mailing)
        {
            Axios.post("http://127.0.0.1:8000/shippinginformation/create_shippinginformation/",
            {
                username: this.state.username,
                name: this.state.shippingName,
                address: this.state.newMailingAddress
            })
            .then(res => {
                console.log("Shipping Info POST success")
                alert("Shipping Information successfully added.")
                window.location.reload();
            })
            .catch(err=> {console.log(err)});
        }
        
    }
    saveShippingInfo(e, i)
    {
        //e.preventDefault();
        const array = this.state.shippingInfo;
        
        const id = array[i].id;
        Axios.put(`http://127.0.0.1:8000/shippinginformation/${id}/update_shippinginformation/`,
        {
            id: id,
            username: this.state.username,
            name: array[i].name,
            address: array[i].address
        })
        .then(res => {
            alert("Shipping Information successfully updated.")
            window.location.reload();
        })
    
    }
    deleteShippingInfo(e, index)
    {
        //e.preventDefault();
        const array = this.state.shippingInfo;
        Axios.delete(`http://127.0.0.1:8000/shippinginformation/${array[index].id}`)
        .catch(err => {
            console.log(err)
            alert("Shipping Information successfully deleted.")
            window.location.reload();
        });
    }
    displayShippingInfo()
    {
        const array = this.state.shippingInfo;

        const info = array.map((elem, index) => 
            <div className="creditcard-form" key={index+1}>
                <h5 align="left">Address {index+1}</h5>
                <Form.Group as={Row}>
                        <Form.Label column sm={3} 
                        align="left">
                            Name
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                            size="sm" 
                            name="name"
                            placeholder={elem.name} 
                            onChange={e=> {this.handleShippingInfo(e, index)}}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} 
                        align="left">
                            Mailing Address
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                            size="sm" 
                            name="address"
                            placeholder={elem.address} 
                            onChange={e=> {this.handleShippingInfo(e, index)}}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button 
                            className="card-button"
                            variant="danger"
                            type="submit"
                            onClick={e => {this.deleteShippingInfo(e, index)}}>Delete</Button>
                            <Button 
                            type="submit"
                            onClick={e => {this.saveShippingInfo(e, index)}}>Save Changes</Button>
                        </Col>
                    </Form.Group>
            </div>
        )

        const num = array.length + 1;
        return (
            <div>
                {info}
                <h5 align="left">Address {num}</h5>
                <Form.Group as={Row}>
                    <Form.Label column sm={3} 
                    align="left">
                        Name
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                        size="sm" 
                        name="shippingName"
                        onChange={e=> {this.handleShippingInfo(e, null)}}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3} 
                    align="left">
                        Mailing Address
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                        size="sm" 
                        name="newMailingAddress"
                        onChange={e=> {this.handleShippingInfo(e, null)}}
                        />
                    </Col>
                </Form.Group>

                    
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button 
                    type="submit"
                    onClick={e => {this.createShippingInfo(e)}}>Add Address</Button>
                    </Col>
                </Form.Group>
            </div>
        )
    }
   
    render()
    {
        const profileForm =
        <Form >
            <Form.Group as={Row} controlId="bio">
                <Form.Label column md={2}>
                    Bio
                </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                    size="sm"
                    as="textarea" 
                    rows="8"
                    cols="75"
                    name="bio"
                    placeholder={this.state.bio}
                    onChange={this.handleInputChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button 
                type="submit"
                onClick={e => {this.submitProfile(e)}}>Save Changes</Button>
                </Col>
            </Form.Group>
        </Form>

        const settingsForm =  
        <Form>
            <Form.Group as={Row} controlId="name">
                <Form.Label column sm={2}>
                    Name
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    name="name"
                    placeholder={this.state.name} 
                    onChange={this.handleInputChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="nickname">
                <Form.Label column sm={2}>
                    Nickname
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    name="nickname"
                    placeholder={this.state.nickname} 
                    onChange={this.handleInputChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="username">
                <Form.Label column sm={2}>
                    Username
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    disabled={true}
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
                    size="sm"
                    type="email" 
                    name="email"
                    placeholder={this.state.email}
                    onChange={this.handleInputChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="address">
                <Form.Label column sm={2}>
                    Address
                </Form.Label>
                <Col sm={6}>
                    <Form.Control 
                    size="sm"
                    name="homeAddress"
                    placeholder={this.state.homeAddress}
                    onChange={this.handleInputChange}/>
                </Col>
        </Form.Group>

        <br/>
        {/*
        <Form.Group as={Row} controlId="rememberMeCheckbox">
            <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="Remember me" />
            </Col>
        </Form.Group>
        */}
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
                size="sm"
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
                size="sm"
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
                size="sm"
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
    </Form>
    
    const shippingInfo =
    <Form>
        {this.displayShippingInfo()}
    </Form>

        return(
            <div className="settings-div">
                <h3 className="main-header" >Settings</h3>
                <Tab.Container id="tabs" defaultActiveKey="profile">
                    <Row
                     className="row-div"
                     >
                        <Col sm={3} 
                        className="pill-nav"
                        align="left"
                        >
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                                </Nav.Item>
                                {/*<Nav.Item>
                                    <Nav.Link eventKey="change-password">Change Password</Nav.Link>
                                </Nav.Item>*/}
                                <Nav.Item>
                                    <Nav.Link eventKey="creditCardForm">Credit Cards</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="shipping-info">Shipping Information</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={8} 
                        className="pill-content"
                        align="left"
                        >
                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    {/*Settings */}
                                    {profileForm}
                                </Tab.Pane>
                                <Tab.Pane eventKey="settings">
                                    {/*Settings */}
                                    {settingsForm}
                                </Tab.Pane>
                                {/*}
                                <Tab.Pane eventKey="change-password">
                                {changePassword}
                                </Tab.Pane>*/}
                                <Tab.Pane eventKey="creditCardForm">
                                    {creditCardForm}
                                </Tab.Pane>
                                <Tab.Pane eventKey="shipping-info">
                                    {shippingInfo}
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