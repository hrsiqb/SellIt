import React, { Component } from 'react'
import User from './user'
import { UserSkeleton, MessagesSkeleton } from './skeleton'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { categories, cities, noUser, noAd } from '../data'
import { ChatBubble, MessagesPannel } from './chatComps'
import {
    getLoginDetails,
    getUserData,
    getMessages,
    insertAddData,
    insertUserPhone,
    uploadImage,
    generateFirebaseKey
} from '../config/firebase'

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userInfo: {},
            render: {},
            storage: {},
            users: [],
            messages: {}
        }
    }
    componentDidMount() {
        this.checkLoginStatus()
    }
    handleChange = e => this.state.storage.newMessage = e.target.value
    generateChatId = (id) => {
        if (id < this.state.userInfo.uId) return `${id}_${this.state.userInfo.uId}`
        else return `${this.state.userInfo.uId}_${id}`
    }
    handleUser = e => {
        var ul = e.currentTarget.parentNode.childNodes
        for (var i = 0; i < ul.length; i++) {
            if (ul[i].className.includes('bc-gry1'))
                ul[i].classList.remove('bc-gry1')
        }
        e.currentTarget.classList.add('bc-gry1')
        this.state.storage.activeUser = e.currentTarget.id
        this.setState(this.state)
    }
    getUsers = () => {
        if (this.state.userInfo.friends) {
            this.state.userInfo.friends.map(uId => {
                new Promise((res, rej) => getUserData(res, rej, uId))
                    .then(data => {
                        this.state.users.push(data)
                        if (this.state.users.length === this.state.userInfo.friends.length) {
                            this.setState(this.state)
                            if (!this.state.userInfo.chatIds) this.state.userInfo.chatIds = []
                            this.state.userInfo.friends.map(data => {
                                this.state.userInfo.chatIds.push(this.generateChatId(data))
                            })
                            getMessages(this.state.userInfo, (chatId, data) => {
                                if (!this.state.messages[chatId]) this.state.messages[chatId] = []
                                this.state.messages[chatId].push(data)
                                this.setState(this.state)
                            })
                        }
                    })
            })
        }
        else this.setState({ render: { ...this.state.render, noUsers: true } })
    }
    checkLoginStatus = () => {
        this.state.render.loading = true
        this.setState(this.state)
        new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                if (!data.photoURL) data.photoURL = noUser
                this.state.userInfo = data
                if (data.phone) {
                    this.state.render.loading = false
                    this.setState(this.state)
                    this.getUsers()
                }
                else {
                    new Promise((res, rej) => getUserData(res, rej, data.uId))
                        .then((data) => {
                            this.state.userInfo.phone = data.phone
                            this.state.userInfo.friends = data.friends
                            this.state.render.loading = false
                            this.setState(this.state)
                            this.getUsers()
                        })
                        .catch((error) => {
                            this.setState({ render: { ...this.state.render, loading: false, isLoggedIn: false } })
                        })
                }
            })
            .catch(() => this.props.history.push('/'))
    }
    render() {
        let users = []
        let messages = []
        if (!this.state.render.noUsers) {
            if (this.state.users.length) {
                users = this.state.users.map((data, index) =>
                    <User index={index} onClick={this.handleUser} data={data} />)
                if (this.state.storage.activeUser) {
                    if (!Object.keys(this.state.messages).length) messages = <MessagesSkeleton />
                    else {
                        let activeChat = this.generateChatId(this.state.storage.activeUser)
                        console.log(this.state.messages[activeChat])
                        this.state.messages[activeChat].map((data, index) => {
                            let message = {}
                            if (data.fromUid === this.state.userInfo.uId)
                                message = { message: data.message, type: 'sent' };
                            else message = { message: data.message, type: 'received' }
                            messages.push(<ChatBubble data={message} index={index} />)
                        })
                        messages = <MessagesPannel messages={messages} onChange={this.handleChange} />
                    }
                }
                else {
                    messages = (
                        <div className="b-l-1gry1 vw-70 h-100">
                            <div className="bc-gry1 d-f w-100 h-100 jc-c ai-c">
                                <h1 className="fc-gry ta-c">Welcome!<br /><br />Click on a user to start chatting with them</h1>
                            </div>
                        </div>)
                }
            }
            else {
                users.push(Array.from(new Array(7), () => <UserSkeleton />))
                messages = <MessagesSkeleton />
            }
            users = <ul className="p-0">{users}</ul>
        }
        return (
            !this.state.render.noUsers ?
                <div className="d-fr vh-88-9 w-100">
                    <Backdrop className='fc-w zInd-12' open={this.state.render.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {/* <!-- Users Panel --> */}
                    <div className="vw-30 h-100 of-a">
                        {users}
                    </div>
                    {/* <!-- Messages Panel --> */}
                    {messages}
                </div>
                :
                <div className="d-f ai-c jc-c vh-88-9 w-100">
                    no messages yet
                </div>
        )
    }
}
