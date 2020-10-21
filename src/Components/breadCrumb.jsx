import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';


class BreadCrumb extends Component {
    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/SellIt">
                    Home
            </Link>
                <Link color="inherit" to="/SellIt">
                    {this.props.type}
                </Link>
            </Breadcrumbs>
        )
    }
}
export default BreadCrumb