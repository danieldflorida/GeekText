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
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
         >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <img src={ this.props.data } className="bkCover" alt="cover" height="550" width="406"/>
          {/*
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      );
    }
  }
export default MyVerticallyCenteredModal;