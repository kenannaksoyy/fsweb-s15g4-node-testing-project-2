/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    const all = knex.schema
        .createTable("workers", t => {
            t.increments("wid");
            t.string("firstname").notNullable();
            t.string("lastname").notNullable();
            t.string("departman");
        })
        .createTable("engineers", t => {
            t.increments("eid");
            t.string("firstname").notNullable();
            t.string("lastname").notNullable();
            t.string("title").notNullable();
        })
    return all;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("workers")
    .dropTableIfExists("engineers");
};