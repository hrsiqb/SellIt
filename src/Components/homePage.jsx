import React, { Component } from 'react';
import ItemCardSkeleton from './skeleton'
import { ItemCard } from './item';
import dataObj from '../dummyData/dummyPacket';
import Button from '@material-ui/core/Button';
import { storage, insertAddData, getAllAdds } from '../config/firebase'
import firebase from 'firebase/app'
import '../App.css';

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            addsToAppend: 20,
            numberOfAdds: 0,
            firstRun: true,
            appendedData: Array.from(new Array(20)),
            fetchedData: []
        }
    }
    componentDidMount() {
        const { firstRun, addsToAppend } = this.state
        var promise = new Promise((resolve) => getAllAdds(firstRun, addsToAppend, resolve))
        promise.then((returnedData) => {
            this.state.numberOfAdds = returnedData[0]
            this.state.firstRun = returnedData[1]
            this.state.appendedData = returnedData[2]
            this.state.fetchedData = returnedData[3]
            this.setState(this.state)
        })
    }
    loadMore = () => {
        let numberOfAppendedAdds = this.state.appendedData.length
        if (this.state.numberOfAdds > numberOfAppendedAdds) {
            let optimizedData = []
            if (this.state.numberOfAdds > 4)
                optimizedData = this.state.fetchedData.slice(numberOfAppendedAdds, numberOfAppendedAdds + this.state.addsToAppend)
            else optimizedData = this.state.fetchedData
            optimizedData.map((data, index) => {
                // data.id = `card-${this.state.cardId++}`
                this.state.appendedData.push(data)
            })
            this.setState({
                appendedData: this.state.appendedData
            })
            numberOfAppendedAdds = this.state.appendedData.length
        }
        document.getElementById("showMoreBtn").hidden = true
        if (!(this.state.numberOfAdds === numberOfAppendedAdds))
            document.getElementById("showMoreBtn").hidden = false
    }
    render() {
        let mainDiv = {
            display: 'flex',
            maxWidth: '100vw',
            flexDirection: 'column',
            alignItems: 'center'
        }
        let itemsDiv = {
            width: '1265px'
        }
        let data = this.state.appendedData.map((data, index) => data ? <ItemCard data={data} key={index} /> : (<ItemCardSkeleton />))
        return (
            <div className="root">
                <div className="img"></div>
                <div style={mainDiv} className="mt-4 mb-4">
                    <div style={itemsDiv}>{data}</div>
                    <Button className="btn b-2bl f-16 mt-3 ol-n bs-n" id="showMoreBtn" variant="outlined"
                        color="primary" onClick={this.loadMore}><b>Load More</b></Button>
                </div>
            </div>
        )
    }
}
export default HomePage;
