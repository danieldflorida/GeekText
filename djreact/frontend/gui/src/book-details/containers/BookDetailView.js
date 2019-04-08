import React from 'react' 
import axios from 'axios'

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

    handleClickCart() { 
        axios.put("http://127.0.0.1:8000/carts/7/add_to_cart/", `{"book_id":${this.state.book.bookID}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item had been added to your cart." )
    }

    handleClickSave() { 
        axios.put("http://127.0.0.1:8000/carts/7/save_later/", `{"book_id":${this.state.book.bookID}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item had been saved for later. View it in your cart." )
    }

    render( ) {
        
        return( 
            <div>
                <b>Book Title</b>:<br/>{this.state.book.title}
                <br/><br/>
                <p>
                <b>Description</b>:<br/>{this.state.book.content} 
                </p>
                <p>
                <b>Price</b>:<br/>{this.state.book.price} 
                </p>
                <br/><br/>
                <button onClick={ () => this.handleClickCart() }>Add this Book To Your Cart</button>
                <br/><br/>
                <button onClick={ () => this.handleClickSave() }>Save this Book for Later</button>
            </div>
        )
    } 

}

export default BookDetail ;