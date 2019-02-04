import React, { Component } from 'react';

import CustomLayout from '../containers/Layout' ;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { //Setting different state values here
      Username: '',
      Password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; //checks if the state is not a checkbox
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <br />
        <label> 
          Username: &nbsp; {/*This is a space delimiter */}
          <input 
            name="Username"
            type="text"
            value={this.state.Username} 
            onChange={this.handleInputChange} />
        </label>
        <br />
        <br />
        <label>
          Password: &nbsp;
          <input
            name="Password"
            type="text"
            value={this.state.Password}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="Submit" value="Submit" />
        {//Need a way to handle login submissions to verify
        //Needs to be able to communicate with Django backend
        }
      </form>
    );
  }
}

export default Login;
