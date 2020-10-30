import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { FiPhone } from 'react-icons/fi';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import noUser from '../noUser'

class ProfileCard extends Component {
    render() {
        // displayName: "Haris Iqbal"
        // email: "hrsiqb@gmail.com"
        // isLoggedIn: true
        // loading: false
        // openLoginDialog: false
        // openRegisterDialog: false
        // photoURL: "https://lh3.googleusercontent.com/a-/AOh14GjL_ZDSlL5ban1tj0DvCau1XYa9d2K0UFplWkVN=s96-c"
        // uId: "2edeHZ97NRfoOvt0FyOGTSKpZVY2"

        const { photoURL, displayName, email } = this.props.data
        return (
            // <Card className="m-0" variant="" >
            //     <CardContent>
                    <section className="d-fr ai-c">
                        <Avatar className="sellerAvatar" alt="userAvatar" src={photoURL} />
                        <section className="ml-3">
                            <p className="f-22 f-b7 m-0">{displayName}</p>
                            <p className="text-secondary f-12 f-b6 m-0">{email}</p>
                        </section>
                    </section>
            //         {/* <hr /> */}
            //         {/* <Button className="bc-blk fc-w f-b mb-2 mt-3 pt-2 pb-2" variant="contained">Chat With Seller</Button>
            //         <section className="d-fr jc-c">
            //             <React.Fragment>
            //                 <p className="mt-3 mb-3">
            //                     <FiPhone className="mr-2" />03121231231
            //                 </p>
            //             </React.Fragment>
            //         </section> */}
            //     {/* </CardContent>
            // </Card> */}
        )
    }
}
export default ProfileCard