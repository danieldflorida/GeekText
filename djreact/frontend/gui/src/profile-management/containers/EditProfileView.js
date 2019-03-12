import React from 'react' 
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';
import Profile from '../components/Profile'
import {FormText, FormControl} from 'react-bootstrap'
class EditProfileView extends React.Component 
{
    constructor(props)
    {
        state = {
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
        }
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
    render()
    {
        return(
            <div>
                <FormText></FormText>
            </div>
        )
    }
}
export default EditProfileView;    