import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';

export default class LoginDialog extends Component {
  render() {
    console.log(this.props.onClose)
    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <div style={{ maxWidth: "380px" }}>
          <List className="p-3">
            <h3 className="ta-c mb-2">Login</h3>
            {/* {emails.map((email) => (
                <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} />
                </ListItem>
              ))} */}
            <div className="form-group">
              <label><b>Email</b></label>
              <input type="email" id="emailReg" name="email" placeholder="enter email" className="form-control" />
            </div>

            <div className="form-group">
              <label><b>Password</b></label>
              <input type="password" id="pswdReg" name="pswd" placeholder="enter Password" className="form-control" />
            </div>
            <Button variant="outlined" className="fc-blk ol-n b-2blk f-b w-100 mt-6 mb-6">Continue With Email</Button>
            <div className=" ta-c mt-6 mb-6">
              <hr className="d-il-b w-38 m-1 bt-g" />
              <p className="d-il-b m-0 mr-2 ml-2 f-b5 fc-g">OR</p>
              <hr className="d-il-b w-38 m-1 bt-g" />
            </div>
            <Button variant="outlined" className="facebookColor w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaFacebookF className="f-22 mr-3" />Continue With Facebook
            </Button>
            <Button variant="outlined" className="googleColor w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaGooglePlusG className="f-30 mr-3" />Continue With Google
            </Button>
          </List>
        </div>
      </Dialog>
    )
  }
}
