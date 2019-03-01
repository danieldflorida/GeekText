import React from 'react';
import {Navbar, Button, Dropdown, SplitButton,
    FormControl, Form, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//can use props to display account name on Navbar
const NavbarView = (props) => 
{
    return(
        <Navbar bg="dark" variant="dark" fixed="top">
            
            <Navbar.Brand href="/home">
                GeekText
            </Navbar.Brand>  
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href="/">Books</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                <Nav.Link href="#">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="#">Contact</Nav.Link>
                </Nav.Item>
                        
            </Nav>
            
            <Form inline>
                <FormControl 
                type="text" 
                placeholder="Search" 
                className="mr-sm-2" 
                />
                <Button variant="outline-info">Search</Button>
            </Form>

            <div className="ml-auto p-2" >
            <SplitButton
            alignRight
            title={props.username}
            id="dropdown-menu-align-left"
            >
                <Dropdown.Item href={"/" + props.username}>
                    Profile
                </Dropdown.Item>
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    Shopping Cart
                </Dropdown.Item>
                <Dropdown.Item>
                    Orders
                </Dropdown.Item>
            </SplitButton>
            </div>
            
        </Navbar>
    )
}

export default NavbarView;