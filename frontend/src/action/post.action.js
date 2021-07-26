import { PostsService } from "../Services/posts.service";
import { CREATEPOST, GETPOST, DELETEPOST, UPDATEPOST } from "../action/type";

// create action for particular operation
const createPost = (data) => {
  return PostsService.create(data).then((post) => {
    return {
      type: CREATEPOST,
      post,
    };
  });
};
const getPosts = () => {
  return PostsService.getPosts().then((posts) => {
    return {
      type: GETPOST,
      posts: posts.data,
    };
  });
};

const deletePost = (id) => {
  return PostsService.deletePost(id).then((posts) => {
    return {
      type: DELETEPOST,
      posts: posts.data,
    };
  });
};

const updatePost = (data) => {
  return PostsService.updatePost(data).then((post) => {
    return {
      type: UPDATEPOST,
      posts: post.data,
    };
  });
};
export const PostAction = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
