const set_data = (data) => {
    return (dispatch) => {
        dispatch({type: "SETDATA", data: data })
    }
}
const get_data = (type, resolve, reject, iId = '') => {
    return (dispatch) => {
        dispatch({
            type,
            resolve,
            reject,
            iId
        })
    }
}
export {
    set_data,
    get_data
}