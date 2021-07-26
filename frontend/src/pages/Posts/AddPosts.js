import { useHistory } from "react-router-dom";
import { useEffect} from "react";
import { Form, Input, Button,Modal, message} from "antd";
import { useState } from "react";
import {useSelector} from "react-redux"
import Header from '../../component/Header/header'
import { PostsService } from "../../Services/posts.service";
import FooterComponent from '../../component/Footer/footer'
import "antd/dist/antd.css";

const AddPosts = () => {
  const history = useHistory();
  const userDetail = useSelector(state => state.authentication.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(userDetail);
  let getToken
  useEffect(() => {
     getToken = localStorage.getItem("token");
    if (!getToken) {
      history.push("/login");
    }
  },[]);

  const onFinish =  async (e) => {
    // localStorage.setItem('token',getToken)
    const res = await PostsService.create({
      title: e.title,
      description: e.description,
      user: user._id,
    })
    if(res.status == 200){
      message.success('Post add successfully')
    }
      history.push("/posts");
  };

  const showPosts = () => {
    history.push("/posts");
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <>
    <Header/>
      <h1 style={{ marginLeft: 450 }}>Add Post</h1>
      <Form
        {...formItemLayout}
        name="add_post"
        className="add_post"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="Title"  rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]} >
          <Input
            placeholder="title"
            style={{ width: 450 }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="description" label="Description"
           rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <Input
            placeholder="description"
            style={{ width: 450 }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Button
          style={{ marginLeft: 500, width: 70 }}
          type="primary"
          htmlType="submit"
          className="addpost-form-button"
        >
          Add
        </Button>
        <a style={{marginLeft:20}} onClick={showPosts}>Show Posts</a>
      </Form>
      {/* <FooterComponent/> */}
    </>
  );
};

export default AddPosts;
