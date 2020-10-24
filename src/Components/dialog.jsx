import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import VpnKey from '@material-ui/icons/VpnKey';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';

class LoginDialog extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      showPassword: false
    }
  }
  handleChange = (prop) => (event) => {
    this.state[prop] = event.target.value
    console.log(this.state)
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <div style={{ maxWidth: "308px" }}>
          <List className="p-3 ta-c">
            <h3 className="ta-c mb-2 f-b">Login</h3>
            <hr className="bt-g" />

            <Grid className="mb-4" container spacing={1} alignItems="flex-end">
              {/* Email */}
              <Grid className="mb-2" container spacing={1} alignItems="flex-end">
                <Grid item>
                  <EmailIcon />
                </Grid>
                <Grid item className="w-85">
                  <TextField onChange={this.handleChange('email')} fullWidth={true} label="Email" />
                </Grid>
              </Grid>
              {/* Password */}
              <Grid item>
                <VpnKey fontSize="small" />
              </Grid>
              <Grid item className="w-85">
                <TextField type={this.state.showPassword ? 'text' : 'password'} onChange={this.handleChange('password')} fullWidth={true} label="Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton className="ol-n bs-n"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" className="fc-blk ol-n b-2blk f-b mt-6 mb-6 f-16 f-b w-100 h-42">Login</Button>
            <div className=" ta-c mt-6 mb-6">
              <hr className="d-il-b w-38 m-1 bt-g" />
              <p className="d-il-b m-0 mr-2 ml-2 f-b5 fc-g">OR</p>
              <hr className="d-il-b w-38 m-1 bt-g" />
            </div>
            <Button variant="outlined" className="facebookColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaFacebookF className="f-22 mr-3" />Continue With Facebook
            </Button>
            <Button variant="outlined" className="googleColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaGooglePlusG className="f-30 mr-3" />Continue With Google
            </Button>
          </List>
        </div>
      </Dialog>
    )
  }
}

class RegisterDialog extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      showPassword: false
    }
  }
  handleChange = (prop) => (event) => {
    this.state[prop] = event.target.value
    console.log(this.state)
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <div style={{ maxWidth: "308px" }}>
          <List className="p-3 ta-c">
            <h3 className="ta-c mb-2 f-b">SignUp</h3>
            <hr className="bt-g" />

            {/* Name */}
            <Grid className="mb-4" container spacing={1} alignItems="flex-end">
              <Grid item>
                <Person />
              </Grid>
              <Grid item className="w-85">
                <TextField onChange={this.handleChange('name')} fullWidth={true} label="Name" />
              </Grid>
              {/* Email */}
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item className="w-85">
                <TextField onChange={this.handleChange('email')} fullWidth={true} label="Email" />
              </Grid>
              {/* Phone */}
              <Grid item>
                <PhoneIcon fontSize="small" />
              </Grid>
              <Grid item className="w-85">
                <TextField onChange={this.handleChange('phone')} fullWidth={true} label="Phone" />
              </Grid>
              {/* Password */}
              <Grid item>
                <VpnKey />
              </Grid>
              <Grid item className="w-85">
                <TextField type={this.state.showPassword ? 'text' : 'password'} onChange={this.handleChange('password')} fullWidth={true} label="Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton className="ol-n bs-n"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" className="fc-blk ol-n b-2blk f-b mt-6 mb-6 f-16 f-b w-100 h-42">Login</Button>
            <div className=" ta-c mt-6 mb-6">
              <hr className="d-il-b w-38 m-1 bt-g" />
              <p className="d-il-b m-0 mr-2 ml-2 f-b5 fc-g">OR</p>
              <hr className="d-il-b w-38 m-1 bt-g" />
            </div>
            <Button variant="outlined" className="facebookColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaFacebookF className="f-22 mr-3" />Continue With Facebook
            </Button>
            <Button variant="outlined" className="googleColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaGooglePlusG className="f-30 mr-3" />Continue With Google
            </Button>
          </List>
        </div>
      </Dialog>
    )
  }
}
export { LoginDialog, RegisterDialog }