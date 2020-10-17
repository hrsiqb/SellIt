import firebase from 'firebase/app'
import DatabaseReference from 'firebase/database'
import dataSnaphi from 'firebase/database'

import 'firebase/storage'
import 'firebase/database'

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
// class InsertInDatabase extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
         
//     }
//   }
async function getNumberOfAdds() {
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
const getAllAdds = () => {
  //get number of adds in the database
  var ref = firebase.database().ref("All Ads")
  ref.once("value")
    .then(function (snapshot) {//if number of user has been fetched, apply .on function
      let numberOfAdds = snapshot.numChildren()
      let fetchedAdds = 0
      let dataArr = []
      firebase.database().ref('All Ads').on("child_added", (data) => {
        dataArr.push(data.val())
        fetchedAdds++
        if(fetchedAdds === numberOfAdds) return(dataArr)
      })
    })
}
//   render() {
//     return (
//       this.InsertInDatabase()
//     )
//   }
// }


export {storage, firebase as default, insertAddData, getAllAdds}