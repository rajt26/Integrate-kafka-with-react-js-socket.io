const intialState = []

const posts = (state = intialState, action) => {

  switch (action.type) {
    case "GETPOST":
      return action.posts ;
    case "ADDPOST":
      return [...state,action.posts]
    case "DELETEPOST":
       state = state.filter((item)=>{
          return item._id !== action.posts._id
      })
      return state
    case "UPDATEPOST":
        let check = state.map((item) => item._id == action.posts._id?action.posts:item)
      return check
    default:
        return state
  }
};

export default posts