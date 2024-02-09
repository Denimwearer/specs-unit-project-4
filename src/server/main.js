import express from "express";
import ViteExpress from "vite-express";
import { sequelize } from "./util/db.js";
import { Post } from "./models/post.js";
import { User } from "./models/user.js";
const { PORT } = process.env;
import {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} from "./controllers/post.js";

import { register, login } from "./controllers/auth.js";

import { isAuthenticated } from "./middleware/isAuthenticated.js";

const app = express();
app.use(express.json());

User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

sequelize
  .sync()
  .then(() => {
    ViteExpress.listen(app, PORT, () =>
      console.log(`db sync successful & server is listening on port ${PORT}...`)
    );
  })
  .catch((err) => console.log(err));
