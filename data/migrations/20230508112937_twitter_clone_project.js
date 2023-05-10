/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Roles", (table) => {
      table.increments("roleId");
      table.string("role").notNullable().unique();
    })
    .createTable("Users", (table) => {
      table.increments("userId");
      table.string("username", 128).unique().notNullable();
      table.string("email", 128).unique().notNullable();
      table.string("birthday", 128).notNullable();
      table.string("password", 255).notNullable();
      table
        .integer("roleId")
        .unsigned()
        .defaultTo(2)
        .references("roleId")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["roleId", "userId"]);
    })
    .createTable("Tweets", (table) => {
      table.increments("tweetId");
      table.string("tweetNote", 255);
      table.integer("likeNumber").defaultTo(0);
      table
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("Users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["userId", "tweetId"]);
    })
    .createTable("Comments", (table) => {
      table.increments("commentId");
      table.string("commentNote", 255).notNullable();
      table
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("Users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("tweetId")
        .unsigned()
        .notNullable()
        .references("tweetId")
        .inTable("Tweets")
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
    .dropTableIfExists("Comments")
    .dropTableIfExists("Tweets")
    .dropTableIfExists("Users")
    .dropTableIfExists("Roles")
};
