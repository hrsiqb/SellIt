import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'

import Skeleton from '@material-ui/lab/Skeleton';
// import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import Avatar from '@material-ui/core/Avatar';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

class App extends Component{
    render(){
        return(
            <div className="root"> 
                <Header />
                <CategoriesBar />
                <div className="img"></div>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{margin: "20px"}}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton width="80%"/>
                        <Skeleton width="60%" />
                    </div>
                    <div style={{margin: "20px"}}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton width="80%"/>
                        <Skeleton width="60%" />
                    </div>
                    <div style={{margin: "20px"}}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton width="80%"/>
                        <Skeleton width="60%" />
                    </div>
                    <div style={{margin: "20px"}}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton width="80%"/>
                        <Skeleton width="60%" />
                    </div>
                    <div style={{margin: "20px"}}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton width="80%"/>
                        <Skeleton width="60%" />
                    </div>
                </div>

                <Footer />
            </div>
        )}
}
export default App;
