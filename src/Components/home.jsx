import React, { Component } from 'react';
import { ItemCardSkeleton } from './skeleton'
import { ItemCard } from './itemCards';
import dataObj from '../dummyData/dummyPacket';
import Button from '@material-ui/core/Button';
import { storage, insertAddData, getAllAdds } from '../config/firebase'
import firebase from 'firebase/app'
import '../App.css';

class Home extends Component {
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
        var promise = new Promise((resolve, reject) => this.props.get_data("GETADDS", resolve, reject))
        promise.then((returnedData) => this.setState(returnedData))
            .catch((returnedData) => this.setState(returnedData))
    }
    loadMore = () => {
        let numberOfAppendedAdds = this.state.appendedData.length
        if (this.state.numberOfAdds > numberOfAppendedAdds) {
            let optimizedData = []
            if (this.state.numberOfAdds > 4)
                optimizedData = this.state.fetchedData.slice(numberOfAppendedAdds, numberOfAppendedAdds + this.state.addsToAppend)
            else optimizedData = this.state.fetchedData
            optimizedData.map((data, index) => this.state.appendedData.push(data))
            this.setState({ appendedData: this.state.appendedData })
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
            maxWidth: '1265px'
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
export default Home;
