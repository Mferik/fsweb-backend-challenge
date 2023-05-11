/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("posts").truncate();
  await knex("comments").truncate();
  await knex("users").insert([
    {
      username: "Fatih",
      email: "mfatiherikk@gmail.com",
      password: "$2a$08$v9v9ko6E.LkFkdQN9.DyGeSGoHUBpJGcjAi7hKpTpdTRmIN6Z7Saa", //1234
    },
    {
      username: "Eylül",
      email: "eylül@gmail.com",
      password: "$2a$08$v9v9ko6E.LkFkdQN9.DyGeSGoHUBpJGcjAi7hKpTpdTRmIN6Z7Saa", //1234
    },
    {
      username: "Hale",
      email: "hale@gmail.com",
      password: "$2a$08$v9v9ko6E.LkFkdQN9.DyGeSGoHUBpJGcjAi7hKpTpdTRmIN6Z7Saa", //1234
    },
  ]);

  await knex("posts").insert([
    { post_content: "Selamss", user_id: 1 },
    { post_content: "Bugün iyiyim", user_id: 3 },
    { post_content: "Yazılım szn", user_id: 2 },
    { post_content: "Nodejslendin", user_id: 1 },
  ]);
  await knex("comments").insert([
    { post_comment: "Selamlar efenim", post_id: 1, user_id: 2 },
    { post_comment: "Selamlar ", post_id: 1, user_id: 3 },
    { post_comment: "Harika", post_id: 2, user_id: 2 },
    { post_comment: "Yok artık LeBron James", post_id: 3, user_id: 3 },
  ]);
};
