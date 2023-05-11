const router = require("express").Router();
const model = require("./posts-model");
const mw = require("./posts-middleware");

router.get("/", async (req, res, next) => {
  const posts = await model.getPosts();
  res.status(200).json(posts);
});

router.get("/:id", mw.checkUserId, (req, res, next) => {
  res.status(200).json(req.comment);
});

router.post("/", mw.checkPayloadAndUserIdExist, async (req, res, next) => {
  try {
    let insertedPost = await model.insertPost({
      user_id: req.userInfo.user_id,
      post_content: req.body.post_content,
    });
    res.json(insertedPost);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:post_id",
  mw.checkPostId,
  mw.checkPostContent,
  async (req, res, next) => {
    try {
      const postUpdate = await model.updatePost(req.body, req.params.post_id);
      res.status(200).json(postUpdate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:post_id", mw.checkPostId, async (req, res, next) => {
  try {
    await model.deletePost(req.params.post_id);
    res
      .status(200)
      .json({ message: `${req.params.post_id} id'li post silindi` });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/comment",
  mw.checkPayloadAndCommentIdExist,
  async (req, res, next) => {
    try {
      let commentData = await model.insertComment({
        user_id: req.userInfo.user_id,
        post_id: req.body.post_id,
        post_comment: req.body.post_comment,
      });
      res.json(commentData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/comment/:comment_id",
  mw.checkCommentId,
  mw.checkCommentContent,
  async (req, res, next) => {
    try {
      const commentUpdate = await model.updateComment(
        req.body,
        req.params.comment_id
      );
      res.status(200).json(commentUpdate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/comment/:comment_id",
  mw.checkCommentId,
  async (req, res, next) => {
    try {
      await model.deleteComment(req.params.comment_id);
      res
        .status(200)
        .json({ message: `${req.params.comment_id} id'li comment silindi` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
