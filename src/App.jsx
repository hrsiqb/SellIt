import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import CategoriesBar from './Components/categoriesBar'
import Footer from './Components/footer'
import Item from './Components/item';
import Error404 from './Components/error';
import Home from './Components/home';
import Post from './Components/post';
import { Route, Link, Switch, BrowserRouter as Router, withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { set_data, get_data } from './store/action'

class App extends Component {
    componentDidMount(){
        // console.log(this.props.data)
    }
    render() {
        return (
            <div className="root">
                <Router>
                    <Header />
                    <CategoriesBar />
                    <Switch>
                        <Route exact path={['/SellIt', '/SellIt/home']} children={<Home get_data={this.props.get_data} />} />
                        {/* <Route path="/SellIt/item/:id" component={withRouter(Item)} /> */}
                    <Route path="/SellIt/item/:id" children={<Item get_data={this.props.get_data} />}>
                        {/* <Item get_data={this.props.get_data} /> */}
                    </Route>
                        <Route exact path='/SellIt/item' component={Error404} />
                        <Route path='/SellIt/post' component={Post} />
                        {/* if the path does'nt match any of the available routes, show error */}
                        <Route path={'/SellIt/', '/'} component={Error404} />
                    </Switch>
                    {/* <button onClick={() => this.props.set_data("set data")}>set Data</button> */}
                    <Footer />
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({//used for properties
    addsToAppend: state.addsToAppend,
    numberOfAdds: state.numberOfAdds,
    firstRun: state.firstRun,
    appendedData: state.appendedData,
    fetchedData: state.fetchedData,
})

const mapDispatchToProp = (dispatch) => ({//used for functions
    set_data: (data) => dispatch(set_data(data)),
    get_data: (type, resolve, reject, iId) => dispatch(get_data(type, resolve, reject, iId))
})

export default connect(mapStateToProps, mapDispatchToProp)(App);
