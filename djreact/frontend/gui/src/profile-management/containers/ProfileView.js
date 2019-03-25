import React from 'react' 
import Axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import './ProfileView.css'

//import {FormText, FormControl, Navbar, Nav} from 'react-bootstrap'

class ProfileView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            //personal info
            profilePic: null,
            bio: '',
            name: null,
            userId: null,
            comments: []
        }
    }

    componentDidMount () 
    {
        const user = this.props.match.params.username;

        var pk;
        //Access user data
        Axios.post(`http://127.0.0.1:8000/api/users/find_user/`, 
        {username : user},
        {headers: {"Content-Type": "application/json"}})
        .then((res) => {
          const data = res.data;
          
          this.setState({name : data.name});
        })

        //Access profile data

        Axios.post(`http://127.0.0.1:8000/api/profiles/find_profile/`,
        {
            username: user
        })
        .then((res) => {
            console.log(res.data);
            this.setState({
                profilePic: res.data.picture
            })
        })
        //Access comments data
        Axios.post(`http://127.0.0.1:8000/api/comments/find_comments/`,
        {
            username: user
        })
        .then((res) => {
            console.log(res.data);
            
        })
        

    }

    render()
    {
        return(
            <div className="outer-div">
                {/*Profile Picture Area */}
                <img src={this.state.profilePic} className="img-circle" alt="profile" height="406" width="300"/>
                
                {/*<Modal
                    show = {false}
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

                </Modal>*/}
                <h1>{this.state.name}</h1>
                {/* Bio */}

                {/* Comments Area */}

                {/* Owned Books */}
            </div>
        )
    }
        
}

export default ProfileView;