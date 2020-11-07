import React, { Component, Fragment } from 'react';
import { NoDataFound } from './error';
import { withRouter } from "react-router-dom"
import BreadCrumb from './breadCrumb';
import { SendMessageDialog } from './dialog'
import { insertMessage, addFriend } from '../config/firebase'
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
        }
    }
    sendMessage = (newMessage) => {
        let activeChat = this.generateChatId(this.state.itemSeller.uId)
        new Promise((res, rej) => insertMessage({ uId: this.props.userInfo.uId }, { activeChat, newMessage }, res, rej))
            .then(result => {
                addFriend({ uId: this.props.userInfo.uId, fId: this.state.itemSeller.uId })
                this.state.openChatDialog = false
                this.setState(this.state)
                this.props.history.push({ pathname: '/chat', search: this.state.itemSeller.uId })
            })
            .catch((error => {
                this.state.openChatDialog = false
                this.setState(this.state)
                alert(error.message)
            }))
    }
    handleChatDialog = () => this.openChatDialog()
    openChatDialog = () => this.setState({ ...this.state, openChatDialog: true })

    closeDialog(callCheck = false) {
        this.state.openChatDialog = false
        this.setState(this.state)
    }
    generateChatId = (id) => {
        if (id < this.props.userInfo.uId) return `${id}_${this.props.userInfo.uId}`
        else return `${this.props.userInfo.uId}_${id}`
    }
    componentDidMount() {
        let iId = this.props.match.params.id
        let promise = new Promise((res, rej) => this.props.get_data("GETADDDATA", res, rej, iId))
        promise.then(addData => {
            if (addData) {
                const itemMedia = addData.src
                const itemDesc = { description: addData.description, condition: addData.condition, type: addData.category }
                const itemDetail = { price: addData.price, title: addData.title, createdAt: addData.createdAt, location: addData.location }
                let promise = new Promise((res, rej) => this.props.get_data("GETUSERDATA", res, rej, addData.sellerId))
                promise.then(sellerData => {
                    let chatBtn = false
                    if (this.props.userInfo.isLoggedIn) {
                        if (sellerData.uId !== this.props.userInfo.uId) chatBtn = () => this.handleChatDialog()
                    }
                    const itemSeller = {
                        memberSince: sellerData.memberSince, name: sellerData.name, uId: sellerData.uId,
                        photoUrl: sellerData.imageFile, phone: sellerData.phone, chatBtn
                    }
                    this.setState({ itemMedia, itemDesc, itemDetail, itemSeller })
                })
            }
            else this.setState({ error: true })
        })
    }

    render() {
        return (
            <Fragment>
                <SendMessageDialog onClose={(check) => this.closeDialog(check)}
                    sendMessage={this.sendMessage} open={this.state.openChatDialog} />
                {!this.state.error ?
                    <div className="d-f jc-c mb-4 mt-5">
                        <div className="m-0">
                            {this.state.itemDesc && <BreadCrumb type={this.state.itemDesc.type} />}
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
                    : <NoDataFound />}
            </Fragment>
        )
    }
}
export default withRouter(Item)