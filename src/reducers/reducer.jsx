const initialState = " ";
 const giveThedata = (state=initialState,action) =>{
        if(action.type==='profile'){
            return action.payload
        }
    return state
}
console.log(giveThedata)
export default giveThedata