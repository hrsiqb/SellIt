import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { cities } from '../data'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { logout } from '../config/firebase'
import { LoginDialogComp, RegisterDialogComp } from './dialog'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class Header extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: {},
            search: { city: "All Pakistan" },
            openLoginDialog: false,
            openRegisterDialog: false,
            loading: false
        }
    }
    handleChange = action => e => {
        this.state.search[action] = e.target.value
        switch (action) {
            case 'city':
                // this.state.search.city = e.target.value
                this.setState(this.state)
                this.props.search('city', e.target.value)
                break
            case 'search':
                // this.state.search.search = e.target.value
                break
            default:
                break
        }
    }
    handleKeyDown = e => e.key === 'Enter' && this.handleSearch()
    handleSearch = () => this.props.history.push({ pathname: '/', search: this.state.search.search })
    handleLogout = () => {
        this.state.loading = true
        new Promise((res, rej) => logout(res, rej))
            .then(() => {
                this.setState({ ...this.state, isLoggedIn: false, loading: false })
                this.props.loginCallback()
                this.showSnackBar('Logout successful', 'success')
                if (this.props.history.location.pathname.includes('post')
                    || this.props.history.location.pathname.includes('chat')) this.props.history.push('/')
            })
            .catch((error) => {
                this.setState({ ...this.state, loading: false })
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
        if (callCheck) this.props.loginCallback()
        else this.setState(this.state)
    }
    render() {
        this.props.userInfo.isLoggedIn ? this.state.userInfo = this.props.userInfo
            : this.state.userInfo.isLoggedIn = false
        return (
            <Navbar sticky="top" bg="light" className="b-b-2gry mn-vh-10" expand="lg">
                <Backdrop className='fc-w zInd-12' open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Navbar.Brand className="ml-3" style={{ fontSize: "30px" }}><b><Link className="n-l ol-n" to="/">SellIt</Link></b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <div id="basic-navbar-nav" className="d-c">
                    {/* <Nav className="m-auto"> */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <FormControl disabled={this.props.loading} variant="outlined" className="w-100 w-m-270px mr-2 bc-w">
                            <Select
                                className="h-40"
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                value={this.state.search.city}
                                onChange={this.handleChange('city')}
                            >
                                {cities.map(name => (
                                    <MenuItem key={name} value={name}>
                                        <LocationOnIcon className="mr-2" />{name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField disabled={this.props.loading} onChange={this.handleChange('search')} onKeyDown={this.handleKeyDown} size="small"
                            className="w-80 w-m-538px mr-2 bc-w" id="outlined-basic" variant="outlined" />
                        <Button disabled={this.props.loading} className="ol-n bc-blk fc-w h-40" onClick={this.handleSearch}>
                            <SearchIcon />
                        </Button>
                        {this.state.userInfo.isLoggedIn ? (
                            <React.Fragment>
                                <IconButton className="btn ml-3 ol-n bs-n" aria-label="chat"
                                    onClick={() => this.props.history.push('/chat')}>
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                                <IconButton className="btn mr-2 ol-n bs-n" aria-label="notification">
                                    <NotificationsNoneIcon />
                                </IconButton>

                                <Dropdown alignRight>
                                    <Dropdown.Toggle className="d-n-a bc-trn mr-4 p-0 b-n bs-n" id="user-dropdown" >
                                        <div className="w-100 h-100 d-fr ai-c">
                                            <Avatar className="" alt="user" src={this.state.userInfo.photoURL} />
                                            <GrDown className="f-22 ml-1" />
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="mt-1 p-3">
                                        <section className="d-fr ai-c h-p">
                                            <Avatar className="sellerAvatar" alt="userAvatar" src={this.state.userInfo.photoURL} />
                                            <section className="ml-3">
                                                <p className="f-22 f-b7 m-0 f-cap">{this.state.userInfo.displayName}</p>
                                                <p className="text-secondary f-14 m-0">{this.state.userInfo.email}</p>
                                            </section>
                                        </section>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className="p-2 pl-0"><BsFiles className="mr-3 f-22" />My Adds</Dropdown.Item>
                                        <Dropdown.Item className="p-2 pl-0" onClick={this.handleLogout}><FiLogOut className="mr-3 f-22" />Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button onClick={() => this.props.history.push('/post')} className="mr-3 b-2blk f-20 ol-n bs-n f-b"
                                    variant="outlined">+SELL</Button>
                            </React.Fragment>)
                            : (
                                <React.Fragment>
                                    <ButtonGroup className="ml-4 mr-3" variant="text" color="" aria-label="text primary button group">
                                        <Button disabled={this.props.loading} className="f-b fc-blk ol-n pr-3 pl-3" onClick={() => this.openDialog('login')}>Login</Button>
                                        <Button disabled={this.props.loading} className="f-b fc-blk ol-n pl-3 pr-3" onClick={() => this.openDialog('register')}>SignUp</Button>
                                    </ButtonGroup>
                                    <Button disabled={this.props.loading} className="mr-3 b-2blk f-20 ol-n bs-n f-b" onClick={() => this.openDialog('login')}
                                    >+SELL</Button>
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