import React,{Component} from 'react';
// import './header.css';

import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component{
    render(){
        return(
            <Navbar bg="light" className="header" expand="lg">
            <Navbar.Brand className="ml-3" href="#home" style={{fontSize: "30px"}}><b>SellIt</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* <Nav className="m-auto"> */}
                    <FormControl type="text" value="Pakistan" className="mr-sm-2 w-25" />
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
                    <Button className="btn mr-3" variant="outlined" color="primary" style={{fontSize: "20px"}}><b>+SELL</b></Button>
                {/* </Nav> */}
            </Navbar.Collapse>
            </Navbar>
        )}
}
export default Header;
