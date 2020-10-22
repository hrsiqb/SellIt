import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { Route, Link, Switch, BrowserRouter as Router, useParams, withRouter } from "react-router-dom"
import BreadCrumb from './breadCrumb';
import Carousel from 'react-bootstrap/Carousel'
import { FiPhone } from 'react-icons/fi';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import noUser from '../noUser'

class ItemCard extends Component {
    render() {
        const { price, title, location, createdAt, iId, src } = this.props.data
        var formatPrice = Number(price).toLocaleString('en');
        let image = []
        if (src)
            image = src.map((data) => <Carousel.Item><img className="itemCard-img" src={data} alt="image" /></Carousel.Item>)
        else image = <Skeleton variant="rect" width={300} height={200} />
        return (
            <Link to={`/SellIt/item/${iId}`}>
                <Card className="itemCard-card mt-1 mb-1 mr-2 ml-2" variant="outlined">
                    <CardActionArea className="ol-n">
                        <CardMedia className="itemCard-media">
                            <Carousel>{image}</Carousel>
                        </CardMedia>
                        <CardContent className="itemCard-content">
                            <p className="f-20 f-b mb-0">{`Rs ${formatPrice}`}</p>
                            <p className="f-14 f-b5 mb-0 f-cg t-of-el">{title}</p>
                            <div className="itemCard-location-date">
                                <span className="f-10 f-b5 f-uc f-cg mb-0">{location}</span>
                                <span className="f-10 f-b5 f-uc f-cg mb-0">{createdAt}</span>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        )
    }
}
class ItemMediaCard extends Component {
    handleChange = (e) => {
        let siblings = e.target.parentNode.childNodes
        let targetCarousel = document.getElementById(`carousel_${e.target.value}`)
        let carouselInner = document.getElementById("carousel_0").parentNode.childNodes
        let carouselIndicators = document.getElementById("carousel_0").parentNode.previousSibling.childNodes
        for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove('bs-2blk')
        e.target.classList.add('bs-2blk')
        for (var i = 0; i < carouselInner.length; i++) { carouselInner[i].classList.remove('active') }
        targetCarousel.classList.add('active')
        console.log(carouselIndicators.length)
        for (var i = 0; i < carouselIndicators.length; i++) { carouselIndicators[i].classList.remove('active') }
        carouselIndicators[e.target.value].classList.add('active')
    }
    render() {
        const src = this.props.itemMedia
        let image = []
        let imageBtn = []
        if (src) {
            image = src.map((data, key) => <Carousel.Item id={`carousel_${key}`} className="bc-blk"><img className="d-b-m-a" src={data} alt="image" height="482px" /></Carousel.Item>)
            imageBtn = src.map((data, key) => (
                key ? <Button className="imageBtn ol-n mr-3 ml-3" value={key} onClick={this.handleChange} style={{ backgroundImage: `url(${data})` }}></Button>
                    : <Button className="imageBtn ol-n bs-2blk mr-3 ml-3" value={key} onClick={this.handleChange} style={{ backgroundImage: `url(${data})` }}></Button>
            ))
        }
        else {
            image = <Skeleton variant="rect" width={300} height={200} />
            imageBtn = Array.from(new Array(4), x => <Skeleton className="mr-3 ml-3" variant="rect" width={65} height={65} />)
        }
        return (
            <div>
                <Card className="itemMedia-card m-0" variant="outlined" >
                    <CardMedia className="itemMedia-media">
                        <Carousel>{image}</Carousel>
                    </CardMedia>
                    <CardContent className="itemMedia-content mt-3 mb-3">{imageBtn}</CardContent>
                </Card>
            </div>
        )
    }
}

