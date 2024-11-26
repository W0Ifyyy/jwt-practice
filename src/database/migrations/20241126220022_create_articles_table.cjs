/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("slug").unique().notNull();
    table.text("content");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
    table.timestamps(false, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
