import { useHistory } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { PostAction } from "../../action/post.action";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/Header/header";
import { uniqBy } from "lodash";

const Posts = () => {
  const history = useHistory();
  let posts = useSelector((state) => state.posts);
  const [visible, setVisible] = useState(false);
  const [id, setPostId] = useState("");
  const [flag, setFlag] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  posts = uniqBy(posts, "_id");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
    dispatch(await PostAction.getPosts());
    let getToken = localStorage.getItem("token");
    if (!getToken) {
      history.push("/login");
    }
  }, []);

  const onDelete = async (id) => {
    dispatch(await PostAction.deletePosts(id));
  };

  const openModal = async () => {
    setVisible(true);
  };

  const onFinish = async (values) => {
    setVisible(false);
    dispatch(
      await PostAction.updatePost({
        id: id.id,
        title: values.title,
        description: values.description,
      }),
    );
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <>
      <Header />
      <h1>User Posts</h1>
      {posts.map((post) => (
        <Card title={post.title} bordered={true} style={{ width: 1300 }}>
          <p>{post.description}</p>

          {post.user == user._id && (
            <>
              <Button
                style={{ width: 70 }}
                type="danger"
                htmlType="submit"
                className="addpost-form-button"
                onClick={() => onDelete(post._id)}
              >
                Delete
              </Button>
              <Button
                style={{ width: 70 }}
                type="primary"
                htmlType="submit"
                className="addpost-form-button"
                onClick={() => openModal() && setPostId({ id: post._id })}
              >
                Update
              </Button>
            </>
          )}
        </Card>
      ))}
      <Modal
        title="Update Detail"
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          name="update_post"
          className="update_post"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item name="title" label="Title">
            <Input style={{ width: 450 }} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input style={{ width: 450 }} />
          </Form.Item>
        </Form>
      </Modal>
      <a onClick={logout}>Logout</a>
    </>
  );
};

export default Posts;
