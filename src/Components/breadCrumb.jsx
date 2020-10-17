import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
    console.info(event);
    event.preventDefault();
}

class BreadCrumb extends Component {
    render(){
        return (
            <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
                Home
            </Link>
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                Cars
            </Link>
            </Breadcrumbs>
        )
    }
}
export default BreadCrumb