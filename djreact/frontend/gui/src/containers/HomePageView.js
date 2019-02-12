import React from 'react' 
import axios from 'axios'

import Login from '../components/Login'

class HomePage extends React.Component {

    state = { 
        
    }

    componentDidMount() {
        //use this method to display a user's profile in the corner perhaps?
        const username = this.props.match.params.username;
        axios.get( `http://127.0.0.1:8000/api/users/${username}` )
            .then( res => {
                this.setState({
                    //user: res.data
                });
            })
    }

    render( ) {
        return(
            <div align="right">
                <Login></Login>
            </div> 
            
        )
    } 

}

export default HomePage ;