import React, { Component } from 'react';
import axios from 'axios'
//import CustomLayout from '../containers/Layout' ;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { //Setting different state values here
      Username: '',
      Password: '',
      loggedIn: false
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
    axios.get( `http://127.0.0.1:8000/api/users/${user}` )
            .then( res => {
              console.log("request success")
                if(pass == res.data.password)
                {
                  console.log("User exists with correct password")
                  this.setState({
                    loggedIn: true
                  })
                }
                  
            }) 
            .catch(function (error) {
              console.log(error)
              console.log("Username or password is incorrect")
            })

  }

  
  render() {
    return (
      <form>
        <label> 
          Username: &nbsp;
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
        <button 
          onClick = {
            function(event){this.loginClick.bind(this, this.state.Username, this.state.Password)}}>Login</button>
      </form>
    )
  }
}

export default Login;
