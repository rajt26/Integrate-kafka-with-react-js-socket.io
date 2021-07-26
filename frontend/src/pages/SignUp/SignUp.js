import { Form, Input, Button, Row, Col,message} from "antd";
import "antd/dist/antd.css";
import "./style.css";
import { useState } from "react";
import { UserService } from "../../Services/user.service";
import { useHistory } from "react-router-dom";
import Header from '../../component/Header/header'


const SignUp = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    let register = await UserService.register(e);
    if(register.status == 200){
      message.success('User register successfully')
    }
    history.push("/login");
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
    <Form
      {...formItemLayout}
      name="sign_up"
      className="sign_up"
      onFinish={onFinish}
      >
      <h2 style={{marginLeft:150}}>Sign Up</h2>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="signup-form-button">
          Sign Up
        </Button>
        {/* Or <a href="">Click Here for Login</a> */}
      </Form.Item>
    </Form>
    </>
  );
};

export default SignUp;
