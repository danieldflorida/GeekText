import React from 'react' 
import axios from 'axios'

//import { Card } from 'antd'

import  BookInfo  from '../components/BookDetail'

class BookDetail extends React.Component {

    state = { 
        book: {}, 
        url: '',
        urlID: '' ,
        isLoaded: false,
        items: []
    }

    componentDidMount() {
        const id = this.props.match.params.id ;
        axios.get( `http://127.0.0.1:8000/api/${id}` )
            .then( res => {
                this.setState({
                    book: res.data,
                    url: `http://127.0.0.1:8000/api/${id}`,
                    urlID: id,
                    items: res.data,
                    isLoaded: true
                });
            })
    }

    render( ) {
        var { isLoaded, items } = this.state
    if (!isLoaded){
      return <div>Loading...</div>
    } else
        return( 
            <div>
            {this.state.items.authors[0].name}
            <br></br>
            {this.state.items.authors[0].biography}
            {console.log(this.state.items)}
        {/*<BookInfo data = {this.state.book} url={this.state.url}/>*/}

            </div>
        )
    } 

}

export default BookDetail ;