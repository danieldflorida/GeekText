import React from 'react' 
import axios from 'axios'
import Books from '../components/Book'

class BookList extends React.Component {

    state = { 
        books: [] 
    }

    componentDidMount() {
        axios.get( 'http://127.0.0.1:8000/api/')
            .then( res => {
                this.setState({
                    books: res.data
                });
               // console.log( res.data ) ;
            })
    }

    render( ) {
        return( 
            <Books data = { this.state.books } />
        )
    } 

}

export default BookList ;