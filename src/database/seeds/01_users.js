import bcrypt from "bcrypt";

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      email: "something@gmail.com",
      password: bcrypt.hashSync("12345", 8),
    },
  ]);
}
