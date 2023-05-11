const router = require("express").Router();
const model = require("./users-model");
const mw = require("./users-middleware");

router.get("/", async (req, res, next) => {
  const users = await model.getAllUsers();
  res.status(200).json(users);
});

router.delete("/:id", mw.checkUserId, async (req, res, next) => {
  try {
    await model.deleteUser(req.params.id);
    res
      .status(200)
      .json({ message: `${req.params.id} id'li kullanıcı silindi` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.checkUserId, mw.checkUsername, async (req, res, next) => {
  try {
    updatedUser = await model.updateUser(req.body, req.params.id);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
