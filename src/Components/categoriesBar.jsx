import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { categories } from '../data';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        const categoryList = Object.keys(categories).map((data, key) =>
            <NavDropdown.Item><Link to="#" key={key} className="n-l">{data}</Link></NavDropdown.Item>)
        return (
            (!(this.props.history.location.pathname.includes('post'))
                && !(this.props.history.location.pathname.includes('chat')))
            &&
            <Navbar className="b-b-2gry p-0" expand="lg">
                <NavDropdown className="dropdownTitle" title="ALL CATEGORIES" id="basic-nav-dropdown">
                    {categoryList}
                </NavDropdown>
                <Nav.Link href="#home">Mobile Phones</Nav.Link>
                <Nav.Link href="#home">Cars</Nav.Link>
                <Nav.Link href="#home">Tablets</Nav.Link>
                <Nav.Link href="#home">TV-Video_Audio</Nav.Link>
                <Nav.Link href="#home">Houses</Nav.Link>
                <Nav.Link href="#home">Lands & Plots</Nav.Link>
            </Navbar>
        )
    }
}
export default Header;
