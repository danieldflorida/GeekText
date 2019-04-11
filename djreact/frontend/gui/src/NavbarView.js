import React from 'react';
import {Navbar, Button, Dropdown, SplitButton,
    FormControl, Form, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './styling/HomePageView.css'

function resetUsername() 
{
    sessionStorage.setItem("username", ""); //somehow change this to null
}

//can use props to display account name on Navbar
const NavbarView = (props) => 
{
    const user = sessionStorage.getItem("username")
    const ButtonDisplay = 
    <div className="ml-auto py-2 pl-1 pr-5 custom-navbar" align="right">
        <SplitButton
        title={user}
        id="dropdown-menu dropdown-menu-left"
        //id="dropdown-menu-pull-right"
        >
            <Dropdown.Item href={"/profile/" + user}>
                Profile
            </Dropdown.Item>
            <Dropdown.Item href={"/settings/" + user}>
                Edit Profile
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href={"/" + props.username + "/cart"}>
                Shopping Cart
            </Dropdown.Item>
            <Dropdown.Item href={"/" + props.username + "/orders"}>
                Orders
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href="/home" onClick={resetUsername}>
                Logout
            </Dropdown.Item>
        </SplitButton>
    </div>

    const signInLink = 
    <div className="ml-auto p-2" align = "right">
        <Nav.Item>
            <Nav.Link href="/home">Login / Sign Up</Nav.Link>
        </Nav.Item>
    </div>
     
    
    return(
        <Navbar bg="dark" variant="dark" fixed="top" className="custom-navbar">
            
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
            <div className="">
            <Form inline>
                <FormControl 
                type="text" 
                placeholder="Search" 
                className="mr-sm-2" 
                />
                <Button variant="outline-info">Search</Button>
            </Form>
            </div>
            
            
            {user === null || user === "" ? signInLink : ButtonDisplay}
            
        </Navbar>
    )
}

export default NavbarView;