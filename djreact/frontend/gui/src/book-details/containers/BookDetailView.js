import React from 'react' 
import axios from 'axios'
import MyVerticallyCenteredModal from '../components/EnlargedCover'
import '../components/BookDetail.css'
//import AuthorBooks from './AuthorBooks'
import { Link } from "react-router-dom"
//import { Card } from 'antd'


class BookDetail extends React.Component {

    constructor(props) { //...args used to be here before props
        super(props);    //...args used to be here before props
    
        this.state = { 
          modalShow: false,
          isLoaded: false,
          book: {}
        };
        
      }

    componentDidMount() {
        const id = this.props.match.params.id ;
        axios.get( `http://127.0.0.1:8000/api/${id}` )
            .then( res => {
                this.setState({
                    book: res.data,
                    isLoaded: true
                });
            })

//////////////////
            /*
            axios.get( `http://127.0.0.1:8000/api/` )
            .then( res => {
                this.setState({
                    allDataFromApi: res.data
                });
            })
            */

            /*
            fetch('http://127.0.0.1:8000/api/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    allDataFromApi: json
                })
            })
            */


/////////////////////

    }

    render( ) {

        const currBookID = this.props.match.params.id 

        let modalClose = () => this.setState({ modalShow: false });

        var { isLoaded } = this.state

        if (!isLoaded ){
        return <div>Loading...</div>
        } else
        return( 



            <div>


            <MyVerticallyCenteredModal
            show={this.state.modalShow}
            onHide={modalClose}
            data = {this.state.book.cover}
          />
          
      
  
          <div className="container">
          
      
              <div className="left-column-container">
                  <div className="small-cover-container">
                    <img src={ this.state.book.cover } onClick={() => this.setState({ modalShow: true })} className="small-bkCover" alt="cover" height="406" width="300"/>
                  </div>
                  

                  <div className="publisher-info-container">
                    <span>{this.state.book.pages} pages</span><br></br>
                    <span>ISBN-10: {this.state.book.ISBNTen} </span><br></br>
                    <span>ISBN-13: {this.state.book.ISBNThirteen} </span><br></br>
                    <span>Publisher: {this.state.book.publisher}</span><br></br>
                    <span>Publication Date: {this.state.book.publicationDate}</span><br></br>
                  </div>

              </div>
          



               <div className="right-column-container">
                  <h3>{this.state.book.title}</h3>
                  <span>Genre: {this.state.book.genre}</span>
                  <br></br>
                  <br></br>
                  <br></br>
                  <span className="price-money-symbol">$ </span>
                  <span className="price">{this.state.book.price}</span>
                  <br></br>
               </div>
      
          </div>

          <br></br>
          <div className="overview">
            <br></br>
            <h3 className="overview-header">Overview</h3>
            <p>{this.state.book.description}</p>
          </div>

          <br></br>
          <br></br>
          <br></br>

          <h5>About the Author</h5>
          <br></br>
          <ul>
          {this.state.book.authors.map(author => (

            <div key={author.id}>
                <li>
                    <div className="author-name">
                    
                      <Link to={{
                          pathname: `${currBookID}/AuthorBooks`,
                          state: {
                            authorName: author.name
                          }
                        }}>                     
                        {author.name}</Link>
                    
                    </div> 
                    {/*console.log(author.name)*/}

                
                    <div>{author.biography}</div>
                    <br></br>
                    <br></br>
                </li>
            </div>

           ))}
       </ul>





            {/*<AuthorBooks />*/}

            </div>



        )
    } 

}

export default BookDetail ;