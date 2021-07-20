let user = JSON.parse(localStorage.getItem("user"));
const intialState = user ? { loggedIn: true, user } : {};

const authentication = (state = intialState, action) => {
  console.log('====================================');
  console.log('====================================');
  switch (action.type) {
    case "REGISTER":
      return { isRegistered: true };
    case "LOGIN":
      return { loggingIn: true, user:action.payload.user };
    case "ERROR":
      return {loggingIn: false}
    default:
        return state
  }
};

export default authentication