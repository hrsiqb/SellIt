import React, { Component } from 'react';
import { ItemCardSkeleton } from './skeleton'
import { ItemCard } from './itemCards';
import dataObj from '../dummyData/dummyPacket';
import Button from '@material-ui/core/Button';
import { storage, firebase, insertAddData } from '../config/firebase'

export default class Post extends Component {
    constructor() {
        super()
        this.state = {
            data: dataObj,
        }
    }
    handleChange = (e) => {
        console.log(e.target.files[0])
    }
    render() {
        return (
            <div className="root">
                <h1 className="flexCenter">POST</h1>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.upload1}>upload1</button>
            </div>
        )
    }
}