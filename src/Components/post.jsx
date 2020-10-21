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

    render() {
        insertAddData(this.state.data)
        // let timeOut = setTimeout( ()=> {
        //     this.setState({
        //         data: "Document loaded successfully"
        //     })
        // }, 3000)

        let data = this.state.data.map((data) => data ? <ItemCard data={data} /> : <ItemCardSkeleton />)
        return (
            <div className="root">
                <h1 className="flexCenter">POST</h1>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.upload1}>upload1</button>
            </div>
        )
    }
}