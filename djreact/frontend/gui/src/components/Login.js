import React, { Component } from 'react';
import axios from 'axios'
//import CustomLayout from '../containers/Layout' ;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { //Setting different state values here
      Username: '',
      Password: '',
      passwordStrength: '',
      submission: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; //checks if the state is not a checkbox
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  loginClick(user, pass){
    //verifies login credentials
    //localStorage.getItem('users', users)
    axios.get( `http://127.0.0.1:8000/api/users/1` )
            .then( res => {
              console.log("request success")
                if(pass == res.data.pass)
                  console.log("User exists with correct password")
            }) 
            .catch(function (error) {
              console.log(error)
              console.log("Username or password is incorrect")
            })

            console.log('login')
       /*   
    this.setState({
      submission : true
    })*/
  }

  //Move this to account creation page
  verifyPasswordStrength(){
    //Include a minimum length of 8 characters, at least one uppercase, lowercase, and special character.
    //These are the four preconditions
    const prec = 3 //this would be a state variable

    if(prec == 0)
    {
      this.setState({
        passwordStrength: 'Very Strong'
        
      })//remove the error display for not passing the preconditions
    }
    else if(prec == 1)
      this.setState({passwordStrength: 'Strong'})
    else if(prec == 2)
      this.setState({passwordStrength: 'OK'})
    else if(prec == 3)
      this.setState({passwordStrength: 'Weak'})

  }
  
  render() {
    return (
      <form>
        
        <label> 
          Username: &nbsp; {/*This is a space delimiter */}
          <input 
            name="Username"
            type="text"
            value={this.state.Username} 
            onChange={this.handleInputChange} />
        </label>
        <br/>        
        <label>
          Password: &nbsp;
          <input
            name="Password"
            type="text"
            value={this.state.Password}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        {/*<input type="Submit" value="Submit" />*/}
        <button onClick = {this.loginClick(this.state.Username, this.state.Password)}>Login</button>
        <p>Debug: {this.state.submission === true ? "true":"false"}</p>
        {//Need a way to handle login submissions to verify
        //Needs to be able to communicate with Django backend
        }
      </form>
    );
  }
}

export default Login;
