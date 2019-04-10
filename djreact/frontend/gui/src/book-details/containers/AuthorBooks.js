import React from 'react' 
import axios from 'axios'
import '../components/AuthorBooks.css'
import { Link } from "react-router-dom"

class AuthorBooks extends React.Component {

    constructor(props) { //...args used to be here before props
        super(props);    //...args used to be here before props
    
        this.state = { 
          isLoaded: false,
          allDataFromApi: []
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

       
        //////////////////////
       

        const authName = this.props.location.state.authorName

        const resultingBooks = this.state.allDataFromApi.map(abook => ({          
           ...abook, 
           authors: abook.authors.filter(auth => auth.name.includes(authName))
       })).filter(abook => abook.authors.length > 0)


       /////////////////////////


        var { isLoaded } = this.state

        if (!isLoaded){
        return <div>Loading...</div>
        } else
        return( 

            

            <div className="div-container">

                <h1 className="h1-author-name">{authName}</h1>

                <div className="div-author-biography">
                   { <p>{resultingBooks[0].authors[0].biography}</p>}
                </div>

                <br></br>
                <br></br>
                <br></br>


                <div className="between-books">
                {resultingBooks.map(thisAuthorsBook => (
                    <div className="a-books-info" key={thisAuthorsBook.id}>
                        
                    <Link to={{
                        pathname: `/${thisAuthorsBook.id}`
                      }}>                     
                       <img src={ thisAuthorsBook.cover } className="book-covers" alt="cover" height="285" width="200"/>
                    </Link>


                            <br></br>
                            <div className="book-title">
                            

                            <Link to={{
                                pathname: `/${thisAuthorsBook.id}`
                              }}>                     
                              {thisAuthorsBook.title}</Link>

                           {/* <span>{thisAuthorsBook.title}</span>*/}
                            <br></br>
                            <span>{resultingBooks[0].authors[0].name}</span>
                             </div>
                        
                    </div>

                ))}
                </div>


                {/*console.log(resultingBooks)*/}
                

            </div>



        )
    } 

}

export default AuthorBooks ;