const router = require("express").Router();
const UserModel = require("../users/users-model");
const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");
const mw = require("./auth-middleware");


router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Auth servisi çalışıyor",
  });
});

router.post(
  "/register",
  mw.payloadCheck,
  mw.usernameAndEmailUnique,
  async (req, res, next) => {
    try {
      const newUserObj = {
        username: req.body.username,
        email: req.body.email,
        password: req.encPassword,
      };
      let registeredUser = await UserModel.addUser(newUserObj);
      res.status(201).json(registeredUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  mw.payloadCheckLogin,
  mw.passwordCheck,
  async (req, res, next) => {
    try {
      const token = jwt.sign(
        {
          user_id: req.user.user_id,
          name: req.user.name,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        message: `Merhabalar ${req.user.username}`,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
