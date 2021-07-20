import { Form, Input, Button, Checkbox,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { UserAction } from "../../action/user.action";
import { useHistory } from "react-router-dom";
import "./style.css";
import Header from '../../component/Header/header'
import axios from 'axios'
import { useEffect, useState } from "react";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = async (e) => {
    const res = dispatch(await UserAction.login(e));
    console.log('====================================');
    console.log('res------',res);
    console.log('====================================');
    if(res.payload.error){
      message.error(res.payload.error)
    }
    else if(res.payload.user){
      message.success('User Login Successfully')
    }
    if(res.payload.token){
      localStorage.setItem("token",  res.payload.token);
    }
    localStorage.setItem("user", JSON.stringify(res && res.payload && res.payload.user ? res.payload.user:{}));
    history.push("/addposts");
  };

  return (
    <div className="Login">
      <Header/>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
