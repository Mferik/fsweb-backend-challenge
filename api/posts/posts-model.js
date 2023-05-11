const db = require("../../data/db-config");

const getPosts = async () => {
  const posts = await db("users as u")
    .leftJoin("posts as p", "u.user_id", "p.user_id")
    .select(
      "u.user_id",
      "u.username",
      "p.post_content",
      "p.posts_date",
      "p.post_id"
    )
    .orderBy("p.posts_date", "DESC");
  return posts;
};

const getComment = async (post_id) => {
  const comments = await db("comments as c")
    .leftJoin("posts as p", "c.post_id", "p.post_id")
    .leftJoin("users as u", "c.user_id", "u.user_id")
    .select(
      "u.name",
      "c.comment_id",
      "c.post_comment",
      "c.comment_date",
      "p.post_id"
    )
    .where("p.post_id", post_id);
  return comments;
};

const postId = async (post_id) => {
  const post = await db("posts as p").where("p.post_id", post_id).first();
  return post;
};
const commentId = async (comment_id) => {
  const comment = await db("comments as c")
    .where("c.comment_id", comment_id)
    .first();
  return comment;
};

const getPostById = async (user_id) => {
  const commentPost = await db("users as u")
    .leftJoin("posts as p", "u.user_id", "p.user_id")
    .leftJoin("comments as c", "p.post_id", "c.post_id")
    .select(
      "u.user_id",
      "u.name",
      "p.post_id",
      "p.post_content",
      "p.posts_date",
      "c.comment_id",
      "c.post_comment",
      "c.comment_date"
    )
    .where("u.user_id", user_id)
    .groupBy("p.post_content");
  if (commentPost.length === 0) {
    return [];
  }

  const userModel = {
    user_id: user_id,
    username: commentPost[0].username,
    posts: [],
  };
  for (let i = 0; i < commentPost.length; i++) {
    const user = commentPost[i];
    const postModel = {
      post_id: user.post_id,
      post_content: user.post_content,
      posts_date: user.posts_date,
      Comments: [],
    };
    const comments = await getComment(user.post_id);
    postModel.Comments = comments;
    userModel.posts.push(postModel);
  }
  return userModel;
};
const insertPost = async (post) => {
  const [insertedPostId] = await db("posts").insert(post);
  const newPost = await db("posts").where("post_id", insertedPostId).first();
  return newPost;
};
const updatePost = async function (post, post_id) {
    await db("posts").where("post_id", post_id).update(post);
    return postId(post_id);
  };
  
  const deletePost = async function (post_id) {
    return db("posts").where("post_id", post_id).delete();
  };
  
  const insertComment = async function (comment) {
    const [insertedCommentId] = await db("comments").insert(comment);
    const newComment = await db("comments")
      .where("comment_id", insertedCommentId)
      .first();
    return newComment;
  };
  
  const updateComment = async function (comment, comment_id) {
    await db("comments").where("comment_id", comment_id).update(comment);
    return commentId(comment_id);
  };
  
  const deleteComment = async function (comment_id) {
    return db("comments").where("comment_id", comment_id).delete();
  };

  module.exports = {
    getComment,
    getPostById,
    getPosts,
    postId,
    deleteComment,
    updateComment,
    insertComment,
    deletePost,
    updatePost,
    insertPost,
    commentId,
  }