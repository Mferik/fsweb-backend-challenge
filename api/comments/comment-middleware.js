const checkPayloadComment = (req, res, next) => {
  const payloadArray = ["commentNote", "userId", "postId"];
  try {
    for (const payload of payloadArray) {
      if (!req.body[payload]) {
        throw {
          status: 404,
          message: `${payload} eksik`,
        };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkPayloadComment };
