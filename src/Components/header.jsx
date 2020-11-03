import React, { Component } from 'react';
import { Navbar, FormControl } from 'react-bootstrap'
import { noUser } from '../data'
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
import Dropdown from 'react-bootstrap/Dropdown'
import { FiLogOut, FiChevronDown } from 'react-icons/fi';
import { GrDown } from 'react-icons/gr';
import { BsFiles } from 'react-icons/bs';
import history from '../history';

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
        new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                this.state.loading = false
                if (!data.photoURL) data.photoURL = noUser.userPrimary
                this.setState(data)
            })
            .catch((error) => {
                this.setState({ isLoggedIn: false, loading: false })
            })
    }
    handleLogout = () => {
        this.state.loading = true
        new Promise((res, rej) => logout(res, rej))
            .then(() => {
                this.setState({ isLoggedIn: false, loading: false })
                this.showSnackBar('Logout successful', 'success')
                if (this.props.history.location.pathname.includes('post')) {
                    this.props.history.push('/SellIt')
                }
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
                    <Navbar.Collapse id="basic-navbar-nav">
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

                                <Dropdown alignRight>
                                    <Dropdown.Toggle className="d-n-a bc-trn mr-4 p-0 b-n bs-n" id="user-dropdown" >
                                        <div className="w-100 h-100 d-fr ai-c">
                                            <Avatar className="" alt="user" src={this.state.photoURL} />
                                            <GrDown className="f-22 ml-1" />
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="mt-1 p-3">
                                        <section className="d-fr ai-c h-p">
                                            <Avatar className="sellerAvatar" alt="userAvatar" src={this.state.photoURL} />
                                            <section className="ml-3">
                                                <p className="f-22 f-b7 m-0">{this.state.displayName}</p>
                                                <p className="text-secondary f-14 m-0">{this.state.email}</p>
                                            </section>
                                        </section>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className="p-2 pl-0"><BsFiles className="mr-3 f-22" />My Adds</Dropdown.Item>
                                        <Dropdown.Item className="p-2 pl-0" onClick={this.handleLogout}><FiLogOut className="mr-3 f-22" />Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
                            )}</Navbar.Collapse>
                    <LoginDialogComp onClose={(check) => this.closeDialog(check)} open={this.state.openLoginDialog} />
                    <RegisterDialogComp onClose={(check) => this.closeDialog(check)} open={this.state.openRegisterDialog} />
                    {/* </Nav> */}
                </div>
            </Navbar >
        )
    }
}
export default withSnackbar(Header);