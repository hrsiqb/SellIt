import React,{Component} from 'react';
// import './categoriesBar.css';

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
            <Navbar className="categoriesBar" expand="lg">
                <NavDropdown className="dropdownTitle" title="ALL CATEGORIES" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#home">Mobile Phones</Nav.Link>
                <Nav.Link href="#home">Cars</Nav.Link>
                <Nav.Link href="#home">Tablets</Nav.Link>
                <Nav.Link href="#home">TV-Video_Audio</Nav.Link>
                <Nav.Link href="#home">Houses</Nav.Link>
                <Nav.Link href="#home">Lands & Plots</Nav.Link>
            </Navbar>
        )}
}
export default Header;
