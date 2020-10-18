import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Route, Link, Switch, BrowserRouter as Router, useParams, withRouter} from "react-router-dom"
import BreadCrumb from './breadCrumb';

class ItemCard extends Component{
    render(){    
        const styles = {
            margin: "30px 10px",
            width: "300px",
            maxHeight: "100px"
        }
        const {price, title, location, createdAt, iId} = this.props.data
        const src = this.props.data.src[0]
        return (
            <Link to={`/SellIt/item/${iId}`}>
                <Card className="itemCard-card mt-1 mb-1 mr-2 ml-2" variant="outlined">
                    <CardActionArea className="ol-n">
                        <CardMedia className="itemCard-media">
                            <img className="itemCard-img" src={src} alt="image"/>
                        </CardMedia>
                        <CardContent className="itemCard-content">
                            <p className="f-20 f-b mb-0">{price}</p>
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
// class Item extends Component{
//     constructor(props){
//         super(props)
//     }
//     componentDidMount(){
//         console.log(`params==>${this.props.match.params.id}`)
//     }
//     render(){
//         return(
//             <div>
//                 <BreadCrumb />
//                 <Route path="/item/:id" component={withRouter(ViewItem)} />
                
//             </div>
//         )}
// }
class ViewItem extends Component {
    render() {
        let id = this.props.match.params.id
        return (
            <div>
                <BreadCrumb />
                <h3>ID: {id}</h3>
            </div>
        )
    }
}

// function ViewItem() {
//     // We can use the `useParams` hook here to access
//     // the dynamic pieces of the URL.
//     let { id } = useParams();
//     return (
//       <div>
//         <h3>ID: {id}</h3>
//       </div>
//     );
//   }
  

export {ItemCard, ViewItem};
