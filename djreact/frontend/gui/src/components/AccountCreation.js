import React, { Component } from 'react';
import Axios from 'axios';


class AccountCreation extends Component {

constructor (props)
{
    super(props);
    this.state = {
        email: '',
        username: '',
        password: '',
        passwordCheck: '',
        passwordStrength: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.createAccount = this.createAccount.bind(this);
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
    
  }

  verifyPassword(){
    const pass = this.state.password;
    //console.log(pass)
    
    if(pass != this.state.passwordCheck)
    {
        console.log('Passwords are not the same!')
        return false
    }
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
    
    var prec = 3 //this would be a state variable
    if(pass.length >= 8)
    {
        prec--
        console.log('Password greater than 8')
    }
        
    if(pass.includes('!') || pass.includes('@') 
    || pass.includes('#') || pass.includes('$') 
    || pass.includes('%') || pass.includes('^')
    || pass.includes('&') || pass.includes('*')
    || pass.includes('-') || pass.includes('_')
    || pass.includes('+') || pass.includes('='))
    {
        prec--
        console.log('Password includes special character.')
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
    }

    if(prec === 0)
    {
      this.setState({
        passwordStrength: 'Very Strong'
      })//remove the error display for not passing the preconditions
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
    console.log(this.state.passwordStrength)

  }
//Used in onClick
createAccount(e)
{
        e.preventDefault();
        //Check if user or email exists
        /*Axios.get( `http://127.0.0.1:8000/api/users/${this.state.username}` )
        .then( res => {
            console.log('Username already exists')
            return
        })*/
        console.log(this.verifyPassword())
        if(this.verifyPassword() === true)
        {
            Axios.post(`http://127.0.0.1:8000/api/users/`, {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
            .catch(function(error){
                console.log(error)
                console.log('Could not post')
            })

        }

}

componentDidUpdate()
{
    
}

render() 
{
    return(
        <form>
            <label>
                E-mail &nbsp;
                <input 
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                     />
            </label>
            <br/>
            <label>
                Username &nbsp;
                <input 
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
                Password &nbsp;
                <input 
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
                Re-enter Password &nbsp;
                <input 
                name="passwordCheck"
                type="text"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange} /> 
            </label>
            <br/>
            <button 
            onClick={e => {this.createAccount(e)}}>Create</button>
        </form>  
    )
  }
    

}

export default AccountCreation;