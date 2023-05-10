const router = require("express").Router();
const model = require("./comment-model");
const md = require("./comment-middleware");

router.post("/", md.checkPayloadComment, (req, res, next) => {
  try {
    const response = model.insertComment(req.body);
    res.status(200).json(response);
  } catch (error) {
    next({ status: 500, message: "database problem" });
  }
});

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
