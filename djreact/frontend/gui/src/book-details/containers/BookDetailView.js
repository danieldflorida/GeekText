import React from 'react' 
import axios from 'axios'

//import { Card } from 'antd'

import  BookInfo  from '../components/BookDetail'

class BookDetail extends React.Component {

    state = { 
        book: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id ;
        axios.get( `http://127.0.0.1:8000/api/${id}` )
            .then( res => {
                this.setState({
                    book: res.data
                });
            })
    }

    render( ) {
        return( 
            <BookInfo data = {this.state.book}/>

           
        )
    } 

}

export default BookDetail ;