const INITIAL_STATE = {
    name: "haris"
}
export default (state = INITIAL_STATE, action) => {
    console.log(action)
    return state
}