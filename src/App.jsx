import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'
import { ViewItem } from './Components/item';
import Error404 from './Components/error';
import HomePage from './Components/homePage';
import Post from './Components/post';
import { Route, Link, Switch, BrowserRouter as Router, withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { set_data } from './store/action'

class App extends Component {
    render() {
        console.log(this.props.name)
        return (
            <div className="root">
                <Router>
                    <Header />
                    <CategoriesBar />

                    <Switch>
                        <Route exact path={['/SellIt', '/SellIt/home']} component={HomePage} />
                        <Route path="/SellIt/item/:id" component={withRouter(ViewItem)} />
                        <Route exact path='/SellIt/item' component={Error404} />
                        <Route path='/SellIt/post' component={Post} />
                        {/* if the path does'nt match any of the available routes, show error */}
                        <Route path={'/SellIt/'} component={Error404} />
                    </Switch>
                    <button onClick={() => this.props.set_data("set data")}>set Data</button>
                    <Footer />
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({//used for properties
    name: state.name
})

const mapDispatchToProp = (dispatch) => ({//used for functions
    set_data: (data) => dispatch(set_data(data))
})

export default connect(mapStateToProps, mapDispatchToProp)(App);
