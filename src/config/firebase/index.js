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
const getAllAdds = (firstRun, addsToAppend, mainResolve) => {
//if number of user has been fetched, apply .on function
  var ref = firebase.database().ref("All Ads")
  var promise = new Promise((resolve) => getNumberOfAdds(resolve))
  promise.then((numberOfAdds) => {
    let numberOfFetchedAdds = 0
    let fetchedData = []
    let appendedData = []
    ref.on("child_added", (data) => {
        fetchedData.splice(0, 0, data.val())
        if(firstRun){
            let numberOfAppendedAdds = 0
            numberOfFetchedAdds++
            // if(numberOfFetchedAdds > this.state.numberOfAdds-this.state.addsToAppend)
            //     this.state.fetchedData[0].id = `card-${this.state.cardId--}`
            if(numberOfFetchedAdds === numberOfAdds){
              // this.state.cardId = this.state.addsToAppend+1
              firstRun = false
              let optimizedData = []
              if(numberOfAdds > addsToAppend)
                  optimizedData = fetchedData.slice(numberOfAppendedAdds, numberOfAppendedAdds+addsToAppend)
              else optimizedData = fetchedData 
              appendedData = Array.from(optimizedData)
              let returnData = [
                numberOfAdds,
                firstRun,
                appendedData,
                fetchedData,
                // numberOfFetchedAdds,
              ]
              mainResolve(returnData)
            }
        }
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