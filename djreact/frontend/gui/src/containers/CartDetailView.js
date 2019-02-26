import React from 'react' 
import axios from 'axios'
import {Card} from 'antd'
import '../App.css'

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
        itemList = String( itemList ).split(" | ")
        itemList = String( itemList ).split(",")

        console.log( "Split',' -> Split'|' -> Split','")
        console.log( itemList )

        //--> Code can break the string up into multiple lists when it is uncommented 
        //    Currently can't get display tables to work so it has been commented out and the strings are just being displayed.

        const items = []
        const quantity = []
        const prices = []
        for( let [i, value] of itemList.entries() ) {
            if( i === 0 || i%3 === 0 )
                items.push( <li key={i}>{value}</li>) ; 
            else if( i === 1 || ( i - 1 ) % 3 === 0 )
                quantity.push( <li key={i}>{value}</li>) ;
            else
                prices.push( <li key={i}>{value}</li>) ;
        }

        var finalList = [] 
        for( var i = 0 ; i < items.length ; i++ ) {
            finalList.push( [ items[i], quantity[i], prices[i] ] ) ; 
        }
        console.log( "Final List")
        console.log( finalList )

        return( 
            <Card>
                <h3>Cart Number ID: { this.state.cart.id }</h3><br/>
                <div>
                <table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>

                {finalList.map( (value, index, finalList ) => ( [ <tr><th>{finalList[index][0]}</th><th>{finalList[index][1]}</th><th>{finalList[index][2]}</th></tr> ] ) ) }

                <tr>
                    <th>Total Price: <b>${this.state.cart.price}</b></th>
                </tr>
                </table>
                </div>
                <br/><br/>
                
                <h6>Last Updated At: { this.state.cart.updated_at }</h6>
            </Card>
        )
    } 

}

export default CartDetail ;