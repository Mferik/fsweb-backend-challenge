const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");
const db = require("../../data/db-config");

const restricted = (req, res, next) => {
  const token = req.header.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (error, decodedJwt) => {
      if (error) {
        next({ status: 402, message: "Invalid token" });
      } else {
        req.userData = decodedJwt;
        next();
      }
    });
  } else {
    next({
      status: 404,
      message: "Token is not found",
    });
  }
};

const checkPayloadRegister = (req, res, next) => {
  const payloadArray = ["username", "email", "birthday", "password"];
  try {
    for (const payload of payloadArray) {
      if (!req.body[payload]) {
        throw { status: 404, message: `${payload} is missing` };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkPayloadLogin = (req, res, next) => {
  const payloadArray = ["username", "password"];
  try {
    for (const payload of payloadArray) {
      if (!req.body[payload]) {
        throw { status: 404, message: `${payload} property is missing` };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const uniqueValue = async (req, res, next) => {
  const payloadArray = ["username", "userEmail"];
  let results = [];

  try {
    for (const payload of payloadArray) {
      let searchedUser = await db("Users")
        .where(`${payload}`, req.body[payload])
        .first();
      results.push(searchedUser);
    }

    if (results.some((result) => result)) {
      throw { status: 402, message: `${payload} is already used` };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isUsernameExist = async (req, res, next) => {
  try {
    let searchedUser = await db("Users")
      .where("username", req.body.username)
      .first();
    searchedUser
      ? next()
      : next({ status: 404, message: `${req.body.username} is not found` });
  } catch (error) {
    next(error);
  }
};

const roleCheck = (req, res, next) => {
  try {
    req.userData.role === "admin"
      ? next()
      : next({ status: 402, message: "You do not have authorization" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  restricted,
  checkPayloadRegister,
  checkPayloadLogin,
  uniqueValue,
  isUsernameExist,
  roleCheck,
};
