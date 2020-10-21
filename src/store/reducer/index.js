import { storage, insertAddData, getAllAdds, getAddData } from '../../config/firebase'

var INITIAL_STATE = {
    addsToAppend: 20,
    numberOfAdds: 0,
    firstRun: true,
    appendedData: Array.from(new Array(20)),
    fetchedData: []
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GETADDS":
            const { addsToAppend, firstRun } = INITIAL_STATE
            var promise = new Promise((resolve, reject) => getAllAdds(firstRun, addsToAppend, resolve, reject))
            promise.then((returnedData) => {
                INITIAL_STATE = returnedData
                action.resolve(returnedData)
            })
                .catch(() => {
                    action.reject(INITIAL_STATE)
                })
            break;

        case "GETADDDATA":
            var promise = new Promise((resolve, reject) => getAddData(resolve, reject, action.iId))
            promise.then((returnedData) => {
                // INITIAL_STATE = returnedData
                action.resolve(returnedData)
            })
                .catch(() => {
                    action.reject(INITIAL_STATE)
                })
            break;
    }
    return state
}