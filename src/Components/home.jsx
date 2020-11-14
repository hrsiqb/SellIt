import React, { Component } from 'react';
import { ItemCardSkeleton } from './skeleton'
import { ItemCard } from './itemCards';
import { NoDataFound, NoAds } from './error';
import Button from '@material-ui/core/Button';
import '../App.css';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            addsToAppend: 8,
            numberOfAdds: 0,
            firstRun: true,
            appendedData: Array.from(new Array(8)),
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
        let data = []
        let hidden = false
        let heading = <h1 hidden={hidden} className="ml-5 mt-3 mb-2">Fresh Recommendations</h1>
        let search = this.props.history.location.search
        if (search) {
            search = search.substring(1)
            if (search.includes('%20')) search = search.replaceAll('%20', ' ')
            hidden = true
            heading = <NoDataFound />
            if (this.props.loading) {
                heading = <h1 className="ml-5 mt-3 mb-2">Search Results for "{search}"</h1>
                data = Array.from(new Array(8), () => <ItemCardSkeleton />)
            }
            else {
                data = this.state.fetchedData.map((data, index) => {
                    if (data.title.includes(search)) {
                        heading = <h1 className="ml-5 mt-3 mb-2">Search Results for "{search}"</h1>
                        return <ItemCard data={data} key={index} />
                    }
                })
            }
        }
        else {
            switch (Object.keys(this.props.search)[0]) {
                case 'city':
                    if (this.props.search.city === 'All Pakistan')
                        data = this.state.appendedData.map((data, index) => data ? <ItemCard data={data} key={index} /> : (<ItemCardSkeleton />))
                    else {
                        hidden = true
                        heading = <NoAds city={this.props.search.city} />
                        data = this.state.fetchedData.map((data, index) => {
                            if (data.location === this.props.search.city) {
                                heading = <h1 className="ml-5 mt-3 mb-2">Ads in {this.props.search.city}</h1>
                                return <ItemCard data={data} key={index} />
                            }
                        })
                    }
                    break
                case 'category':
                    if (this.props.search.category === 'All Ads')
                        data = this.state.appendedData.map((data, index) => data ? <ItemCard data={data} key={index} /> : (<ItemCardSkeleton />))
                    else {
                        heading = <NoAds city={this.props.search.category} />
                        data = this.state.fetchedData.map((data, index) => {
                            if (data.category === this.props.search.category) {
                                heading = <h1 className="ml-5 mt-3 mb-2">{this.props.search.category}</h1>
                                return <ItemCard data={data} key={index} />
                            }
                        })
                        hidden = true
                    }
                    break
                default:
                    break
            }
        }
        return (
            <div className="root">
                <div className="img"></div>
                {heading}
                <div className="d-fc ai-c vw-m-100 mt-4 mb-4">
                    <div className="w-m-1265px ta-c">{data}</div>
                    <Button className="btn b-2bl f-16 mt-3 ol-n bs-n" id="showMoreBtn" variant="outlined"
                        color="primary" hidden={hidden} onClick={this.loadMore}><b>Load More</b></Button>
                </div>
            </div>
        )
    }
}
export default Home;
