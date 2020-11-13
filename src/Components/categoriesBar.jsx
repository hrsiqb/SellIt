import React, { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { categories } from '../data';

class Header extends Component {
    handleCategory = e => this.props.search('category', e.target.innerText)
    render() {
        const categoryList = Object.keys(categories).map((data, key) =>
            <NavDropdown.Item><p key={key} className="m-1" onClick={this.handleCategory}>{data}</p></NavDropdown.Item>)
        return (
            (!(this.props.history.location.pathname.includes('post'))
                && !(this.props.history.location.pathname.includes('chat')))
            &&
            <Navbar className="b-b-2gry p-0" expand="lg">
                <NavDropdown className="dropdownTitle" title="ALL CATEGORIES" id="basic-nav-dropdown">
                    {categoryList}
                </NavDropdown>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>All Ads</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Mobiles</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Vehicles</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Property</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Bikes</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Jobs</p>
                <p className="pt-2 pb-2 pr-3 pl-3 h-p m-0" onClick={this.handleCategory}>Animals</p>
            </Navbar>
        )
    }
}
export default Header;
