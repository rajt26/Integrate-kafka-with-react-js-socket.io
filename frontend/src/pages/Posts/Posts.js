import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { PostAction } from "../../action/post.action";
import { useDispatch, useSelector } from "react-redux";
import Header from '../../component/Header/header'
import {uniqBy} from 'lodash';



const Posts = () => {
  const history = useHistory();
  let posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log("====================================");
  console.log("posts state---", posts);
  console.log("====================================");
  posts = uniqBy(posts, '_id')

  useEffect(async () => {
    dispatch(await PostAction.getPosts());
    let getToken = localStorage.getItem("token");
    if (!getToken) {
      history.push("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <>
    <Header/>
      <h1>User Posts</h1>
      {posts && posts.map((post) => (
        <Card title={post.title} bordered={true} style={{ width: 1300 }}>
          <p>{post.description}</p>
        </Card>
      ))}
      <a onClick={logout}>Logout</a>
    </>
  );
};

export default Posts;
