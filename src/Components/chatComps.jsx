import React, { Component, Fragment } from 'react'

class ChatBubble extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            this.props.data.type === 'sent' ?
                <div className="d-fr jc-fe mt-2 mb-2 mr-0 ml-0">
                    <span className="sentMessage fl-r">
                        {this.props.data.message}
                    </span>
                    <div className="sentTail fl-r"></div>
                </div>
                :
                <div className="d-fr mt-2 mb-2 mr-0 ml-0">
                    <div className="receivedTail fl-l"></div>
                    <span className="receivedMessage fl-l">
                        {this.props.data.message}
                    </span>
                </div>
        )
    }
}

class MessagesPannel extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className="vw-70 h-100">
                <div className="vw-70 h-89p of-y-a of-x-h bu-ch"><div className="pr-4 pl-4 pt-3 pb-3">{this.props.messages}</div></div>
                <div className="d-f jc-sb ai-c vw-70 h-11p bc-gry1 p-0 pl-2 pr-2">
                    <input type="text" name="newMessage" className="brad-50px w-95 h-38 b-n bs-n ol-n m-0 ml-1 mr-1 p-3" onChange={this.props.onChange} placeholder="Type a message" />
                    <button className="ol-n bs-n b-n" onclick="sendMessage(this)"><img className="w-22px" src={require('../Images/send-fill.png')} /></button>
                </div>
            </div>
        )
    }
}
export { ChatBubble, MessagesPannel }