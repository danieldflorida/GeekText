import React from 'react' 
import axios from 'axios'
import Cart from '../components/Cart'

import { List } from 'antd'

class CartDetail extends React.Component {

    state = { 
        cart: {},
        ordering: []
    }

    componentDidMount() {
        axios.get( 'http://127.0.0.1:8000/carts/3' )
            .then( res => {
                this.setState({
                    cart: res.data,
                    ordering: res.data.items
                });
                console.log( res.data ) ;

            })
    }

    render( ) {
        const items = []

        for( const [index, value] of this.state.ordering.entries() ) {
            items.push( <li key={index}>{value}</li>)
        }
        return( 
            <List title = {this.state.cart.id} >
                <p>{ this.state.cart.updated_at }</p>
                <p>{items}</p>
            </List> 
        )
    } 

}

export default CartDetail ;