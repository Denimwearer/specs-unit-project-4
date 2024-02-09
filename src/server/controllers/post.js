import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export const addPost = async (req, res) => {
  try {
    const { title, content, status, userId } = req.body;
    await Post.create({ title, content, privateStatus: status, userId });
    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR IN getCurrentUserPosts");
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { privateStatus: false },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("ERROR IN getAllPosts");
    console.log(error);
    res.sendStatus(400);
  }
};
export const getCurrentUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("ERROR IN getCurrentUserPosts");
    console.log(error);
    res.sendStatus(400);
  }
};
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Post.update(
      { privateStatus: status },
      {
        where: { id: +id },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR IN getCurrentUserPosts");
    console.log(error);
    res.sendStatus(400);
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id: +id } });
    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR IN getCurrentUserPosts");
    console.log(error);
    res.sendStatus(400);
  }
};
