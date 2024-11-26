/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("articles").del();
  await knex("articles").insert([
    {
      id: 1,
      title: "Artykuł #1",
      slug: "artykul-1",
      content: "Lorem ipsum",
      user_id: 1,
    },
  ]);
}
