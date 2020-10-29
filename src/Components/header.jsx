import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'
import noUser from '../noUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { getLoginDetails, logout } from '../config/firebase'
import { LoginDialogComp, RegisterDialogComp } from './dialog'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            openLoginDialog: false,
            openRegisterDialog: false,
            isLoggedIn: false,
            loading: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.checkLoginStatus()
    }
    checkLoginStatus = () => {
        console.log('getLogin')
        new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                this.state.loading = false
                if (!data.photoURL) data.photoURL = noUser.userPrimary
                this.setState(data)
            })
            .catch((status) => {
                this.setState({ isLoggedIn: false, loading: false })
            })
    }
    handleLogout = () => {
        this.state.loading = true
        new Promise((res, rej) => logout(res, rej))
            .then((result) => {
                this.setState({ isLoggedIn: false, loading: false })
                this.showSnackBar('Logout successful', 'success')
            })
            .catch((error) => {
                this.setState({ loading: false })
                this.showSnackBar(error.message, 'danger')
            })
    }
    showSnackBar = (msg, variant) => {
        this.props.enqueueSnackbar(msg, {
            variant,
            autoHideDuration: 5000
        });
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
    closeDialog(callCheck = false) {
        this.state.openRegisterDialog = false
        this.state.openLoginDialog = false
        if (callCheck) this.checkLoginStatus()
        else this.setState(this.state)
    }
    render() {
        return (
            <Navbar sticky="top" bg="light" className="b-b-2gry" expand="lg">
                <Backdrop className='fc-w zInd-12' open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                            <IconButton className="btn ml-3 ol-n bs-n" aria-label="chat">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <IconButton className="btn mr-2 ol-n bs-n" aria-label="notification">
                                <NotificationsNoneIcon />
                            </IconButton>
                            {/* <DropdownButton
                                menuAlign="right"
                                title="Dropdown right"
                                id="dropdown-menu-align-right"
                            >
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton
                                menuAlign="right"
                                title="Dropdown right"
                                id="dropdown-menu-align-right"
                            >
                                <Dropdown.Item>
                                    <div className="card" style={{ width: "300px" }}>
                                        <div className="card-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <img src={this.state.photoURL} id="userPhoto" alt="User Photo" className="card-img-top" />
                                            <h3 className="card-title" id="currentName">username</h3>
                                            <p className="card-text" id="currentEmail">email</p>
                                        </div>
                            <Link to="/"  style="display: flex; justify-content: center;" class="card-link btn btn-primary ml-2 mr-2">Logout</Link>
                            </div></Dropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </DropdownButton> */}
                            <Avatar className="mr-4 h-p" alt="user" onClick={this.handleLogout} src={this.state.photoURL} />
                            <Button className="mr-3 b-2blk f-20 ol-n bs-n" variant="outlined" color="primary">
                                <Link className="n-l f-b" to="/SellIt/post">+SELL</Link>
                            </Button>
                        </React.Fragment>)
                        : (
                            <React.Fragment>
                                <ButtonGroup className="ml-4 mr-3" variant="text" color="" aria-label="text primary button group">
                                    <Button className="f-b fc-blk ol-n pr-3 pl-3" onClick={() => this.openDialog('login')}>Login</Button>
                                    <Button className="f-b fc-blk ol-n pl-3 pr-3" onClick={() => this.openDialog('register')}>SignUp</Button>
                                </ButtonGroup>
                                <Button className="mr-3 b-2blk f-20 ol-n bs-n f-b" onClick={() => this.openDialog('login')} variant="outlined">+SELL</Button>
                            </React.Fragment>
                        )}
                    <LoginDialogComp onClose={(check) => this.closeDialog(check)} open={this.state.openLoginDialog} />
                    <RegisterDialogComp onClose={(check) => this.closeDialog(check)} open={this.state.openRegisterDialog} />
                    {/* </Nav> */}
                </div>
            </Navbar >
        )
    }
}
export default withSnackbar(Header);