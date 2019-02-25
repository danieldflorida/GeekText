import React from 'react' 
//import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../stylingFiles/BookCover.css'
import '../stylingFiles/BookDetail.css'
//import  from 'react-bootstrap/Button';



/*
class BookCover extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpened: false
        }
    }
 

    render( ) {

        const imageClick = () => {
            console.log('Click');
          }

        return (

            //<img src={ this.props.data.cover } className="bkCover" alt="cover" height="550" width="406"/>
            //<img src={ this.props.data } className="bkCover" alt="cover" height="550" width="406"/>
            <img src={ this.props.data } onClick={() => imageClick()} className="bkCover" alt="cover" height="550" width="406"/>
      
            
      
        )
           
        
    }



}

export default BookCover;
*/


class MyVerticallyCenteredModal extends React.Component {
    render() {
      return (
        <div className="modal-container">
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
         >
        <div className="header-container">
          <div className="header-button">
            <Modal.Header closeButton>            
            </Modal.Header>
          </div>
        </div>
        
        
          <Modal.Body>         
            <div className="coverContainer">
            <img src={ this.props.data } className="bkCoverLarge" alt="cover" height="550" width="406"/>
            </div> 
          </Modal.Body>
      

      </Modal>
      </div>
      );
    }
  }
export default MyVerticallyCenteredModal;