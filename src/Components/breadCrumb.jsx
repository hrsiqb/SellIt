import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';


class BreadCrumb extends Component {
    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="n-l" to="/SellIt">Home</Link>
                <Link className="n-l" to="/SellIt">{this.props.type}</Link>
            </Breadcrumbs>
        )
    }
}
export default BreadCrumb