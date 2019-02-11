import React from 'react' 
import axios from 'axios'

import Login from '../components/Login'

class HomePage extends React.Component {

    state = { 
        
    }

    componentDidMount() {
        //use this method to display a user's profile in the corner perhaps?
        axios.get( `http://127.0.0.1:8000/api/` )
            .then( res => {
                this.setState({
                    
                });
            })
    }

    render( ) {
        return( 
            <Login></Login>
        )
    } 

}

export default HomePage ;