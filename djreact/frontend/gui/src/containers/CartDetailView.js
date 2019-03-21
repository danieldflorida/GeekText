import React from 'react' 
import axios from 'axios'
import {Card} from 'antd'
import '../App.css'

class CartDetail extends React.Component {

    state = { 
        cart:{},
        books:[]
    }

    componentDidMount() {
        axios.get( 'http://127.0.0.1:8000/carts/7' )
            .then( res => {
                this.setState({
                    cart: res.data
                });
                //console.log( "Res.Data: ")
                //console.log( res.data ) ;

            })

        axios.get( 'http://127.0.0.1:8000/api/')
        .then( res => {

            var toSave = []
            for( let i = 0 ; i < res.data.length ; i++ ){
                toSave.push( res.data[i].cover )
            }

            this.setState({
                books: toSave
            });

        })
    }
    
    handleClickMove( value ) { 
        axios.put("http://127.0.0.1:8000/carts/7/add_to_cart/", `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item has been moved to your cart." )
        axios.put("http://127.0.0.1:8000/carts/7/rem_later/", `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        window.location.reload() 
    }

    render( ) {
        
        var itemList = String( this.state.cart.items ).split(",")
        itemList = String( itemList ).split(" | ")
        itemList = String( itemList ).split(",")

        //--> Code can break the string up into multiple lists when it is uncommented 
        //    Currently can't get display tables to work so it has been commented out and the strings are just being displayed.

        const items = []
        const quantity = []
        const prices = []
        const covers = [] 
        for( let [i, value] of itemList.entries() ) {
            if( i === 0 || i%4 === 0 )
                items.push( <li key={i}>{value}</li>) ; 
            else if( i === 1 || ( i - 1 ) % 4 === 0 )
                quantity.push( <li key={i}>{value}</li>) ;
            else if( i === 2 || ( i - 2 ) % 4 === 0 ) 
                prices.push( <li key={i}>{value}</li>) ;
            else 
                covers.push( this.state.books[ itemList[i] - 1 ] )
        }

        var finalList = [] 
        for( var i = 0 ; i < items.length ; i++ ) {
            finalList.push( [ covers[i], items[i], quantity[i], prices[i] ] ) ; 
        }

        var savedList = String( this.state.cart.saved ).split( "," )
        savedList = String( savedList ).split( " | " )
        savedList = String( savedList ).split( "," )

        const sitems = [] 
        const sprices = [] 
        const sbooks = [] 
        
        for( let [i, value] of savedList.entries() ) {
            if( i === 0 || i%3 === 0 )
                sitems.push( value ) ;
            else if( i === 1 || ( i - 1 ) % 3 === 0 )
                sprices.push( value ) ;
            else 
                sbooks.push( value ) ;
        }

        var finalSaved = [] 
        for( var i = 0 ; i < sitems.length ; i++ ) {
            finalSaved.push( [ sitems[i], sprices[i], sbooks[i] ] ) ; 
        }

        console.log( "Books", finalSaved[0][2] ) ;

        return( 
            <div>
                <h3>Cart Number ID (will eventually show current logged in usersname): { this.state.cart.id }</h3><br/>
                <div>
                <table>
                    <tr>
                        
                        <th><h6><b>Cover</b></h6></th>
                        <th><h6><b>Title</b></h6></th>
                        <th><h6><b>Quantity</b></h6></th>
                        <th><h6><b>Unit Price</b></h6></th>
                        <th><h6><b>Remove Units</b></h6></th>
                    </tr>

                    {finalList.map( (value, index, finalList ) => ( [ <tr>
                        <th><img width={75} height = {100} alt="cover" src={ finalList[index][0] } /></th>
                        <th><body>{finalList[index][1]}</body></th>
                        <th><body>{finalList[index][2]}</body></th>
                        <th><body>{finalList[index][3]}</body></th>
                        <th><body>tbd</body></th>
                    </tr> ] ) ) }

                    <tr>
                        <th>Subtotal: <b>${this.state.cart.price}</b></th>
                        <th><b>PURCHASE LINK TBD?</b></th>
                    </tr>
                </table>
                </div>
                <br/><br/>

                <h5>Items Saved for Later</h5>

                <div>
                <table>
                    <tr>
                        <th><h6><b>Title</b></h6></th>
                        <th><h6><b>Price</b></h6></th>
                        <th><h6><b>Add Item To Cart</b></h6></th>
                    </tr>
                    {finalSaved.map( (value, index, finalSaved ) => ( [ <tr>
                        <th><body>{finalSaved[index][0]}</body></th>
                        <th><body>{finalSaved[index][1]}</body></th>
                        <th><button value = {String(finalSaved[index][2])} onClick = { () => this.handleClickMove( finalSaved[index][2] )}>Move Item to Cart</button></th>
                    </tr> ] ) ) }
                </table>
                </div>
                
                <br/><br/>
                
                <h7>Last Updated At: { this.state.cart.updated_at }</h7>
            </div>
        )
    } 
}

export default CartDetail ;