import { Form, Input, Button,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { UserAction } from "../../action/user.action";
import { useHistory } from "react-router-dom";
import "./style.css";
import Header from '../../component/Header/header'

const Login = () => {
  const history = useHistory(); // for get previous state
  const dispatch = useDispatch();

  const redirectSignUpPage = () => {
    history.push("/signup");
  }

  const onFinish = async (e) => {
    const res = dispatch(await UserAction.login(e)); // call user action

    if(res.payload.user){
      message.success('User Login Successfully')
      if(res.payload.token){
        localStorage.setItem("token",  res.payload.token); // set token in local storage
      }
      localStorage.setItem("user", JSON.stringify(res && res.payload && res.payload.user ? res.payload.user:{}));  // set user info in local storage
      history.push("/addposts");
    }
    else{
      message.error('Enter valid username or password!!!')
    }
  };

  return (
    <div className="Login">
      <Header/>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <h2 style={{marginBottom:20,marginLeft:110}}>Login</h2>
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{backgroundColor:"#3b5998",color:"white"}}
          >
            Log in
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
            onClick={redirectSignUpPage}
            style={{backgroundColor:"#3b5998",color:"white" ,width:300,marginLeft:0,marginTop:10}}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
