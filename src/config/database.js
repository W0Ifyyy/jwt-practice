import knexfile from "../../knexfile.js";
import knex from "knex";

const env = process.env.NODE_ENV || "development";

export default knex(knexfile[env]);
