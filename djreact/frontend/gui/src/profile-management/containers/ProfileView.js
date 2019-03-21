import React from 'react' 
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';
import Profile from '../components/Profile'
import {FormText, FormControl, Navbar, Nav} from 'react-bootstrap'

class ProfileView extends React.Component 
{
    constructor(props)
    {
        this.state = {
             //personal info
             profilePic: '',
             bio: '',
        }
    }
    render()
    {
        return(
            <div>
                 <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >

                
                    <Modal.Header closeButton>            
                    </Modal.Header>
                

                    <Modal.Body>         
                        <div style={{padding: '10px'}}>
                        <img src={ this.props.data } style={{display: 'inline-block'}} alt="cover" height="550" width="406"/>
                        </div> 
                    </Modal.Body>

                </Modal>
                <Profile state={this.state}/>
            </div>
        )
    }
        
}

export default ProfileView;