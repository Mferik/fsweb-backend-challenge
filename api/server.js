const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")
const tweetRouter = require("./tweets/tweet-router")
const commentRouter = require("./comments/comment-router")
const authMd = require("./auth/auth-middleware");


const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


server.use("/api/auth",authRouter)
server.use("/api/users",authMd.restricted,userRouter)
server.use("/api/tweets",authMd.restricted,tweetRouter)
server.use("/api/comments",authMd.restricted,commentRouter)


server.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message });
  });
module.exports = server;
