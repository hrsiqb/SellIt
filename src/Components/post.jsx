import React, { Component, Fragment, createElement } from 'react';
import { AiOutlineMobile } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import { FaDog } from 'react-icons/fa'
import { BiCar, BiBed } from 'react-icons/bi'
import { RiMotorbikeLine, RiTShirt2Line } from 'react-icons/ri'
import { IoMdBusiness } from 'react-icons/io'
import { GiTennisRacket } from 'react-icons/gi'
import { GrServices } from 'react-icons/gr'
import { MdBusinessCenter, MdChildFriendly } from 'react-icons/md'
import { categories } from '../data'
import { ThreeSixtySharp } from '@material-ui/icons';
// import firebase from 'firebase/app'
// import 'firebase/storage'

export default class Post extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    handleCategory = (e) => {
        for (var i = 0; i < e.currentTarget.parentNode.childNodes.length; i++) {
            e.currentTarget.parentNode.childNodes[i].classList.remove('active')
        }
        e.currentTarget.classList.add('active')
        this.setState({ addData: { category: e.currentTarget.childNodes[1].innerText } })
        console.log(this.state)
    }
    handleChange = (e) => {
        // this.state.image = e.target.files[0]
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
        var categoriesTab = []
        for (var property in categories) {
            categoriesTab.push(
                <div onClick={this.handleCategory} value={property} className="zInd-12 b-t-1slv p-2 d-fr ai-c w-100 m-0 h-bc-gry h-p f-gry">
                    {createElement(categories[property], { className: "f-23 text-secondary h-c-blk h-cs-gry" })}
                    <p className="m-0 ml-3 f-16 text-secondary h-c-blk">{property}</p>
                </div>
            )
        }
        return (
            <div className="d-fc jc-c">
                <p className="ta-c f-22 mt-2 f-b7">POST YOUR AD</p>
                <div className="w-m-800px m-a w-100 mb-3 b-1slv">
                    <div className="b-b-1slv pb-3">
                        <p className="f-20 f-b7 p-3 mb-0">CHOOSE A CATEGORY</p>
                        <div className="b-1slv b-t-n bl-n w-100 w-m-400px">{categoriesTab}</div>
                    </div>
                    <div className="b-b-1slv pb-3">
                        <p className="f-20 f-b7 p-3 mb-0">INCLUDE SOME DETAILS</p>
                        <div className="b-1slv b-t-n bl-n w-100 w-m-400px">{categoriesTab}</div>
                    </div>
                </div>

            </div>
            // AiOutlineMobile } from 'react-ico
            // BsHouseDoor } from 'react-icons/b
            // FiMonitor } from 'react-icons/fi'
            // FaDog } from 'react-icons/fa'
            // BiCar, BiBed } from 'react-icons/
            // RiMotorbikeLine, RiTShirt2Line } 
            // IoMdBusiness } from 'react-icons/
            // GiTennisRacket } from 'react-icon
            // GrServices} from 'react-icons/gr'
            // MdBusinessCenter, MdChildFriendly
            // categories } from '../data'
            // <div className="root">
            //     <h1 className="flexCenter">POST</h1>
            //     <input type="file" onChange={this.handleChange} />
            //     <button onClick={this.upload}>upload</button>
            // </div>
        )
    }
}