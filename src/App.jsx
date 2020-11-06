import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'
import Item from './Components/item';
import { Error404 } from './Components/error';
import Home from './Components/home';
import Post from './Components/post';
import Chat from './Components/chat';
import PostSuccess from './Components/postSuccess';
import { noUser } from './data'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getLoginDetails, getUserData } from './config/firebase'
import {
    Route, Switch,
    HashRouter as Router, // if deploying on sub-directory uncomment this line
    // BrowserRouter as Router, // if deploying on root directory uncomment this line
    withRouter
} from "react-router-dom"
import { connect } from "react-redux";
import { set_data, get_data } from './store/action'

class App extends Component {
    constructor() {
        super()
        this.state = {
            render: {},
            userInfo: {}
        }
    }
    componentDidMount() {
        this.checkLoginStatus()
    }
    checkLoginStatus = () => {
        this.state.render.loading = true
        this.setState(this.state)
        new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                if (!data.photoURL) data.photoURL = noUser
                this.state.userInfo = data
                if (data.phone) {
                    this.state.userInfo.isLoggedIn = true
                    this.state.render.loading = false
                    this.setState(this.state)
                }
                else {
                    new Promise((res, rej) => getUserData(res, rej, data.uId))
                        .then((data) => {
                            this.state.userInfo.phone = data.phone
                            this.state.userInfo.friends = data.friends
                            this.state.userInfo.isLoggedIn = true
                            this.state.render.loading = false
                            this.setState(this.state)
                            console.log(this.state)
                        })
                        .catch((error) => {
                            this.state.userInfo.isLoggedIn = false
                            this.state.render.loading = false
                            this.setState(this.state)
                        })
                }
            })
            .catch(() => this.props.history.push('/'))
    }
    render() {
        return (
            <div className="root">
                <Backdrop className='fc-w zInd-12' open={this.state.render.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* {!this.state.render.loading && */}
                <Router>
                    {/* <Header /> */}
                    <Route path='/' component={Header} />
                    <Route path='/' component={CategoriesBar} />
                    {/* <CategoriesBar /> */}
                    <Switch>
                        <Route exact path={['/', '/home']} children={<Home userInfo={this.state.userInfo} get_data={this.props.get_data} />} />
                        <Route path='/item/:id' children={<Item userInfo={this.state.userInfo} get_data={this.props.get_data} />} />
                        <Route path='/post/success' children={<PostSuccess userInfo={this.state.userInfo} />} />
                        <Route path='/post' children={withRouter(<Post userInfo={this.state.userInfo} />)} />
                        <Route path='/chat' children={<Chat userInfo={this.state.userInfo} />}></Route>
                        {/* if the path does'nt match any of the available routes, show error */}
                        <Route path={['/', '/', '/item']} component={Error404} />
                    </Switch>

                    <Route path='/' component={Footer} />
                    {/* <Footer /> */}
                </Router>
                {/* } */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({//used for properties
    AllAddsData: {
        addsToAppend: state.addsToAppend,
        numberOfAdds: state.numberOfAdds,
        firstRun: state.firstRun,
        appendedData: state.appendedData,
        fetchedData: state.fetchedData,
    }
})

const mapDispatchToProp = (dispatch) => ({//used for functions
    set_data: (data) => dispatch(set_data(data)),
    get_data: (type, resolve, reject, id) => dispatch(get_data(type, resolve, reject, id))
})

export default connect(mapStateToProps, mapDispatchToProp)(App);