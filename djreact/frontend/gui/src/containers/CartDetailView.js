import React from 'react' 
import axios from 'axios'
import {Card} from 'antd'

class CartDetail extends React.Component {

    state = { 
        cart:{}
    }

    componentDidMount() {
        axios.get( 'http://127.0.0.1:8000/carts/7' )
            .then( res => {
                this.setState({
                    cart: res.data
                });
                console.log( "Res.Data: ")
                console.log( res.data ) ;

            })
    }

    render( ) {

        var itemList = String( this.state.cart.items ).split(",")

        const items = []

        for( const [index, value] of itemList.entries() ) {
            items.push( <li key={index}>{value}</li>)
        }

        return( 
            <Card>
                <h3>Cart Number ID: { this.state.cart.id }</h3><br/>
                <li>
                {items}<br/><br/>
                <b>Price: ${this.state.cart.price}</b>
                </li>
                <h6>Last Updated At: { this.state.cart.updated_at }</h6>
            </Card>
        )
    } 

}

export default CartDetail ;