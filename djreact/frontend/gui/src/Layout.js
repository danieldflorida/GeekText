import React from 'react' ;
import NavbarView from './NavbarView';

import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const CustomLayout = (props) =>
{
   
    return(
        <div>
            <NavbarView username={props.username}/>
                <div 
                align="center"
                style={{ background: '#fff', 
                    marginTop: 100, 
                    minHeight: 100,
                    alignContent: 'center' }}
                >
                    {props.children}
                </div>
        </div>

)

}
export default CustomLayout ;

  