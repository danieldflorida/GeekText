import React from 'react' 


import '../stylingFiles/BookInformation.css'

 class BookInfo extends React.Component {
  
    
   render (){
       return(
        
        
            <div className="container">
        
                <div className="left-container">
                    <img src={ this.props.data.cover } className="bkCover" alt="cover" height="550" width="406"/>
                    <p>Publisher: {this.props.data.publisher}</p>
                    <p>Publication Date: {this.props.data.publicationDate}</p> 
                </div>
            



                 <div className="right-container">
                    <h2>{this.props.data.title}</h2>
                    <br></br>
                    <span className="price">${this.props.data.price}</span>
                    <br></br>
                    
                    <div>
                    <p>Genre: {this.props.data.genre}</p>

                    <br></br>
                    <span className="overview">Overview</span>
                    <p>{this.props.data.description}</p>
                    </div>

                 </div>
        
             </div>

    
       )
 } 
  

}

export default BookInfo;