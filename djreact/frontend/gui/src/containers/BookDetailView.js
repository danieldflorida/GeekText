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
                <p>Price: ${this.state.book.price}</p>
                <img src={ this.state.book.cover } alt="cover"/>
                <div>
                <p>Genre: {this.state.book.genre}</p>
                <p>{this.state.book.description}</p>
                <p>Publisher: {this.state.book.publisher}</p>
                <p>Publication Date: {this.state.book.publicationDate}</p>
                </div>
            </Card>
        )
    } 

}

export default BookDetail ;