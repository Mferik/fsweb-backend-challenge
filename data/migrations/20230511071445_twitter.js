/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("username", 128).notNullable().unique();
      table.string("email", 128).notNullable().unique();
      table.string("password", 255).notNullable();
    })
    .createTable("posts", (table) => {
      table.increments("post_id");
      table.string("post_content").notNullable();
      table.timestamp("posts_date").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("comments", (table) => {
      table.increments("comment_id");
      table.string("post_comment").notNullable();
      table.timestamp("comment_date").defaultTo(knex.fn.now());
      table
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
