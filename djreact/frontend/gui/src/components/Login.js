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

  loginClick(e, user, pass){
      e.preventDefault();
      //verifies login credentials
    
      axios.get( `http://127.0.0.1:8000/api/users/` )
            .then( res => {
              console.log("request success")
              
              var users = res.data;
              //console.log(users[1]);

              var incorrect = true;
              //console.log(users)

              users.forEach(elem => {
                
                if(pass === elem.password && user === elem.username)
                {
                  console.log("User exists with correct user and password")
                  this.setState({
                    loggedIn: true
                  })
                  
                  incorrect = false;
                  this.props.onLoggedIn(this.state.Username);
                }
                
              });
                
                if(incorrect == true)
                  console.log("Username or password is incorrect");
                
            }) 
            .catch(function (error) {
              console.log(error)
            })
            
  }

  
  render() {
    return (
      <div>
        <form>
          <label style={{margin: '15px 0'}}> 
            Username: &nbsp;
            <input 
              name="Username"
              type="text"
              value={this.state.Username} 
              onChange={this.handleInputChange} />
          </label>
          <br/>        
          <label style={{margin: '15px 0'}}>
            Password: &nbsp;
            <input
              name="Password"
              type="text" 
              value={this.state.Password}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <button 
            onClick = {
              e => {this.loginClick(e, this.state.Username, this.state.Password)}}>Login</button>
        </form>
        <strong>Logged In: {(this.state.loggedIn).toString()}</strong>
      </div>
    )
  }
}

export default Login;
