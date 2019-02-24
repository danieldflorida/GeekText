import React from 'react' 
import BookCover from './EnlargeCover'
import MyVerticallyCenteredModal from './EnlargeCover'

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/Button'




 class BookInfo extends React.Component {
    constructor(...args) {
        super(...args);
    
        this.state = { modalShow: false };
      }
    
   render (){
    let modalClose = () => this.setState({ modalShow: false });
       return(
        
        <div>

    
            <div className="container">
        
                <div className="left-container">
                    <img src={ this.props.data.cover } onClick={() => this.setState({ modalShow: true })} className="bkCover" alt="cover" height="406" width="300"/>

                    <MyVerticallyCenteredModal
                        show={this.state.modalShow}
                        onHide={modalClose}
                        data = {this.props.data.cover}
                    />
         {/*           
        <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
         */}
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