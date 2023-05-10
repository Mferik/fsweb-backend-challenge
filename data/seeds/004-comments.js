/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const commentData = [
  {
    commentNote:"Façan yansın karşim",
    userId:1,
    tweetId:3,
  },
  {
    commentNote:"Cool",
    userId:4,
    tweetId:2,
  },
  {
    commentNote:"Ne güzel",
    userId:4,
    tweetId:3,
  },
  {
    commentNote:"+1",
    userId:3,
    tweetId:2,
  },
  {
    commentNote:"upup",
    userId:1,
    tweetId:4,
  },
  {
    commentNote:"beni şaşırtın",
    userId:3,
    tweetId:2,
  },
]

exports.commentData = commentData

exports.seed = async function(knex) {
 return await knex("Comments").insert(commentData)
};
