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
            name: '',
            email: '',
            homeAddress: '',
            //shipping information
            mailingAddress: '',
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
        this.changePassword = this.changePassword.bind(this);
        this.saveCreditCard = this.saveCreditCard.bind(this);
        this.createCreditCard = this.createCreditCard.bind(this);
        this.handleCreditCards = this.handleCreditCards.bind(this);
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
                name: res.data.name
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
    
    handleSubmit (e)
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
        
        Axios.post(`http://127.0.0.1:8000/api/profiles/find_pk/`,
        {
            username: this.state.username
        }).then(res => {
            Axios.put(`http://127.0.0.1:8000/api/users/${res.data}/update_user/`,
            {
                username: this.state.username, //this is only for querying
                home_address: this.state.homeAddress,
                email: this.state.email,
                name: this.state.name
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
        })
        
      
    }
    //Submit password change button 
    //Verifies password and new password passes new requirements
    changePassword(e)
    {

    }

    validateCreditCards(list)
    {
        let validate = true;
        
        //Validates the existing list of credit cards
        for(let i = 0; i < list.length && validate === true; i++)
        {
            //Credit card number must be 16 digits
            let num = list[i].number.split(" ").join('');//replace whitespace with nothing
            num = num.split('-').join(''); //replace dashes with nothing 

            //console.log(num);
            if(num.length != 16) 
            {
                validate = false;
                alert("Credit card " + i + " must be 16 digits");
            }

            //Security code must be 3 digits
            if(list[i].seccode.toString().length != 3)
            {
                validate = false;
                alert("Security code must be 3 digits");
            }

            //Validating Expiration date
            let date = list[i].expdate.split("/");
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

        }

        //This section validates the new credit card
        
        let num = this.state.creditCardNum.split(" ").join('');//replace whitespace with nothing
        num = num.split('-').join(''); //replace dashes with nothing 

        if(num != '' && num.length != 16) 
        {
            validate = false;
            alert("New credit card must be 16 digits");
        }

        //Security code must be 3 digits
        const code = this.state.securityCode;
        if(code != '' && code.length != 3)
        {
            validate = false;
            alert("Security code must be 3 digits");
        }

        //Validating Expiration date
        
        let expdate = this.state.expDate;
        let date = this.state.expDate.split("/");
        if(expdate != '')
        {
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
        }

        return validate;
    }
    validate(card)
    {
        let validate = true;
        //Credit card number must be 16 digits
        let num = card.number.split(" ").join('');//replace whitespace with nothing
        num = num.split('-').join(''); //replace dashes with nothing 

        //console.log(num);
        if(num.length != 16) 
        {
            validate = false;
            alert("Credit card number must be 16 digits");
        }

        //Security code must be 3 digits
        if(card.seccode.toString().length != 3)
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
            Axios.put(`http://127.0.0.1:8000/api/creditcards/${id}/update_creditcard/`,
            {
                id: id,
                username: this.state.username,
                number: array[i].number,
                expdate: array[i].expdate,
                holdername: array[i].holdername,
                seccode: array[i].seccode,
                billing_address: array[i].billing_address
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
            Axios.post("http://127.0.0.1:8000/api/creditcards/create_creditcard/",
            {
                username: this.state.username,
                number: num,
                expdate: date,
                holdername: holder,
                seccode: code,
                billing_address: billing
            })
            .then(console.log("Credit Card POST success"))
            .catch(console.log("error"));
        }
    }

    handleCreditCards = (e, index) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        const array = this.state.creditCards;
        if(index != null) //an existing credit card
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
                creditCards: array,
                [name]: value
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
        //e.preventDefault();
        const array = this.state.creditCards;
        Axios.delete(`http://127.0.0.1:8000/api/creditcards/${array[index].id}`)
        .catch(err => {
            console.log(err)
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

    render()
    {
        const settingsForm =  
        <Form className="form-div">
        <Form.Group as={Row} controlId="bio">
            <Form.Label column md={2}>
                Bio
            </Form.Label>
            <Col>
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
        <br/>

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

        <Form.Group as={Row} controlId="username">
            <Form.Label column sm={2}>
                Username
            </Form.Label>
            <Col sm={6}>
                <Form.Control 
                size="sm"
                disabled="true"
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

        <Form.Group as={Row} controlId="mailingaddress">
            <Form.Label column sm={2}>
                Mailing Address
            </Form.Label>
            <Col sm={6}>
                <Form.Control 
                size="sm"
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
    

        return(
            <div className="settings-div">
                <h3 className="main-header" >Settings</h3>
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