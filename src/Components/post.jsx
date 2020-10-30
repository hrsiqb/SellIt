import React, { Component } from 'react';
import { ItemCardSkeleton } from './skeleton'
import { ItemCard } from './itemCards';
import dataObj from '../dummyData/dummyPacket';
import Button from '@material-ui/core/Button';
import { storage, firebase, insertAddData } from '../config/firebase'
// import firebase from 'firebase/app'
// import 'firebase/storage'

export default class Post extends Component {
    constructor() {
        super()
        this.state = {
            image: '',
        }
    }
    handleChange = (e) => {
        this.state.image = e.target.files[0]
    }
    upload = () => {
        // firebase.storage().ref().child('images/image.jpg').put(this.state.image)
        //     .then((snapshot) => {
        //         snapshot.ref.getDownloadURL()
        //             .then((url) => {
        //                 console.log(url)
        //             })
        //     })
    }
    render() {
        return (
            <div className="root">
                <h1 className="flexCenter">POST</h1>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.upload}>upload</button>
            </div>
        )
    }
}