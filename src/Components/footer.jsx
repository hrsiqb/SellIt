import React,{Component} from 'react';
// import './header.css';

import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsEnvelope } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CgWebsite } from 'react-icons/cg';
import { FiPhone } from 'react-icons/fi';
import { RiFacebookCircleLine, RiYoutubeLine, RiInstagramLine, RiTwitterLine  } from 'react-icons/ri';
// import { RiFacebookCircleLine } from 'react-icons/ri';
// import { RiFacebookCircleLine } from 'react-icons/ri';
// import { RiFacebookCircleLine } from 'react-icons/ri';
// import { RiFacebookCircleLine } from 'react-icons/ri';
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

class Footer extends Component{
    render(){
        return(
            <div>
                <div className="col-md-12 pl-5 pr-5 pt-2 pb-3" style={{backgroundColor: "rgb(0, 44, 102)"}}>
                    <div className="row">
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Top Categories</b></h6>
                            <Nav.Link href="#home" className="footerLink">Mobile Phones</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Lands & Plots</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Motocycles</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Cars</Nav.Link>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Trending Searches</b></h6>
                            <Nav.Link href="#home" className="footerLink">Bikes</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Watches</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Jobs</Nav.Link>
                            <Nav.Link href="#home" className="footerLink">Mobiles</Nav.Link>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>About Us</b></h6>
                            <Nav.Link href="#home" className="footerLink">About SellIt</Nav.Link>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Contact Details</b></h6>
                            <p className="footerLink"><HiOutlineLocationMarker /> Islamabad Pakistan</p>
                            <p className="footerLink"><BsEnvelope /> SellIt@gmail.com</p>
                            <p className="footerLink"><CgWebsite /> SellIt</p>
                            <p className="footerLink"><FiPhone /> 03123456789</p>
                        </div>
                    </div>
                </div>
                <div className="socialFooter">
                    <h3 className="socialHeading">Follow Us</h3>
                    <div className="socialBody">
                        <Nav.Link href="https://facebook.com"><RiFacebookCircleLine color="blue" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://youtube.com"><RiYoutubeLine color="red" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://instagram.com"><RiInstagramLine color="#dd3170" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://twitter.com"><RiTwitterLine color="rgb(29 161 242)" className="socialIcon" /></Nav.Link>
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    &copy;2020 Copyright, SellIt
                </div>
            </div>
        )}
}
export default Footer;
