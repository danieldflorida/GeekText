import React from 'react'
import ReactDOM from 'react-dom' 
import axios from 'axios'
import {Card} from 'antd'
import '../App.css'

class CartDetail extends React.Component {

    state = { 
        cart:{},
        books:[]
    }

    constructor( props ) {
        super(props);
        this.myRef = React.createRef() ;

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

    componentWillMount() {
        this.refs = {} 
        
    }

    componentDidMount() {
        
    }
    
    handleClickMove( value ) { 
        axios.put("http://127.0.0.1:8000/carts/7/add_to_cart/", `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item has been moved to your cart." )
        axios.put("http://127.0.0.1:8000/carts/7/rem_later/", `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        window.location.reload() 
    }

    handleClickRemove( value ) { 
        axios.put("http://127.0.0.1:8000/carts/7/rem_later/", `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item has been removed." )
        window.location.reload() 
    }

    handleNumber( valueSent ) {
        //var node = ReactDOM.findDOMNode( this.myRef )
        //node.setAttribute( 'max', 8 )
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
                        <th><h6><b>Modify Units</b></h6></th>
                    </tr>

                    {finalList.map( (value, index, finalList ) => ( [ <tr>
                        <th><img width={75} value = {String(finalList[index][2])} height = {100} src={ finalList[index][0] } /></th>
                        <th><body>{finalList[index][1]}</body></th>
                        <th><body>{finalList[index][2]}</body></th>
                        <th><body>{finalList[index][3]}</body></th>
                        <th>
                            <body value = {String(finalList[index][2])} >
                                <input Title="Attempting to remove more than the quantity in the cart will remove all of the item."
                                    type="number" 
                                    ref={(ref) => this.myRef = ref} 
                                    min="0" max="50" 
                                    placeholder="     # to Add or Remove"/>
                                <br/>
                                <input type="submit" value="Add Units"/><input type="submit" value="Remove Units"/>
                            </body>
                        </th>
                    </tr> ] ) )  }

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
                        <th><h6><b>Move To Cart</b></h6></th>
                        <th><h6><b>Remove From List</b></h6></th>
                    </tr>
                    {finalSaved.map( (value, index, finalSaved ) => ( [ <tr>
                        <th><body>{finalSaved[index][0]}</body></th>
                        <th><body>{finalSaved[index][1]}</body></th>
                        <th><button value = {String(finalSaved[index][2])} onClick = { () => this.handleClickMove( finalSaved[index][2] )}>Move Item to Cart</button></th>
                        <th><button value = {String(finalSaved[index][2])} onClick = { () => this.handleClickRemove( finalSaved[index][2] )}>Remove Item from List</button></th>
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