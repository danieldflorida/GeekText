import React from 'react' 
import Axios from 'axios'
import { Image, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './ProfileView.css'

//import {FormText, FormControl, Navbar, Nav} from 'react-bootstrap'

class ProfileView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            //personal info
            profilePic: null,
            bio: '',
            name: null,
            userId: null,
            comments: [], //used to hold comments table from API
            renderComments: null //used to render comments in a profie
        }
    }
    getBook(id)
    {
        return Axios.get(`http://127.0.0.1:8000/api/books/${id}`);
        
    }

    renderComments()
    {
        const array = this.state.comments;
        //const thing = this.getBook(array[0].book)
        //.then(res => res.data.title);
        
        function cover(id) {
            var cover;
            Axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((res) => {
                console.log(res.data.cover);
                cover = res.data.cover;
            })
            return cover;
        }
        function title(id) {
            var title = 'title';
            Axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((res) => {
                console.log(res.data.title);
                title = res.data.title;
            })
            return title;
        }
       
        const comments = array.map(elem  => 
            <ListGroup.Item key={elem.comment}>
                <Image 
                className="inline book-cover"
                src={cover(elem.book)}
                width='75' 
                height ='100' />
                <h5 className="inline">{title(elem.book)}</h5>
                <div className="comment">{elem.comment}</div>
            </ListGroup.Item>
        );
  
        return (
            <ListGroup className="comment-block">
                {comments}
            </ListGroup>
        )
    }

    fetchProfileData(user)
    {
         //Access user data
         Axios.post(`http://127.0.0.1:8000/api/users/find_user/`, 
         {username : user},
         {headers: {"Content-Type": "application/json"}})
         .then((res) => {
           const data = res.data;
           
           this.setState({name : data.name});
         })
 
         //Access profile data
 
         Axios.post(`http://127.0.0.1:8000/api/profiles/find_profile/`,
         {
             username: user
         })
         .then((res) => {
             this.setState({
                 profilePic: res.data.picture,
                 bio: res.data.bio
             })
         })
         //Access comments data
         Axios.post(`http://127.0.0.1:8000/api/comments/find_comments/`,
         {
             username: user
         })
         .then((res) => {
             var list = [] 
             list = res.data;
             this.setState({
                 comments: list
             })
             
             this.setState({
                 renderComments: this.renderComments()
             })
         
         })       
    }

    componentDidMount () 
    {
        const user = this.props.match.params.username;
       
        this.fetchProfileData(user);
    }
    

    render()
    {
        return(
            <div className="outer-div">
                <div className="middle-div">
                    {/*Profile Picture Area */}
                    <div className='profile-pic'>
                        <Image src={'http://127.0.0.1:8000' + this.state.profilePic} roundedCircle height="100" width="100"/>
                        <h2 className='header'>{this.state.name}</h2>
                    </div>
     
                    {/* Bio */}
                    <div className="bio">
                        <h3>Bio</h3>
                        {this.state.bio}
                    </div>

                    {/* Comments Area */}
                    <h4 className="header">Comments</h4>
                    {this.state.renderComments}
                    
                    
                </div>
                
                {/* Owned Books */}
                <div className="right-div">
                    <h5 className="header">Owned Books</h5>
                </div>
            </div>
        )
    }
        
}

export default ProfileView;