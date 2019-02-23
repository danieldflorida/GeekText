import React from 'react';
import {Navbar, Button, Dropdown, SplitButton,
     DropdownButton, FormControl, Form, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//can use props to display account name on Navbar
const NavbarView = (props) => 
{
    return(
        <Navbar bg="dark" variant="dark" fixed="top">
            
            <Navbar.Brand href="#home">
                GeekText
            </Navbar.Brand>  
            <Nav className="justify-content-center">
                <Nav.Item color="white">
                    Categories
                </Nav.Item>

                <Nav.Item>
                    Featured
                </Nav.Item>

                <Nav.Item>
                    Contact
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

            <div class="ml-auto p-2">
            <SplitButton
            alignRight
            title="Account"
            id="dropdown-menu-align-left"
            >
                <Dropdown.Item>
                    Account Settings
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    Shopping Cart
                </Dropdown.Item>
            </SplitButton>
            </div>
            
        </Navbar>
    )
}

export default NavbarView;