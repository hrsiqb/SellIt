import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Route, Link, Switch, BrowserRouter as Router, useParams, withRouter } from "react-router-dom"
import BreadCrumb from './breadCrumb';
import Carousel from 'react-bootstrap/Carousel'
import Skeleton from '@material-ui/lab/Skeleton';
import {
    ItemMediaSkeleton,
    ItemDescSkeleton,
    ItemDetailSkeleton,
    ItemSellerSkeleton,
} from './skeleton'
import {
    ItemMediaCard,
    ItemDescCard,
    ItemDetailCard,
    ItemSellerCard,
} from './itemCards'

class Item extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // data: Array.from(new Array(20))
        }
    }

    componentDidMount() {
        let iId = this.props.match.params.id
        let promise = new Promise((res, rej) => this.props.get_data("GETADDDATA", res, rej, iId))
        promise.then(addData => {
            const itemMedia = addData.src
            const itemDesc = { description: addData.description, condition: addData.condition }
            const itemDetail = { price: addData.price, title: addData.title, createdAt: addData.createdAt, location: addData.location }

            let iId = this.props.match.params.id
            let promise = new Promise((res, rej) => this.props.get_data("GETUSERDATA", res, rej, addData.sellerId))
            promise.then(sellerData => {
                console.log(sellerData)
                const itemSeller = { memberSince: sellerData.memberSince, name: sellerData.name, photoUrl: sellerData.photoUrl, phone: sellerData.phone }
                this.setState({ itemMedia, itemDesc, itemDetail, itemSeller })
            })
        })
    }

    render() {
        return (
            <div className="d-f jc-c mb-4 mt-5">
                <div className="m-0">
                    <BreadCrumb type={"Cars"} />
                    <br />
                    <div className="">
                        <section className="mr-3 d-il-b">
                            {this.state.itemMedia ? <ItemMediaCard itemMedia={this.state.itemMedia} /> : <ItemMediaSkeleton />}
                            {this.state.itemDesc ? <ItemDescCard itemDesc={this.state.itemDesc} /> : <ItemDescSkeleton />}
                        </section>
                        <section className="d-il-b va-t">
                            <section className="mb-2">
                                {this.state.itemDetail ? <ItemDetailCard itemDetail={this.state.itemDetail} /> : <ItemDetailSkeleton />}
                            </section>
                            <section>
                                {this.state.itemSeller ? <ItemSellerCard itemSeller={this.state.itemSeller} /> : <ItemSellerSkeleton />}
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Item)