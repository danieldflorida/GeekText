import React from 'react'
import axios from 'axios'
import '../../styling/CartApp.css'

class CartDetail extends React.Component {

    state = { 
        cart:{},
        books:[], 
        currentUser: 3
    }

    constructor( props ) {
        super(props);
        this.myRef = [] ;
        //= React.createRef() ;

        axios.get( `http://127.0.0.1:8000/carts/${this.state.currentUser}` )
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
        axios.put(`http://127.0.0.1:8000/carts/${this.state.currentUser}/add_to_cart/`, `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item has been moved to your cart." )
        axios.put(`http://127.0.0.1:8000/carts/${this.state.currentUser}/rem_later/`, `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        window.location.reload() 
    }

    handleClickRemove( value ) { 
        axios.put(`http://127.0.0.1:8000/carts/${this.state.currentUser}/rem_later/`, `{"book_id":${value}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item has been removed." )
        window.location.reload() 
    }

    handleNumberAdd( id, num ) {
        if( num != 0 && num <= 30 ) {
            axios.put( `http://127.0.0.1:8000/carts/${this.state.currentUser}/add_multiple_cart/`, `{"book_id":${id},"quantity":${num}}`,{headers: {"Content-Type": "application/json"}}  )
            alert( "The item(s) have been added." )
            window.location.reload() 
        } else if( num > 30 ) {
            alert( "Please enter a value lower than or equal to 30." )
        } else {
            alert( "Please enter a value to add to the cart." )
        }
    }

    handleNumberDel( id, num ) {
        if( num != 0 && num <= 30 ) {
            axios.put( `http://127.0.0.1:8000/carts/${this.state.currentUser}/rem_multiple_cart/`, `{"book_id":${id},"quantity":${num}}`,{headers: {"Content-Type": "application/json"}}  )
            alert( "The item(s) have been removed." )
            window.location.reload() 
        } else if( num > 30 ) {
            alert( "Please enter a value lower than or equal to 30." )
        } else {
            alert( "Please enter a value to remove from the cart." )
        }
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
        const bookIDs = []
        for( let [i, value] of itemList.entries() ) {
            if( i === 0 || i%4 === 0 )
                items.push( <li key={i}>{value}</li>) ; 
            else if( i === 1 || ( i - 1 ) % 4 === 0 )
                quantity.push( <li key={i}>{value}</li>) ;
            else if( i === 2 || ( i - 2 ) % 4 === 0 ) 
                prices.push( <li key={i}>{value}</li>) ;
            else {
                covers.push( this.state.books[ itemList[i] - 1 ] )
                bookIDs.push( itemList[i] )
            }
        }
        console.log( itemList )

        var finalList = [] 
        for( var i = 0 ; i < items.length ; i++ ) {
            finalList.push( [ covers[i], items[i], quantity[i], prices[i], bookIDs[i] ] ) ; 
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
        for( i = 0 ; i < sitems.length ; i++ ) {
            finalSaved.push( [ sitems[i], sprices[i], sbooks[i] ] ) ; 
        }

        console.log( "Books", finalSaved[0][2] ) ;

        return( 
            <div>
                <h3>Cart Number ID: { this.state.cart.id }</h3><br/>
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
                        <th><img width={75} alt = "" value = {String(finalList[index][2])} height = {100} src={ finalList[index][0] } /></th>
                        <th><body>{finalList[index][1]}</body></th>
                        <th><body>{finalList[index][2]}</body></th>
                        <th><body>{finalList[index][3]}</body></th>
                        <th>
                            <body value = {String(finalList[index][2])} >
                                <input Title="The maximum to modify at once is 30."
                                    type="number" 
                                    id = "quantity"
                                    ref={(ref) => this.myRef[index] = ref} 
                                    min="1" max="30" 
                                    placeholder="     # to Add or Remove"/>
                                <br/>
                                <input type="submit" value="Add Units" onClick = { () => this.handleNumberAdd( finalList[index][4], this.myRef[index].value ) }/>
                                <input type="submit" value="Remove Units" 
                                    Title="Attempting to remove more than the quantity in the cart will remove all of the item."
                                    onClick = { () => this.handleNumberDel( finalList[index][4], this.myRef[index].value ) }/>
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