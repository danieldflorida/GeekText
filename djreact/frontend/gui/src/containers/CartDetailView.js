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
                console.log( "Res.Data: ")
                console.log( res.data ) ;

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
            console.log( "Book List: ")
            console.log( this.state.books ) ;
        })
    }

    render( ) {
        
        var itemList = String( this.state.cart.items ).split(",")
        itemList = String( itemList ).split(" | ")
        itemList = String( itemList ).split(",")

        //console.log( "Split',' -> Split'|' -> Split','")
        console.log( itemList )

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
                covers.push(  this.state.books[ itemList[i] - 1 ] )
        }

        var finalList = [] 
        for( var i = 0 ; i < items.length ; i++ ) {
            finalList.push( [ covers[i], items[i], quantity[i], prices[i] ] ) ; 
        }
        console.log( "Final List")
        console.log( finalList )

        return( 
            <Card>
                <h3>Cart Number ID (will eventually show current logged in usersname): { this.state.cart.id }</h3><br/>
                <div>
                <table>
                    <tr>
                        <th><b>Cover</b></th>
                        <th><b>Title</b></th>
                        <th><b>Quantity</b></th>
                        <th><b>Unit Price</b></th>
                        <th><b>Remove?</b></th>
                        <th><b>Save for Later?</b></th>
                    </tr>

                    {finalList.map( (value, index, finalList ) => ( [ <tr>
                        <th><img width={75} height = {100} alt="cover" src={ finalList[index][0] } /></th>
                        <th>{finalList[index][1]}</th>
                        <th>{finalList[index][2]}</th>
                        <th>{finalList[index][3]}</th>
                        <th>Sprint 3</th>
                        <th>Sprint 3</th>
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
                        <th><b>Title</b></th>
                        <th><b>Price</b></th>
                        <th><b>Return to Cart?</b></th>
                    </tr>
                    <tr>
                        <th>Sprint 3</th>
                        <th>Sprint 3</th>
                        <th>Sprint 3</th>
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