import React,{Component} from 'react';

import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component{
    render(){
        return(
            <Navbar sticky="top" bg="light" className="header" expand="lg">
            <Navbar.Brand className="ml-3" style={{fontSize: "30px"}}><b><Link className="n-l" to="/">SellIt</Link></b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* <Nav className="m-auto"> */}
                    <FormControl type="text" defaultValue="Pakistan" className="mr-sm-2 w-25" />
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 w-50" />
                    <Button  style={{ backgroundColor: "black" }}>
                        <SearchIcon style={{ color: "white" }} />
                    </Button>
                    <IconButton className="btn ml-3" aria-label="chat">
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <IconButton className="btn mr-2" aria-label="notification">
                        <NotificationsNoneIcon />
                    </IconButton>
                    <Avatar className="mr-4" alt="Remy Sharp" src={require("../Images/user.jpg")} />
                    <Button className="btn mr-3 b-2bl f-20" variant="outlined" color="primary"><b><Link className="n-l" to="/post">+SELL</Link></b></Button>
                {/* </Nav> */}
            </Navbar.Collapse>
            </Navbar>
        )}
}
export default Header;