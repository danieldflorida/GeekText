import React from 'react' 
import axios from 'axios'

import { Card } from 'antd'

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

    render( ) {
        return( 
            <Card title = {this.state.book.title}>
                <p>{this.state.book.content}</p>
            </Card>
        )
    } 

}

export default BookDetail ;