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

  const insertComment = async (comment) => {
    const [insertedComment] = await db("Comments").insert(comment)

    await db.transaction(async (trx) => {
        const [user] = await trx("Users").where("userId",comment.userId);
        if(!user){
            await db("Comments").where("commenId",insertedComment).del()
        }
    })
    return await dataFixer()
  }

  module.exports = { insertComment };