import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/auth'
import DatabaseReference from 'firebase/database'
import dataSnaphi from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyC0VvedAJb7vZOnJy5cvaufSGgcoqpShis",
  authDomain: "sellit-928cd.firebaseapp.com",
  databaseURL: "https://sellit-928cd.firebaseio.com",
  projectId: "sellit-928cd",
  storageBucket: "sellit-928cd.appspot.com",
  messagingSenderId: "827510566225",
  appId: "1:827510566225:web:9c1263d8188a3ada16f770",
  measurementId: "G-5166CHN7SM"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

const loginWithFacebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
      }
      console.log("result=>", result)
      // The signed-in user info.
      var user = result.user;
    })
    .catch(function (error) {
      console.log("error=>", error.message)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // errorHandler(error)
    });
}
const signUpWithEmail = (data) => {
  
}
const getLoginDetails = (res, rej) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      res({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uId: user.uid,
        isLoggedIn: true
      })
      // var emailVerified = user.emailVerified;
      // var isAnonymous = user.isAnonymous;
      // var providerData = user.providerData;
    }
    else {
      // User is signed out.
      rej (false)
    }
  });
}
var insertAddData = (data) => {
  firebase.database().ref(`All Ads`).push(data[0])
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  firebase.database().ref(`All Ads`).push(data[1])
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  firebase.database().ref(`All Ads`).push(data[2])
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
}
function getNumberOfAdds(resolve) {
  var ref = firebase.database().ref("All Ads")
  ref.once("value")
    .then((snapshot) => {
      resolve(snapshot.numChildren())
    })
}
const getAllAdds = (firstRun, addsToAppend, mainResolve, mainReject) => {
  //if number of user has been fetched, apply .on function
  if (firstRun) {
    var ref = firebase.database().ref("All Ads")
    var promise = new Promise((resolve) => getNumberOfAdds(resolve))
    promise.then((numberOfAdds) => {
      let numberOfFetchedAdds = 0
      let fetchedData = []
      let appendedData = []
      ref.on("child_added", (data) => {
        fetchedData.splice(0, 0, data.val())
        if (firstRun) {
          let numberOfAppendedAdds = 0
          numberOfFetchedAdds++
          if (numberOfFetchedAdds === numberOfAdds) {
            firstRun = false
            let optimizedData = []
            if (numberOfAdds > addsToAppend)
              optimizedData = fetchedData.slice(numberOfAppendedAdds, numberOfAppendedAdds + addsToAppend)
            else optimizedData = fetchedData
            appendedData = Array.from(optimizedData)
            let returnData = {
              addsToAppend: 20,
              numberOfAdds,
              firstRun,
              appendedData,
              fetchedData,
            }
            mainResolve(returnData)
          }
        }
      })
    })
  }
  else mainReject("not first run")
}

const getAddData = (resolve, reject, iId) => {
  // var ref = firebase.database().ref("All Ads")
  // ref.orderByChild('iId').equalTo(iId).once('value')
  // .then((returnedData) => {
  //   resolve(returnedData.val())
  // })

  firebase.database().ref(`All Ads/${iId}`).once('value')
    .then((returnedData) => {
      resolve(returnedData.val())
    })
}

const getUserData = (resolve, reject, uId) => {
  firebase.database().ref(`Users/${uId}`).once('value')
    .then((returnedData) => {
      resolve(returnedData.val())
    })
}
// .startAt(iId).endAt(iId)
export {
  storage,
  firebase as default,
  insertAddData,
  getAllAdds,
  getAddData,
  getUserData,
  getLoginDetails,
  loginWithFacebook,
}