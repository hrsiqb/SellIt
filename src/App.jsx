import React,{Component} from 'react';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'
import {Item} from './Components/item';
import Error404 from './Components/error';
import HomePage from './Components/homePage';
import Post from './Components/post';
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom"
import Youtube from './Components/skeleton'
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
            <Router>
                <Header />
                <CategoriesBar />
                
                <Switch>
                    <Route exact path={['/', '/home']} component={HomePage} />
                    <Route path='/item' component={Item} />
                    <Route path='/post' component={Post} />
                    {/* if the path does'nt match any of the available routes, show error */}
                    <Route path={'/'} component={Error404} />
                </Switch>

                <Footer />
            </Router>
            </div>
        )}
}
export default App;
