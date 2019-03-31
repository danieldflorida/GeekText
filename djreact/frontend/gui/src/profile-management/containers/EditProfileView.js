import React from 'react' 
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';

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
    }

    //Returns profile data
    fetchProfileData()
    {
        axios.get( `http://127.0.0.1:8000/api/users/` )
        .then(res =>
            {
                this.setState({
                    username: res.data.username,
                    password: res.data.password,
                    email: res.data.email,
                    homeAddress: res.data.home_address,
                })
            })
    
            axios.get( `http://127.0.0.1:8000/api/shippinginformation/` )
            .then(res =>
                {
                    this.setState({
                        mailingAddress: res.data.address

                    })
                })
            
            axios.get( `http://127.0.0.1:8000/api/creditcard/` )
            .then(res =>
                {
                    this.setState({
                        creditCardNum: res.data.number,
                        expDate: res.data.expdata,
                        holderName: res.data.holdername,
                        securityCode: res.data.seccode,
                        billing_address: res.data.billing_address

                    })
                })
    }

    handleInputChange = (e) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    componentDidMount()
    {
        //Update the values inside the text boxes
        this.fetchProfileData();
    }

    render()
    {
        return(
            <div style={{marginTop:150}}>
                <form>
                    <label style={{margin: '15px 0'}}> 
                        Bio &nbsp;
                        <textarea
                        rows = '8'
                        cols = '50'
                        value = {this.state.bio}
                        onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>  
                    <label style={{margin: '15px 0'}}>
                        Username &nbsp;
                        <input
                        name="username"
                        type="text" 
                        value={this.state.username}
                        readOnly
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Password &nbsp;
                        <input
                        name="password"
                        type="password" 
                        value={this.state.password}
                        readOnly
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        E-mail &nbsp;
                        <input
                        name="email"
                        type="text" 
                        value={this.state.email}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Home Address &nbsp;
                        <input
                        name="homeAddress"
                        type="text" 
                        value={this.state.homeAddress}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Mailing Address &nbsp;
                        <input
                        name="mailingAddress"
                        type="text" 
                        value={this.state.mailingAddress}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Credit Card Number &nbsp;
                        <input
                        name="creditCardNum"
                        type="text" 
                        value={this.state.creditCardNum}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Expiration Date &nbsp;
                        <input
                        name="expDate"
                        type="text" 
                        value={this.state.expDate}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Cardholder Name &nbsp;
                        <input
                        name="holderName"
                        type="text" 
                        value={this.state.holderName}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        CCV &nbsp;
                        <input
                        name="securityCode"
                        type="text" 
                        value={this.state.securityCode}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <label style={{margin: '15px 0'}}>
                        Billing Address &nbsp;
                        <input
                        name="billingAddress"
                        type="text" 
                        value={this.state.billingAddress}
                        onChange={this.handleInputChange}
                            />
                    </label>
                    <br/>
                    <br/>
                    <button>Save Changes</button>
                </form>
            
            </div>
        )
    }
}
export default EditProfileView;    