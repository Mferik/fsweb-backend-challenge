/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
tweetData= [
  {
    tweetNote:"Güne açan çiçekler gibiyiz",
    likeNumber:"545",
    userId:1,
  }, 
  {
    tweetNote:"Yalan yalaaaan",
    likeNumber:"30",
    userId:3,
  },
  {
    tweetNote:"Ölene dek beraberiz",
    likeNumber:"100",
    userId:2,
  },
  {
    tweetNote:"Yalaaaan",
    likeNumber:"255",
    userId:4,
  },
]

exports.tweetData=tweetData

exports.seed = async function(knex) {
 return await knex("Tweets").insert(tweetData)
};
