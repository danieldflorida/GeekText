import React from 'react' 
import Modal from 'react-bootstrap/Modal';

import './EnlargedCover.css'




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
          </Modal.Header>
       

          <Modal.Body>         
            <div className="coverContainer">
            <img src={ this.props.data } className="bkCoverLarge" alt="cover" height="550" width="406"/>
            </div> 
          </Modal.Body>

      </Modal>

      );
    }
  }
export default MyVerticallyCenteredModal;