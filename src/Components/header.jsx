import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'
import noUser from '../noUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { loginWithFacebook, getLoginDetails } from '../config/firebase'
import { LoginDialog, RegisterDialog } from './dialog'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    constructor() {
        super()
        this.state = {
            openLoginDialog: false,
            openRegisterDialog: false,
            isLoggedIn: false
        }
    }
    openDialog(type) {
        switch (type) {
            case 'login':
                this.state.openLoginDialog = true
                this.setState(this.state)
                break;
            case 'register':
                this.state.openRegisterDialog = true
                this.setState(this.state)
                break;
        }
    }
    closeDialog() {
        console.log("this.props.onClose")
        this.state.openRegisterDialog = false
        this.state.openLoginDialog = false
        this.setState(this.state)
    }
    render() {
        let promise = new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                if (!data.photoURL) data.photoURL = noUser.userPrimary
                this.setState(data)
                console.log(this.state)
            })
            .catch((status) => {
                // this.setState({isLoggedIn: false})
            })
        return (
            <Navbar sticky="top" bg="light" className="b-b-2gry" expand="lg">
                <Navbar.Brand className="ml-3" style={{ fontSize: "30px" }}><b><Link className="n-l ol-n" to="/SellIt/">SellIt</Link></b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <div id="basic-navbar-nav" className="d-c">
                    {/* <Nav className="m-auto"> */}
                    <FormControl type="text" defaultValue="Pakistan" className="mr-sm-2 w-25" />
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 w-50" />
                    <Button className="ol-n bc-blk">
                        <SearchIcon style={{ color: "white" }} />
                    </Button>
                    {this.state.isLoggedIn ? (
                        <React.Fragment>
                            <IconButton className="btn ml-3" aria-label="chat">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <IconButton className="btn mr-2" aria-label="notification">
                                <NotificationsNoneIcon />
                            </IconButton>
                            <Avatar className="mr-4" alt="Remy Sharp" src={this.state.photoURL} />
                        </React.Fragment>)
                        : (
                            <React.Fragment>
                                <ButtonGroup className="ml-4 mr-3" variant="text" color="" aria-label="text primary button group">
                                    <Button className="f-b fc-blk ol-n pr-3 pl-3" onClick={() => this.openDialog('login')}>Login</Button>
                                    <Button className="f-b fc-blk ol-n pl-3 pr-3" onClick={() => this.openDialog('register')}>SignUp</Button>
                                </ButtonGroup>
                            </React.Fragment>
                        )}
                    <Button className="mr-3 b-2blk f-20 ol-n bs-n" variant="outlined" color="primary"><b><Link className="n-l" to="/SellIt/post">+SELL</Link></b></Button>
                    <LoginDialog onClose={() => this.closeDialog()} open={this.state.openLoginDialog} />
                    <RegisterDialog onClose={() => this.closeDialog()} open={this.state.openRegisterDialog} />
                    {/* </Nav> */}
                </div>
            </Navbar>
        )
    }
}
export default Header;