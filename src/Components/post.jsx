import React, { Component, Fragment, createElement } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { categories, cities } from '../data'
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { RiImageAddFill } from 'react-icons/ri';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { noUser } from '../data'
import { getLoginDetails, getUserData } from '../config/firebase'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import firebase from 'firebase/app'
// import 'firebase/storage'

export default class Post extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: {},
            adData: {},
            storage: {},
            render: {}
        }
    }
    componentWillMount() {
        this.state.render.loading = true
        this.checkLoginStatus()
    }
    handleChange = (action) => (e) => {
        // Category
        switch (action) {
            case 'category':
                for (var i = 0; i < e.currentTarget.parentNode.childNodes.length; i++) {
                    e.currentTarget.parentNode.childNodes[i].classList.remove('postActive')
                }
                e.currentTarget.classList.add('postActive')
                this.state.adData.category = e.currentTarget.childNodes[1].innerText
                break
            case 'condition':
                if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.classList.remove('postActive', 'bs-1blk')
                else e.currentTarget.previousSibling.classList.remove('postActive', 'bs-1blk')
                e.currentTarget.classList.add('postActive', 'bs-1blk')
                this.state.adData.condition = e.currentTarget.value
                break
            case 'title':
                this.state.adData.title = e.target.value
                break
            case 'description':
                this.state.adData.description = e.target.value
                break
            case 'price':
                this.state.adData.price = e.target.value
                break
            case 'image':
                if (this.state.adData.image) {
                    if (this.state.adData.image.length >= 4) console.log('done')
                    this.state.adData.image.push(e.target.files[0])
                    new Promise((res) => this.readURL(e.target, res))
                        .then((data) => {
                            this.state.storage.imageUrl.push(data)
                            this.setState(this.state)
                        })
                }
                else {
                    this.state.adData.image = Array.from(new Array(1), () => e.target.files[0])
                    new Promise((res) => this.readURL(e.target, res))
                        .then((data) => {
                            this.state.storage.imageUrl = Array.from(new Array(1), () => data)
                            this.setState(this.state)
                        })
                }
                break
            case 'city':
                console.log(e.target.value)
                break
        }
        this.setState(this.state)
        console.log(this.state)
    }
    readURL = (input, res) => {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                res(e.target.result)
            };

            reader.readAsDataURL(input.files[0]);
        }
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
    checkLoginStatus = () => {
        new Promise((res, rej) => getLoginDetails(res, rej))
            .then((data) => {
                if (!data.photoURL) data.photoURL = noUser
                this.setState({ userInfo: data })
                console.log(this.state.userInfo)
                if (data.phone) this.state.render.loading = false
                else {
                    new Promise((res, rej) => getUserData(res, rej, data.uId))
                        .then((data) => {
                            this.setState({ userInfo: { phone: data.phone }, render: { loading: false } })
                        })
                        .catch((error) => {
                            this.setState({ userInfo: { isLoggedIn: false }, render: { loading: false } })
                        })
                }
                console.log(data)
            })
            .catch((error) => {
                this.setState({ userInfo: { isLoggedIn: false }, render: { loading: false } })
            })
    }
    render() {
        var inputDisable = false
        if (this.state.adData.image) { if (this.state.adData.image.length >= 4) inputDisable = true }
        var categoriesTab = []
        for (var property in categories) {
            categoriesTab.push(
                <div onClick={this.handleChange('category')} value={property} className="b-t-1slv p-2 d-fr ai-c w-100 m-0 h-bc-gry h-p f-gry">
                    {createElement(categories[property], { className: "f-23 text-secondary h-c-blk h-cs-gry" })}
                    <p className="m-0 ml-3 f-16 text-secondary h-c-blk">{property}</p>
                </div>
            )
        }
        var images = []
        var numImages = 0
        if (this.state.storage.imageUrl) {
            this.state.storage.imageUrl.map((data) => images.push(<img className="h-100px w-100px mr-2" src={data} />))
            numImages = this.state.storage.imageUrl.length
        }
        if (numImages < 4) {
            images.push(
                <div className="h-100px w-100px b-1blk ta-c mr-2">
                    <div className="mt-15per">
                        <RiImageAddFill className="f-45" />
                        <p className="m-0 f-12 f-b7">Add Photo</p>
                    </div>
                </div>
            )
            images.push(Array.from(new Array(4 - numImages - 1), () =>
                <div className="h-100px w-100px b-1gry ta-c mr-2">
                    <div className="mt-25per">
                        <RiImageAddFill className="f-45 fc-g" />
                    </div>
                </div>
            )
            )
        }
        return (
            <div className="d-fc jc-c">
                <Backdrop className='fc-w zInd-12' open={this.state.render.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <p className="ta-c f-22 mt-2 f-b7">POST YOUR AD</p>
                <div className="w-m-800px m-a w-100 mb-3 b-1slv">
                    {/* categories */}
                    <div className="b-b-1slv pb-3">
                        <p className="f-20 f-b7 p-3 mb-0">CHOOSE A CATEGORY</p>
                        <div className="b-1slv b-t-n bl-n w-100 w-m-400px">{categoriesTab}</div>
                    </div>
                    {/* Details */}
                    <div className="b-b-1slv p-3 pl-4 pb-4">
                        <p className="f-20 f-b7 mb-2">INCLUDE SOME DETAILS</p>
                        <p className="m-0">Condition *</p>
                        <ButtonGroup aria-label="large outlined primary button group">
                            <Button className="ol-n bs-n" value="New" onClick={this.handleChange('condition')}>New</Button>
                            <Button className="ol-n bs-n" value="Used" onClick={this.handleChange('condition')}>Used</Button>
                        </ButtonGroup>
                        <br />
                        <p className="m-0 mt-4">Ad Title *</p>
                        <TextField onChange={this.handleChange('title')} size="small" className="w-100 w-m-400px" id="outlined-basic" variant="outlined" />
                        <p className="m-0 mt-4">Description *</p>
                        <TextField onChange={this.handleChange('description')} multiline rows={4} size="small" className="w-100 w-m-400px" id="outlined-basic" variant="outlined" />
                    </div>
                    {/* Price */}
                    <div className="b-b-1slv p-3 pl-4 pb-4">
                        <p className="f-20 f-b7 mb-3">SET A PRICE</p>
                        <p className="m-0">Price *</p>
                        <OutlinedInput className="w-100 w-m-400px h-40" type="number"
                            onChange={this.handleChange('price')}
                            startAdornment={<InputAdornment position="start">Rs
                            <span className="h-30 b-r-1slv w-10px"></span></InputAdornment>}
                        />
                    </div>
                    {/* Picture */}
                    <div className="b-b-1slv p-3 pl-4 pb-4">
                        <p className="f-20 f-b7 mb-3">UPLOAD UPTO 4 PHOTOS</p>
                        <input disabled={inputDisable} accept="image/*" onChange={this.handleChange('image')} className='d-n' id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file" className="d-fr h-p">{images}</label>
                    </div>
                    {/* Location */}
                    <div className="b-b-1slv p-3 pl-4 pb-4">
                        <p className="f-20 f-b7 mb-3">CONFIRM YOUR LOCATION</p>
                        <p className="m-0">City *</p>
                        <FormControl variant="outlined" className="w-100 w-m-400px">
                            <Select
                                className="h-40"
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                value={this.state.adData.city}
                                onChange={this.handleChange('city')}
                            >
                                {cities.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select></FormControl>
                    </div>
                    {/* Phone number, if not provided */}
                    {console.log('pphone.', this.state.userInfo.phone)}
                    {!(this.state.userInfo.phone) &&
                        <div className="b-b-1slv p-3 pl-4 pb-4">
                            <p className="f-20 f-b7 mb-3">ENTER YOUR PHONE NUMBER</p>
                            <p className="m-0">Phone *</p>
                            <OutlinedInput className="w-100 w-m-400px h-40" type="number"
                                onChange={this.handleChange('phone')}
                                startAdornment={<InputAdornment position="start">Rs
                            <span className="h-30 b-r-1slv w-10px"></span></InputAdornment>}
                            />
                        </div>}
                </div>
            </div>
        )
    }
}