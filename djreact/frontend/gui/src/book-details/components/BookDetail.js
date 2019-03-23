import React from 'react' 
import MyVerticallyCenteredModal from './EnlargedCover'
import './BookDetail.css'

 
 class BookInfo extends React.Component {
    constructor(props) { //...args used to be here before props
        super(props);    //...args used to be here before props
    
        this.state = { 
          modalShow: false,
          error: null,
          isLoaded: false,
          items: [],
          //items: this.props.data.authors,
        };
        //console.log(this.props.data.authors);
      }


      /*
      componentWillMount(){
        this.setState({items: this.props.data.authors});
      }
      */

/*

     componentDidMount(){
      const id = this.props.urlID
      fetch(`http://127.0.0.1:8000/api/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      });
     }
*/

     componentDidMount(){
      fetch('http://localhost:8000/api/3')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      });
     }

      /*
      componentDidMount(){
        //this.getItems();
        var auths = JSON.stringify(this.props.data.authors)

              this.setState(
                {
                  isLoaded: true,
                  items: auths
                });

      
      }
      */

   /*
    componentDidMount(){
      //this.getItems();

      fetch('http://localhost:8000/api/1')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                items: this.props.data.authors[0]
              });
          }, 
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    
    }
    */
     
   /* 
   getItems() {
        
           fetch('http://localhost:8000/api/1')
        .then(results => results.json())
        .then(results => this.setState({'items': results}));
     
    
    }
    */ 
    

      
    
   render (){
  //  const { items } = this.state
  //  if (this.props.data.authors == null){
  //    this.setState({isNull: true})
  //  }


  //const { authors = [] } = this.props.data;
/*
  setTimeout(() => {
    this.setState({items: this.props.data.authors});
  }, 3000)
*/



    let modalClose = () => this.setState({ modalShow: false });


    var { isLoaded, items } = this.state
    if (!isLoaded){
      return <div>Loading...</div>
    } else


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

           


            <div>
            {/*JSON.stringify(this.props.data.authors)*/}
            <h1>{/*this.props.authors*/}</h1>
            

            {/*
            <h3>URL = {this.props.url}</h3>
            {console.log("BookDetail's fetch: "+this.state.items)}
            {console.log("BookDetailView's axios thing: "+this.props.data.authors)}
            */
            }




            {/*this.props.data.authors[0].name*/}
            

           {/*The followint works*/} 
           {
            /*
            <ul>
                  {items.authors.map(item => (
                    <li key={item.id}>
                    <h3>Author:</h3> 
                    {items.authors[0].name}
                    <br></br>

                    <h3>Biography:</h3>
                    <p>{items.authors[0].biography}</p>
                  </li>
                  ))};

                 
             
            </ul>
            */
            }
                
            

        

            <ul>
              {/*this.state && this.state.items && this.state.items.map(item =>
                <li key={item.id}>{item.name}</li>
              )*/}
            </ul>

          
            {/*console.log(this.props.data.authors)*/}
   

            <ul>
            {/*this.state && this.state.items && this.state.items.map(item =>
              <li key={item.id}>{item.name}</li>
            )*/}
            </ul>


            {/*JSON.stringify(this.props.data.authors)*/}

              {
                /*
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                  {item.name} {item.biography}
                   </li>
                 ))}
             </ul>
             */
              }

            {/*Object.keys(this.state.items.data).map((key) => ({key}))*/}
            {/*JSON.parse(this.props.data.authors)*/}

            {
              /*
            <ul>
              {this.state.items.map(function(item, id) {
                return (
                  <div key={id}>
                    <h1>{item.name}</h1>
                    <p>{item.biography}</p>
                  </div>
                )
              }
              )}
            
            </ul>
            */
            } 

            {/*console.log(this.props.data.authors)*/}
            <h3> {/*name*/}</h3>
            
            {/*
              console.log(this.props.data.authors[0].id)
              */
            }
            {/*JSON.stringify(this.props.data.authors)*/}
            
            {/*
            {this.props.data.authors.map((author)=> 
              <div key={author.id}>
                <h3>{author.name}</h3>
                <p>{author.biography}</p>
              </div>
            )}
            */}
            </div>
            
            
        </div>
       )
 } 
  

}

export default BookInfo;