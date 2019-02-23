import React from 'react' 
import BookCover from './EnlargeCover'


import '../stylingFiles/BookDetail.css'

 class BookInfo extends React.Component {
  
    
   render (){
       return(
        
        <div>
            <div className="container">
        
                <div className="left-container">
                    {/*<img src={ this.props.data.cover } className="bkCover" alt="cover" height="550" width="406"/>*/}
                    <BookCover data = {this.props.data.cover}/>
                    <span>{this.props.data.pages} pages</span><br></br>
                    <span>ISBN-10: {this.props.data.ISBNTen} </span><br></br>
                    <span>ISBN-13: {this.props.data.ISBNThirteen} </span><br></br>
                    <span>Publisher: {this.props.data.publisher}</span><br></br>
                    <span>Publication Date: {this.props.data.publicationDate}</span><br></br>
                </div>
            



                 <div className="right-container">
                    <h2>{this.props.data.title}</h2>
                    <span>Genre: {this.props.data.genre}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span className="price">${this.props.data.price}</span>
                    <br></br>
                    
                    
                    

                    

                 </div>
        
            </div>

            <br></br>
            <div className="overview">
            <br></br>
            <h3 className="overview-header">Overview</h3>
            <p>{this.props.data.description}</p>
            </div>

        </div>
       )
 } 
  

}

export default BookInfo;