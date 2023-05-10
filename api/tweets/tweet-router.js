const router = require("express").Router();
const model = require("./tweet-model");
const md = require("./tweet-middleware");

router.get("/", async (req, res, next) => {
  try {
    const response = await model.getAll();
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.post("/", md.checkPayloadTweet, async (req, res, next) => {
  try {
    const response = await model.insertTweet(req.body);
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.get("/:id", md.checkIdExisting, async (req, res, next) => {
  try {
    const response = await model.getByTweetId(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.put("/:id", md.checkIdExisting, async (req, res, next) => {
  try {
    const response = await model.updateTweet(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.delete("/:id", md.checkIdExisting, async (req, res, next) => {
  try {
    const response = await model.removeTweet(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
