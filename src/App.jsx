import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'
import Item from './Components/item';
import { Error404 } from './Components/error';
import Home from './Components/home';
import Post from './Components/post';
import PostSuccess from './Components/postSuccess';
import {
    Route, Switch,
    HashRouter as Router, // if deploying on sub-directory uncomment this line
    // BrowserRouter as Router, // if deploying on root directory uncomment this line
    withRouter
} from "react-router-dom"
import { connect } from "react-redux";
import { set_data, get_data } from './store/action'

class App extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className="root">
                <Router>
                    {/* <Header /> */}
                    <Route path='/' component={Header} />
                    <Route path='/' component={CategoriesBar} />
                    {/* <CategoriesBar /> */}
                    <Switch>
                        <Route exact path={['/', '/home']} children={<Home get_data={this.props.get_data} />} />
                        <Route path='/item/:id' children={<Item get_data={this.props.get_data} />} />
                        <Route path='/post/success' component={PostSuccess} />
                        <Route path='/post' component={withRouter(Post)} />
                        {/* if the path does'nt match any of the available routes, show error */}
                        <Route path={['/', '/', '/item']} component={Error404} />
                    </Switch>

                    <Route path='/' component={Footer} />
                    {/* <Footer /> */}
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