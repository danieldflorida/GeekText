import React from 'react' 
//import 'bootstrap/dist/css/bootstrap.css';


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