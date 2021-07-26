const express = require("express");
const verifyToken = require('./middleware/verifyToken')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require("http");
const UserController = require("./controller/user.controller");
const PostController = require("./controller/posts.controller");
require("./db/db");
require('./socket/index')

const app = express();
dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.json())


const server = http.createServer(app)

//user routes
app.post("/user/create",UserController.create);
app.post("/user/find",verifyToken,UserController.find);
app.post("/user/update",verifyToken,UserController.update);
app.post("/user/delete",verifyToken,UserController.delete);
app.post("/user/login", UserController.login);

//posts routes
app.post("/posts/create",verifyToken,PostController.create);
app.get("/posts",verifyToken,PostController.getPosts);
app.post("/posts/delete",verifyToken,PostController.deletePosts);
app.put("/posts/update",verifyToken,PostController.updatePosts);

server.listen(3000, () => {
  console.log("server listening on port 3000");
});

module.exports = app