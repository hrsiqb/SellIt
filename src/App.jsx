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
} from "react-router-dom"
import { connect } from "react-redux";
import { set_data, get_data } from './store/action'

class App extends Component {
    constructor() {
        super()
        this.state = {
            render: {},
            userInfo: {},
            search: { 'city': "All Pakistan" }
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
                if (!data.photoURL) data.photoURL = noUser.userPrimary
                this.state.userInfo = data
                // if (data.phone) {
                //     this.state.userInfo.isLoggedIn = true
                //     this.state.render.loading = false
                //     this.setState(this.state)
                // }
                // else {
                new Promise((res, rej) => getUserData(res, rej, data.uId))
                    .then((data) => {
                        this.state.userInfo.phone = data.phone
                        this.state.userInfo.friends = data.friends
                        this.state.userInfo.isLoggedIn = true
                        this.state.render.loading = false
                        this.setState(this.state)
                    })
                    .catch((error) => {
                        this.state.userInfo.isLoggedIn = false
                        this.state.render.loading = false
                        this.setState(this.state)
                    })
                // }
            })
            .catch(() => {
                this.state.userInfo.isLoggedIn = false
                this.state.render.loading = false
                this.setState(this.state)
            })
    }
    search = (type, keyword) => {
        this.state.search = { [type]: keyword }
        this.props.history.push('/')
        this.setState(this.state)
    }
    render() {
        return (
            <div className="root">
                <Backdrop className='fc-w zInd-12' open={this.state.render.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Router>
                    {/* <Header /> */}
                    <Route path='/' children={<Header history={this.props.history} search={this.search}
                        loginCallback={this.checkLoginStatus} loading={this.state.render.loading} userInfo={this.state.userInfo} />} />
                    <Route path='/' children={<CategoriesBar history={this.props.history} search={this.search} />} />
                    {/* <CategoriesBar /> */}
                    <Switch>
                        <Route exact path={['/', '/home']} children={<Home history={this.props.history} loading={this.state.render.loading}
                            userInfo={this.state.userInfo} search={this.state.search} get_data={this.props.get_data} />} />
                        <Route path='/item/:id' children={<Item history={this.props.history} userInfo={this.state.userInfo} get_data={this.props.get_data} />} />
                        <Route path='/post/success' children={<PostSuccess history={this.props.history} userInfo={this.state.userInfo} />} />
                        <Route path='/post' children={<Post history={this.props.history} userInfo={this.state.userInfo} />} />
                        <Route path='/chat' children={<Chat history={this.props.history} userInfo={this.state.userInfo} />} />
                        {/* if the path does'nt match any of the available routes, show error */}
                        <Route path={['/', '/', '/item']} component={Error404} />
                    </Switch>

                    {/* <Footer /> */}
                    <Route path='/' children={<Footer history={this.props.history} search={this.search} />} />
                </Router>
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