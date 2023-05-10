const db = require("../../data/db-config");

const dataFixer = async () => {
  let allData = await db("Comments as c")
    .leftJoin("Posts as p", "c.postId", "p.postId")
    .leftJoin("Users as u", "c.userId", "u.userId")
    .leftJoin("Roles as r", "u.roleId", "r.roleId")
    .select("u.*", "p.*", "c.*", "r.*");

  let tweetData = await db("Tweets as t")
    .leftJoin("Users as u", "p.userId", "u.userId")
    .select("u.*", "p.*");

  let newTweetArr = tweetData.map((tweet) => {
    let commentArr = [];
    for (let comment of allData) {
      if (comment.tweetId == tweet.tweetId) {
        let commentObj = {
          userId: comment.userId,
          username: comment.username,
          commentNote: comment.commentNote,
        };
        commentArr.push(commentObj);
      }
    }
    let tweetObj = {
      tweetId: tweet.tweetId,
      userId: tweet.userId,
      username: tweet.username,
      tweetNote: tweet.tweetNote,
      likeNumber: tweet.likeNumber,
      comment: commentArr,
    };
    return tweetObj;
  });
  return newTweetArr;
};

const getAll = async () => {
  return await dataFixer();
};

const getByTweetId = async (tweetId) => {
  const allData = await dataFixer();
  return allData.filter((data) => data.tweetId == tweetId)[0];
};

const updateTweet = async (tweetId, tweet) => {
  const addTweet = await db("Tweets").where({ tweetId }).update(tweet);
};

const insertTweet = async (tweet) => {
  const [addTweet] = await db("Tweets").insert(tweet);
  await db.transaction(async (trx) => {
    const [user] = await trx("Users").where("userId", tweet.userId);
    if (!user) {
      await db("Tweets").where("postId", addTweet).del();
    }
  });
  return await dataFixer();
};

const removeTweet = async (tweetId) => {
  const deletedPost = await db("Tweets").where({ tweetId }).del();
  return await dataFixer();
};

module.exports = {
  getAll,
  getByTweetId,
  updateTweet,
  insertTweet,
  removeTweet,
};
