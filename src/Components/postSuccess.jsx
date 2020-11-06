import { FcApproval } from 'react-icons/fc';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { Error404 } from './error';

export default class Postsuccess extends Component {
    render() {
        return (
            this.props.history.location.state ?
                <div className="w-100 w-m-400px m-a mt-5 mb-5 ta-c">
                    <FcApproval className="f-84 mb-3" />
                    <h4 className="mb-2">Congraulations!</h4>
                    <h6 className="f-b">Ad Posted Successfully</h6>
                    <Button onClick={() => this.props.history.push(`/item/${this.props.history.location.state}`)}
                        className="bc-blk mb-3 mt-3 w-100 f-cap fc-w f-b f-16" variant="contained">
                        Preview Ad
                    </Button>
                </div>
                : <Error404 />
        )
    }
}
