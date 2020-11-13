import React, { Component } from 'react';
import { Nav } from 'react-bootstrap'
import { AboutDialog } from './dialog'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsEnvelope } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CgWebsite } from 'react-icons/cg';
import { FiPhone } from 'react-icons/fi';
import { RiFacebookCircleLine, RiYoutubeLine, RiInstagramLine, RiTwitterLine } from 'react-icons/ri';

class Footer extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }
    handleCategory = e => this.props.search('category', e.target.innerText)
    handleDialog = () => this.setState({ open: true })
    closeDialog = () => this.setState({ open: false })
    render() {
        return (
            (!(this.props.history.location.pathname.includes('post'))
                && !(this.props.history.location.pathname.includes('chat')))
            &&
            <div>
                <AboutDialog open={this.state.open} onClose={this.closeDialog} />
                <div className="col-md-12 pl-5 pr-5 pt-2 pb-3" style={{ backgroundColor: "rgb(0, 44, 102)" }}>
                    <div className="row">
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Top Categories</b></h6>
                            <p className="footerLink" onClick={this.handleCategory}>Mobiles</p>
                            <p className="footerLink" onClick={this.handleCategory}>Property</p>
                            <p className="footerLink" onClick={this.handleCategory}>Bikes</p>
                            <p className="footerLink" onClick={this.handleCategory}>Jobs</p>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Trending Searches</b></h6>
                            <p className="footerLink" onClick={this.handleCategory}>Bikes</p>
                            <p className="footerLink" onClick={this.handleCategory}>Vehicles</p>
                            <p className="footerLink" onClick={this.handleCategory}>Jobs</p>
                            <p className="footerLink" onClick={this.handleCategory}>Mobiles</p>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>About Us</b></h6>
                            <p className="footerLink" onClick={this.handleDialog}>About SellIt</p>
                        </div>
                        <div className="col-md-3 text-light mt-2">
                            <h6 className="display-6 text-light"><b>Contact Details</b></h6>
                            <p className="footerLink"><HiOutlineLocationMarker /> Islamabad, Pakistan</p>
                            <p className="footerLink"><BsEnvelope /> SellIt@gmail.com</p>
                            <p className="footerLink"><CgWebsite /> SellIt</p>
                            <p className="footerLink"><FiPhone /> 03123456789</p>
                        </div>
                    </div>
                </div>
                <div className="socialFooter">
                    <h3 className="socialHeading">Follow Us</h3>
                    <div className="socialBody">
                        <Nav.Link href="https://facebook.com" className="d-ib"><RiFacebookCircleLine color="blue" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://youtube.com" className="d-ib"><RiYoutubeLine color="red" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://instagram.com" className="d-ib"><RiInstagramLine color="#dd3170" className="socialIcon" /></Nav.Link>
                        <Nav.Link href="https://twitter.com" className="d-ib"><RiTwitterLine color="rgb(29 161 242)" className="socialIcon" /></Nav.Link>
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    &copy;2020 Copyright, SellIt
                </div>
            </div>
        )
    }
}
export default Footer;
