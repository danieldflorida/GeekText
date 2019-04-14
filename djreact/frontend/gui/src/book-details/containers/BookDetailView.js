import React from 'react' 
import axios from 'axios'
import MyVerticallyCenteredModal from '../components/EnlargedCover'
import '../components/BookDetail.css'
import { Link } from "react-router-dom"

/*
import img0 from '../../static/stars/5_Star_Rating_System_0_stars.svg';
import img1 from '../../static/stars/5_Star_Rating_System_1_star_T.png';
import img2 from '../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img3 from '../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img4 from '../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img5 from '../../static/stars/5_Star_Rating_System_5_stars_T.png';
*/

import img0 from '../../static/stars/5_Star_Rating_System_0_stars.svg';
import img0AndHalf from '../../static/stars/5_Star_Rating_System_0_and_half_star_T.png';

import img1 from '../../static/stars/5_Star_Rating_System_1_star_T.png';
import img1AndHalf from '../../static/stars/5_Star_Rating_System_1_and_a_half_stars_T.png';

import img2 from '../../static/stars/5_Star_Rating_System_2_stars_T.png';
import img2AndHalf from '../../static/stars/5_Star_Rating_System_2_and_a_half_stars_T.png';

import img3 from '../../static/stars/5_Star_Rating_System_3_stars_T.png';
import img3AndHalf from '../../static/stars/5_Star_Rating_System_3_and_a_half_stars_T.png';

import img4 from '../../static/stars/5_Star_Rating_System_4_stars_T.png';
import img4AndHalf from '../../static/stars/5_Star_Rating_System_4_and_a_half_stars_T.png';

import img5 from '../../static/stars/5_Star_Rating_System_5_stars_T.png';

class BookDetail extends React.Component {

    constructor(props) { //...args used to be here before props
        super(props);    //...args used to be here before props
    
        this.state = { 
          modalShow: false,
          isLoaded: false,
          book: {}, 
          currentUser: sessionStorage.getItem("cart")
        };
        this.getReviews = this.getReviews.bind(this);
      }
/*
      state = { 
        book: {},
        currentUser: 7
    }
*/

      

    componentDidMount() {
        const id = this.props.match.params.id ;
        axios.get( `http://127.0.0.1:8000/api/${id}` )
            .then( res => {
                this.setState({
                    book: res.data,
                    isLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }



    getReviews(){
        let avg = 0;
         if(this.state.book.rating_set.length){
            this.state.book.rating_set.map(val => {
                avg += Number(val.stars);
                return true;
            });

             avg = avg / this.state.book.rating_set.length;
             console.log("length is: "+this.state.book.rating_set.length)
        console.log("avg is: " + avg)
        }

         let imgSrc;
        switch (true) {

            case (avg >= 0 && avg <= 0.2):
            imgSrc = img0; 
            break;

            case (avg >= 0.3 && avg <= 0.7):
            imgSrc = img0AndHalf;
            break;

            case (avg >= 0.8 && avg <= 1.2):
            imgSrc = img1;
            break;

            case (avg >= 1.3 && avg <= 1.7):
            imgSrc = img1AndHalf;
            break;

            case (avg >= 1.8 && avg <= 2.2):
            imgSrc = img2;
            break;

            case (avg >= 2.3 && avg <= 2.7):
            imgSrc = img2AndHalf;
            break;

            case (avg >= 2.8 && avg <= 3.2):
            imgSrc = img3;
            break;

            case (avg >= 3.3 && avg <= 3.7):
            imgSrc = img3AndHalf;
            break;

            case (avg >= 3.8 && avg <= 4.2):
            imgSrc = img4;
            break;

            case (avg >= 4.3 && avg <= 4.7):
            imgSrc = img4AndHalf;
            break;

            case (avg >= 4.8 && avg <= 5):
            imgSrc = img5;
            break;
    

             default:
            console.log("not found star")
                break;
        }

         return (<div><img className="bookDetail-star-img" src={imgSrc} alt=""/> </div>);
    }


    handleClickCart() { 
        axios.put(`http://127.0.0.1:8000/carts/${this.state.currentUser}/add_to_cart/`, `{"book_id":${this.state.book.id}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item had been added to your cart." )
    }

    handleClickSave() { 
        axios.put(`http://127.0.0.1:8000/carts/${this.state.currentUser}/save_later/`, `{"book_id":${this.state.book.id}}`,{headers: {"Content-Type": "application/json"}}  )
        alert( "Item had been saved for later. View it in your cart." )
    }

    render( ) {

        const currBookID = this.props.match.params.id 

        let modalClose = () => this.setState({ modalShow: false });

        var { isLoaded } = this.state;

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
                  <span>Genre: {this.state.book.category.name}</span>
                  <br></br>
                  <br></br>
                  <br></br>
                  {this.getReviews()}
                  <br></br>
                  <br></br>
                  <span className="price-money-symbol">$ </span>
                  <span className="price">{this.state.book.price}</span>
                  <br></br>

                  <div>    
                  <br></br>
                  <br></br>
                  <button onClick={ () => this.handleClickCart() }>Add this Book To Your Cart</button>
                  <br/><br/>
                  <button onClick={ () => this.handleClickSave() }>Save this Book for Later</button>                
                  </div>

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
          {this.state.book.authors.map(author => {
            return (
            
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

           );
          })}
       </ul>


       <br></br>
       <br></br>
       <h3>Customer Reviews</h3>
       {this.getReviews()} 
       <br></br>
       <h5>0 comments</h5>




        </div>



        )
    } 

}

export default BookDetail ;