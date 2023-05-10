const router = require("express").Router();
const db = require("../../data/db-config");
const authMd = require("./auth-middleware");
const { JWT_SECRET } = require("../../config/config");
const { HASH_ROUNDS } = require("../../config/config");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userModel = require("../users/user-model");

const generateToken = (user) => {
  let payload = {
    id: user.userId,
    username: user.username,
    role: user.roleId == "1" ? "admin" : "user",
  };
  let option = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, JWT_SECRET, option);
};

router.post(
  "/register",
  authMd.checkPayloadRegister,
  authMd.uniqueValue,
  async (req, res, next) => {
    try {
      const hashedPassword = bcryptjs.hashSync(req.body.password, HASH_ROUNDS);
      req.body.password = hashedPassword;

      req.body.roleId = 2;
      const response = await userModel.addUser(req.body);
      res.status(201).json(response);
    } catch (error) {
      next({ status: 500, message: "Database problem" });
    }
  }
);

router.post(
  "/login",
  authMd.checkPayloadLogin,
  authMd.isUsernameExist,
  async (req, res, next) => {
    try {
      const searchedUser = await db("Users as u")
        .leftJoin("Roles as r", "r.roleId", "u.roleId")
        .select("u.*", "r.*")
        .where("username", req.body.username)
        .first();

      if (bcryptjs.compareSync(req.body.password, searchedUser.password)) {
        const token = generateToken(searchedUser);
        const currentUser = {
          id: searchedUser.userId,
          username: searchedUser.username,
          role: searchedUser.roleId == 1 ? "admin" : "user",
        };
        res.status(
          json({
            message: `${searchedUser.username} hoşgeldinnn`,
            token: token,
            currentUser: currentUser,
          })
        );
      } else {
        next({ status: 402, message: "geçersiz deneme" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
