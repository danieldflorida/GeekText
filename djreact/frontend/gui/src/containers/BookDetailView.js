import React from 'react' 
import axios from 'axios'

import { Card, Button } from 'antd'

import { Link } from 'react-router-dom'
import Axios from 'axios';


class BookDetail extends React.Component {

    state = { 
        book: {}
    }

    componentDidMount() {
        const bookID = this.props.match.params.bookID ;
        axios.get( `http://127.0.0.1:8000/api/${bookID}` )
            .then( res => {
                this.setState({
                    book: res.data
                });
            })
    }

    handleClick(){ 
        axios.put('http://127.0.0.1:8000/carts/3/add_to_cart' `"book_id":${this.state.book.bookID}` )
    }

    render( ) {
        return( 
            <Card title = {this.state.book.title}>
                <p>{this.state.book.content}</p>
                <Link to="carts" onClick={ this.handleClick }>Add this Book To Your Cart</Link>
            </Card>
        )
    } 

}

export default BookDetail ;