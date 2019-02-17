import React from 'react' 
import axios from 'axios'

import { Card } from 'antd'

import { Link } from 'react'


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

    handleClick() { 
        axios.put("http://127.0.0.1:8000/carts/3/add_to_cart/", `{"book_id":${this.state.book.bookID}}`,{headers: {"Content-Type": "application/json"}}  )
    }

    

    render( ) {
        
        return( 
            <Card title = {this.state.book.title}>
                <p>
                {this.state.book.content} <br/>
                <a to="/carts" onClick={ () => this.handleClick() }>Add this Book To Your Cart</a>
                </p>
            </Card>
        )
    } 

}

export default BookDetail ;