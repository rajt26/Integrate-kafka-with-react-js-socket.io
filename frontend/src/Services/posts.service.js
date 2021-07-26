import http from "../common/http-common";

// call posts apis
const create = async (data) => {
  let token = localStorage.getItem("token"); //get token from local storage
  return http.post("/posts/create", data, {
    headers: { Authorization: `${token}`, "Content-Type": "application/json" },
  }); // set token in header
};

const getPosts = async () => {
  let token = localStorage.getItem("token");
  return http.get("/posts", { headers: { Authorization: `${token}` } });
};

const deletePost = async (id) => {
  let token = localStorage.getItem("token");
  return http.post(
    "/posts/delete",
    { id },
    { headers: { Authorization: `${token}` } },
  );
};

const updatePost = async (data) => {
  let token = localStorage.getItem("token");
  return http.put("/posts/update", data, {
    headers: { Authorization: `${token}` },
  });
};
export const PostsService = {
  create,
  getPosts,
  deletePost,
  updatePost,
};