class ItemDescCard extends Component {
    render() {
        const { description, condition, type } = this.props.itemDesc
        return (

            <Card className="itemDesc-card m-0" variant="outlined" >
                <CardContent className="itemDesc-content mt-1 mb-1 mr-2 ml-2">
                    {this.props.itemDesc ? <h5 className="f-b">Details</h5>
                        : <Skeleton className="mb-2" width="15%" height="40px" />}

                    <section className="d-f mt-3">
                        {condition ?
                            <React.Fragment>
                                <p className="mr-14 mb-0 text-secondary">Condition</p>
                                <p className="mr-14 mb-0">{condition}</p>
                                <p className="mr-14 mb-0 text-secondary">Type</p>
                                <p className="mb-0">{type}</p>
                            </React.Fragment> :
                            <React.Fragment>
                                <Skeleton width="15%" className="mr-14 mb-0" />
                                <Skeleton width="10%" className="mr-14 mb-0" />
                                <Skeleton width="10%" className="mr-14 mb-0" />
                                <Skeleton width="13%" className="mb-0" />
                            </React.Fragment>}

                    </section>
                    <hr />
                    {this.props.itemDesc ?
                        <React.Fragment>
                            <h5 className="f-b">Description</h5>
                            <p>{description}</p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Skeleton className="mb-2" width="25%" height="40px" />
                            <Skeleton />
                            <Skeleton width="80%" />
                            <Skeleton width="40%" />
                            <Skeleton width="90%" />
                            <Skeleton width="20%" />
                        </React.Fragment>}
                </CardContent>
            </Card>
        )
    }
}
class ItemDetailCard extends Component {
    render() {
        const { price, title, createdAt, location } = this.props.itemDetail
        var formatPrice = Number(price).toLocaleString('en');
        return (
            <Card className="itemDetail-card m-0 p-0" variant="outlined" >
                <CardContent className="p-3">
                    {this.props.itemDetail ?
                        <React.Fragment>
                            <h2 className="mb-2" className="f-b">{`Rs ${formatPrice}`}</h2>
                            <p className="text-secondary h-5 f-16 f-b6">{title}</p>
                        </React.Fragment> :
                        <React.Fragment>
                            <Skeleton className="mb-2" width="40%" height="50px" />
                            <Skeleton width="90%" height="30px" />
                        </React.Fragment>}

                    <section className="d-f-sb mt-4">
                        {this.props.itemDetail ?
                            <React.Fragment>
                                <p className="f-12 f-cg f-b6 m-0">{location}</p>
                                <p className="f-12 f-cg f-b6 m-0">{createdAt}</p>
                            </React.Fragment> :
                            <React.Fragment>
                                <Skeleton width="30%" />
                                <Skeleton width="20%" />
                            </React.Fragment>}
                    </section>
                </CardContent>
            </Card>
        )
    }
}

class ItemSellerCard extends Component {
    render() {
        const { photoUrl, name, memberSince, phone } = this.props.itemSeller
        let userImage = ''
        photoUrl ? userImage = photoUrl : userImage = noUser.userSecondary
        return (
            <Card className="itemSeller-card m-0" variant="outlined" >
                <CardContent>
                    {this.props.itemSeller ? 
                    <p className="mb-2 f-23 f-b5">Seller description</p>
                    :
                    <Skeleton className="mb-2" width="40%" height="40px" />}
                    <section className="d-fr ai-c">
                        {this.props.itemSeller ? 
                        <Avatar className="sellerAvatar" alt="userAvatar" src={userImage} />
                        :
                        <Skeleton variant="circle" width="60px" height="60px" />}
                        <section className="ml-2">
                            {this.props.itemSeller ? 
                            <React.Fragment>
                                <p className="f-16 f-b7 m-0">{name}</p>
                                <p className="text-secondary f-12 f-b6 m-0">{`Member since ${memberSince}`}</p>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Skeleton width="110px" height="25px" />
                                <Skeleton width="130px" height="20px" />
                            </React.Fragment>}
                        </section>
                    </section>
                        {this.props.itemSeller ? 
                        <Button className="bc-blk fc-w f-b mb-2 mt-3 pt-2 pb-2 w-100" variant="contained">Chat With Seller</Button>
                        :
                        <Skeleton className="mb-2" width="100%" height="70px" />}
                    <section className="d-fr jc-c">
                        {this.props.itemSeller ? 
                        <React.Fragment>
                            <p className="mt-3 mb-3">
                                <FiPhone className="mr-2" />{phone}
                            </p>
                        </React.Fragment> : 
                        <Skeleton width="40%" />}
                    </section>
                </CardContent>
            </Card>
        )
    }
}
export {
    ItemCard,
    ItemMediaCard,
    ItemDescCard,
    ItemDetailCard,
    ItemSellerCard,
};
