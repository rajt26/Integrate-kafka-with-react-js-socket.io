const intialState = []

const posts = (state = intialState, action) => {
  switch (action.type) {
    case "GETPOST":
      return action.posts.data ;
    case "ADDPOST":
      return [...state,action.posts]
    default:
        return state
  }
};

export default posts