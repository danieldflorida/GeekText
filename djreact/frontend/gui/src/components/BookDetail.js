import React from 'react' 
import MyVerticallyCenteredModal from './EnlargedCover'
import '../stylingFiles/BookDetail.css'



 class BookInfo extends React.Component {
    constructor(...args) {
        super(...args);
    
        this.state = { modalShow: false };
      }
    
   render (){
    let modalClose = () => this.setState({ modalShow: false });
       return(
        
        <div>

            <MyVerticallyCenteredModal
              show={this.state.modalShow}
              onHide={modalClose}
              data = {this.props.data.cover}
            />
            
        
    
            <div className="container">
            
        
                <div className="left-column-container">
                    <div className="small-cover-container">
                      <img src={ this.props.data.cover } onClick={() => this.setState({ modalShow: true })} className="small-bkCover" alt="cover" height="406" width="300"/>
                    </div>
                    

                    <div className="publisher-info-container">
                      <span>{this.props.data.pages} pages</span><br></br>
                      <span>ISBN-10: {this.props.data.ISBNTen} </span><br></br>
                      <span>ISBN-13: {this.props.data.ISBNThirteen} </span><br></br>
                      <span>Publisher: {this.props.data.publisher}</span><br></br>
                      <span>Publication Date: {this.props.data.publicationDate}</span><br></br>
                    </div>

                </div>
            



                 <div className="right-column-container">
                    <h3>{this.props.data.title}</h3>
                    <span>Genre: {this.props.data.genre}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span className="price-money-symbol">$ </span>
                    <span className="price">{this.props.data.price}</span>
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