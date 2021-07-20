import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/SignUp'
import Posts from './pages/Posts/Posts'
import AddPosts from './pages/Posts/AddPosts'
import { useEffect} from "react";
import { socket} from './socket/index'
import { useDispatch ,useSelector} from "react-redux";


function App() {
  const dispatch = useDispatch()
  const postData = useSelector(state => state.posts)
  useEffect(() => {
    socket.on('new_post',(data) => {
      console.log('====================================');
      console.log('data-----',data);
      console.log('====================================');
      dispatch({type:"ADDPOST",posts:data})
    })
  },[])

  return (
      <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/posts">
              <Posts />
              </Route>
              <Route path="/addposts">
              <AddPosts  />
              </Route>
            </Switch>
      </Router>
  )
}

export default App;
