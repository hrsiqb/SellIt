import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
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
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { signUpWithEmail, insertUserData, loginWithEmail, loginWithFacebook, loginWithGoogle } from '../config/firebase'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { withSnackbar } from 'notistack';

class LoginDialog extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      emailError: false,
      passwordError: false
    }
  }
  showSnackBar = (msg, variant) => {
    this.props.enqueueSnackbar(msg, {
      variant,
      autoHideDuration: 5000
    });
  }
  handleFacebookLogin = () => {
    this.props.closeSnackbar()
    this.setState({ loading: true })
    new Promise((res, rej) => loginWithFacebook(res, rej))
      .then((data) => {
        this.state.uId = data.user.uid
        let memberSince = data.user.metadata.creationTime.split(' ').slice(1, 4).join(' ')
        let userData = {
          email: data.user.email,
          imageFile: data.user.photoURL,
          name: data.user.displayName,
          uId: data.user.uid,
          phone: '',
          memberSince
        }
        if (data.additionalUserInfo.isNewUser) {
          new Promise((res, rej) => insertUserData(res, rej, data.additionalUserInfo.providerId, userData))
            .then(() => {
              this.setState({ loading: false })
              this.showSnackBar('Facebook Login Successful', 'success')

              this.props.onClose(true)
            })
            .catch((error) => {
              this.setState({ loading: false })
              this.showSnackBar(error.message, 'error')

              this.props.onClose(true)
            })
        }
        else {
          this.setState({ loading: false })
          this.showSnackBar('Facebook Login Successful', 'success')

          this.props.onClose(true)
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
        this.showSnackBar(error.message, 'error')
        if (error.message.includes('email') || error.message.includes('no user')) this.state.emailError = true
        if (error.message.includes('password')) this.state.passwordError = true
        this.setState(this.state)
      })
  }
  handleGoogleLogin = () => {
    this.props.closeSnackbar()
    this.setState({ loading: true })
    new Promise((res, rej) => loginWithGoogle(res, rej))
      .then((data) => {
        this.state.uId = data.user.uid
        let memberSince = data.user.metadata.creationTime.split(' ').slice(1, 4).join(' ')
        let userData = {
          email: data.user.email,
          imageFile: data.user.photoURL,
          name: data.user.displayName,
          uId: data.user.uid,
          phone: '',
          memberSince
        }
        if (data.additionalUserInfo.isNewUser) {
          new Promise((res, rej) => insertUserData(res, rej, data.additionalUserInfo.providerId, userData))
            .then(() => {
              this.setState({ loading: false })
              this.showSnackBar('Google Login Successful', 'success')

              this.props.onClose(true)
            })
            .catch((error) => {
              this.setState({ loading: false })
              this.showSnackBar(error.message, 'error')

              this.props.onClose(true)
            })
        }
        else {
          this.setState({ loading: false })
          this.showSnackBar('Google Login Successful', 'success')

          this.props.onClose(true)
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
        this.showSnackBar(error.message, 'error')
      })
  }
  handleLogin = () => {
    this.props.closeSnackbar()
    this.setState({ loading: true, passwordError: false, emailError: false })
    new Promise((res, rej) => loginWithEmail(res, rej, { email: this.state.email, password: this.state.password }))
      .then((result) => {
        this.setState({ loading: false })
        this.showSnackBar('Login successful', 'success')

        this.props.onClose(true)
      })
      .catch((error) => {
        this.setState({ loading: false })
        this.showSnackBar(error.message, 'error')
      })
  }
  handleChange = (prop) => (event) => {
    this.state[prop] = event.target.value
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <Backdrop className='fc-w zInd-12' open={this.state.loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                  <TextField error={this.state.emailError} onChange={this.handleChange('email')} fullWidth={true} label="Email" />
                </Grid>
              </Grid>
              {/* Password */}
              <Grid item>
                <VpnKey fontSize="small" />
              </Grid>
              <Grid item className="w-87">
                <TextField error={this.state.passwordError} type={this.state.showPassword ? 'text' : 'password'} onChange={this.handleChange('password')} fullWidth={true} label="Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton className="ol-n bs-n"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" className="fc-blk ol-n b-2blk f-b mt-6 mb-6 f-16 f-b w-100 h-42"
              onClick={this.handleLogin}>
              Login</Button>
            <div className=" ta-c mt-6 mb-6">
              <hr className="d-il-b w-38 m-1 bt-g" />
              <p className="d-il-b m-0 mr-2 ml-2 f-b5 fc-g">OR</p>
              <hr className="d-il-b w-38 m-1 bt-g" />
            </div>
            <Button variant="outlined" onClick={this.handleFacebookLogin} className="facebookColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
              <FaFacebookF className="f-22 mr-3" />Continue With Facebook
            </Button>
            <Button variant="outlined" onClick={this.handleGoogleLogin} className="googleColor h-42 w-100 ol-n mt-6 mb-6 fc-w f-b">
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
      userInfo: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        imageFile: '',
        imageName: 'Select an Image->>',
      },
      error: {
        name: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
        imageFile: false,
      },
      global: {
        showPassword: false
      },
      loading: {
        open: false
      }
    }
  }
  handleChange = (prop) => (event) => {
    if (prop === 'image') {
      this.state.userInfo.imageFile = event.target.files.item(0)
      this.state.userInfo.imageName = event.target.files.item(0).name
      this.setState(this.state)
    }
    else this.state.userInfo[prop] = event.target.value
  }
  handleClickShowPassword = () => {
    this.state.global.showPassword = !this.state.global.showPassword
    this.setState(this.state)
  }
  showSnackBar = (msg, variant) => {
    this.props.enqueueSnackbar(msg, {
      variant,
      autoHideDuration: 5000
    });
  }
  handleFacebookLogin = () => {
    this.props.closeSnackbar()
    this.setState({ loading: { open: true } })
    new Promise((res, rej) => loginWithFacebook(res, rej))
      .then((data) => {
        this.state.userInfo.uId = data.user.uid
        let memberSince = data.user.metadata.creationTime.split(' ').slice(1, 4).join(' ')
        let userData = {
          email: data.user.email,
          imageFile: data.user.photoURL,
          name: data.user.displayName,
          uId: data.user.uid,
          phone: '',
          memberSince
        }
        if (data.additionalUserInfo.isNewUser) {
          new Promise((res, rej) => insertUserData(res, rej, data.additionalUserInfo.providerId, userData))
            .then(() => {
              this.setState({ loading: { open: false } })
              this.showSnackBar('Facebook Login Successful', 'success')

              this.props.onClose(true)
            })
            .catch((error) => {
              this.setState({ loading: { open: false } })
              this.showSnackBar(error.message, 'error')

              this.props.onClose(true)
            })
        }
        else {
          this.setState({ loading: { open: false } })
          this.showSnackBar('Facebook Login Successful', 'success')

          this.props.onClose(true)
        }
      })
      .catch((error) => {
        this.setState({ loading: { open: false } })
        this.showSnackBar(error.message, 'error')
        if (error.message.includes('email') || error.message.includes('no user')) this.state.error.email = true
        if (error.message.includes('password')) this.state.error.password = true
        this.setState(this.state)
      })
  }
  handleGoogleLogin = () => {
    this.props.closeSnackbar()
    this.setState({ loading: { open: true } })
    new Promise((res, rej) => loginWithGoogle(res, rej))
      .then((data) => {
        this.state.userInfo.uId = data.user.uid
        let memberSince = data.user.metadata.creationTime.split(' ').slice(1, 4).join(' ')
        let userData = {
          email: data.user.email,
          imageFile: data.user.photoURL,
          name: data.user.displayName,
          uId: data.user.uid,
          phone: '',
          memberSince
        }
        if (data.additionalUserInfo.isNewUser) {
          new Promise((res, rej) => insertUserData(res, rej, data.additionalUserInfo.providerId, userData))
            .then(() => {
              this.setState({ loading: { open: false } })
              this.showSnackBar('Google Login Successful', 'success')

              this.props.onClose(true)
            })
            .catch((error) => {
              this.setState({ loading: { open: false } })
              this.showSnackBar(error.message, 'error')

              this.props.onClose(true)
            })
        }
        else {
          this.setState({ loading: { open: false } })
          this.showSnackBar('Google Login Successful', 'success')

          this.props.onClose(true)
        }
      })
      .catch((error) => {
        this.setState({ loading: { open: false } })
        this.showSnackBar(error.message, 'error')
      })
  }
  handleSignUp = () => {
    this.props.closeSnackbar()
    let error = false
    /*=============================== Validate form data =============================*/
    for (var property in this.state.userInfo) {
      if (property !== 'imageName') {
        if (this.state.userInfo[property] === '') {
          if (property !== 'imageFile') {
            this.showSnackBar(`Please enter your ${property}`, 'error')
            this.state.error[property] = true
            error = true
          }
        }
        else {
          this.state.error[property] = false
          if (property === 'imageFile') {
            if (this.state.userInfo.imageFile.type.split('/')[0] !== 'image') {
              this.showSnackBar('Please select a valid image file', 'error')
              this.state.error[property] = true
              error = true
            }
          }
          else if (property === 'phone') {
            if (this.state.userInfo[property].length !== 11) {
              this.showSnackBar('Phone number should have 11 numbers', 'error')
              this.state.error[property] = true
              error = true
            }
          }
          else if (property === 'confirmPassword') {
            if (this.state.userInfo.confirmPassword !== this.state.userInfo.password) {
              this.showSnackBar('Confirm password should be equal to password', 'error')
              this.state.error[property] = true
              error = true
            }
          }
        }
      }
    }
    /*=============================== Register User =============================*/
    if (!error) {
      this.state.loading.open = true
      this.setState(this.state)
      new Promise((resolve, reject) => signUpWithEmail(resolve, reject, this.state.userInfo))
        .then((data) => {
          this.state.userInfo.uId = data.user.uid
          let memberSince = data.user.metadata.creationTime.split(' ').slice(1, 4).join(' ')
          const { email, imageFile, name, uId, phone } = this.state.userInfo
          let userData = { email, imageFile, name, uId, phone, memberSince }
          if (data.additionalUserInfo.isNewUser) {
            new Promise((res, rej) => insertUserData(res, rej, data.additionalUserInfo.providerId, userData))
              .then((result) => {
                this.state.loading.open = false
                this.showSnackBar('SignUp Successful', 'success')
                this.setState(this.state)

                this.props.onClose(true)
              })
              .catch((error) => {
                this.state.loading.open = false
                this.showSnackBar(error.message, 'error')
                this.setState(this.state)

                this.props.onClose(true)
              })
          }
        })
        .catch((error) => {
          if (error.message.includes('email')) this.state.error.email = true
          if (error.message.includes('Password')) this.state.error.password = true
          this.setState(this.state)
          this.showSnackBar(error.message, 'error')
          this.state.loading.open = false
          this.setState(this.state)
        })
    }
    // this.setState(this.state)
  }
  render() {
    var border = 'w-40 h-70 d-fr ai-fe b-b-1gry p-1 mb-1'
    var text = 'm-0 text-secondary'
    if (this.state.error.imageFile) {
      border = 'w-40 h-70 d-fr ai-fe b-b-2red p-1 mb-1'
      text = 'm-0 fc-r'
    }
    return (
      <Dialog onClose={() => this.props.onClose()} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <Backdrop className='fc-w zInd-12' open={this.state.loading.open} >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div style={{ maxWidth: "616px" }}>
          <List className="p-3 ta-c">
            <h3 className="ta-c mb-2 f-b">SignUp</h3>
            <hr className="bt-g" />
            {/* Name */}
            <Grid className="mb-4" container spacing={1} alignItems="flex-end">
              <Grid item className="w-5  mr-2" ><Person /></Grid>
              <Grid item className="w-40 mr-4 h-70 d-f ai-fe">
                <TextField error={this.state.error.name} onChange={this.handleChange('name')} fullWidth={true} label="Name" />
              </Grid>
              {/* Email */}
              <Grid item className="w-5  mr-2"><EmailIcon /></Grid>
              <Grid item className="w-40 h-70 d-f ai-fe">
                <TextField error={this.state.error.email} type='email' onChange={this.handleChange('email')} fullWidth={true} label="Email" />
              </Grid>
              {/* Phone */}
              <Grid item className="w-5  mr-2"><PhoneIcon fontSize="small" /></Grid>
              <Grid item className="w-40 mr-4 h-70 d-f ai-fe">
                <TextField error={this.state.error.phone} type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={this.handleChange('phone')} fullWidth={true} label="Phone" />
              </Grid>
              {/* Image */}
              <Grid item className="w-5 mr-2"><PhotoCamera /></Grid>
              <Grid item className={border}>
                <div className='w-80'><p className={text} id="imageTitle" align="left">{this.state.userInfo.imageName}</p></div>
                <Grid item className="w-20 mb--13 ta-r">
                  <input accept="image/*" onChange={this.handleChange('image')} className='d-n' id="icon-button-file" type="file" />
                  <label htmlFor="icon-button-file" className="m-0">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
              {/* Password */}
              <Grid item className="w-5 mr-2"><VpnKey /></Grid>
              <Grid item className="w-40 h-70 mr-4 d-fr ai-fe">
                <TextField error={this.state.error.password} type={this.state.global.showPassword ? 'text' : 'password'} onChange={this.handleChange('password')} fullWidth={true} label="Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton className="ol-n bs-n"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.global.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                  }}
                />
              </Grid>
              {/* Confirm Password */}
              <Grid item className="w-5 mr-2"><VpnKey /></Grid>
              <Grid item className="w-40 h-70 d-f ai-fe">
                <TextField error={this.state.error.confirmPassword} type={this.state.global.showPassword ? 'text' : 'password'} onChange={this.handleChange('confirmPassword')} fullWidth={true} label="Confirm Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton className="ol-n bs-n"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.global.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            {/* Buttons */}
            <Button variant="outlined"
              className="fc-blk ol-n b-2blk f-b mt-6 mb-6 f-16 f-b w-65 h-42"
              onClick={this.handleSignUp}
            >
              SignUp</Button>
            <div className=" ta-c mt-6 mb-6">
              <hr className="d-il-b w-38 m-1 bt-g" />
              <p className="d-il-b m-0 mr-2 ml-2 f-b5 fc-g">OR</p>
              <hr className="d-il-b w-38 m-1 bt-g" />
            </div>
            <div className="d-fr f-wr jc-sb">
              <Button variant="outlined" onClick={this.handleFacebookLogin} className="facebookColor h-42 w-49 ol-n mt-6 mb-6 fc-w f-b">
                <FaFacebookF className="f-22 mr-2" />Continue With Facebook
            </Button>
              <Button variant="outlined" onClick={this.handleGoogleLogin} className="googleColor h-42 w-49 ol-n mt-6 mb-6 fc-w f-b">
                <FaGooglePlusG className="f-30 mr-2" />Continue With Google
            </Button>
            </div>
          </List>
        </div >
      </Dialog >
    )
  }
}
const LoginDialogComp = withSnackbar(LoginDialog)
const RegisterDialogComp = withSnackbar(RegisterDialog)
export { LoginDialogComp, RegisterDialogComp }