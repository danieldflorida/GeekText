import React from 'react' 
import axios from 'axios'

class AuthorBooks extends React.Component {

    constructor(props) { //...args used to be here before props
        super(props);    //...args used to be here before props
    
        this.state = { 
          isLoaded: false,
          items: [],
          book: {},  
          ///////
          allDataFromApi: [],

          result: [], 
          isEmpty: true
          ///////
        };
        
      }

    componentDidMount() {
        axios.get( `http://127.0.0.1:8000/api/` )
            .then( res => {
                this.setState({
                    allDataFromApi: res.data,
                    isLoaded: true
                });
            })


    }

    render( ) {

        //////////////
        const authName = 'James Kurose'
        const theresult = this.state.allDataFromApi.map(abook => ({
           ...abook, 
           authors: abook.authors.filter(auth => auth.name.includes(authName))
       })).filter(abook => abook.authors.length > 0)





        var { isLoaded } = this.state

        if (!isLoaded ){
        return <div>Loading...</div>
        } else
        return( 



            <div>
                <ul>
                {theresult.map(anitem => (
                    <div>
                        <li>
                            {anitem.title}
                        </li>
                    </div>

                ))}
                </ul>


                {/*theresult[0].title*/}
                {console.log(theresult)}

            </div>



        )
    } 

}

export default AuthorBooks ;