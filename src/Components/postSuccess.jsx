import { FcApproval } from 'react-icons/fc';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import history from '../history';
import React, { Component } from 'react'

export default class Postsuccess extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className="w-100 w-m-400px m-a mt-5 mb-5 ta-c">
                <FcApproval className="f-84 mb-3" />
                <h4 className="mb-2">Congraulations!</h4>
                <h6 className="f-b">Ad Posted Successfully</h6>
                <Button className="bc-blk mb-3 mt-3 w-100 f-cap" variant="contained">
                    <Link to={`/SellIt/item/${history.location.state}`} className="fc-w f-b f-16 n-l">
                        Preview Ad</Link></Button>
            </div>
        )
    }
}
