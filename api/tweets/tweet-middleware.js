const model = require("./tweet-model");

const checkIdExisting = async (req, res, next) => {
  try {
    const response = await model.getByTweetId(req.params.id);
    if (response) {
      next();
    } else {
      next({
        status: 404,
        message: `${req.params.id} id'li tweet bulunamadı`,
      });
    }
  } catch (error) {
    next(error);
  }
};
const checkPayloadTweet = async (req, res, next) => {
  try {
    const payloadArray = ["tweetNote", "userId"];
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

module.exports = { checkIdExisting, checkPayloadTweet };
