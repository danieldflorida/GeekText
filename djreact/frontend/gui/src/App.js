import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom' ;
import BaseRouter from './routes' ;
import 'antd/dist/antd.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import CustomLayout from './containers/Layout' ;
import Navbar from './containers/NavbarView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <CustomLayout>
              <BaseRouter />
            </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
