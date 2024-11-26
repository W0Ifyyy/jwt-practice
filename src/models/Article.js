import { Model } from "objection";
import knex from "../config/database.js";

Model.knex(knex);

class Article extends Model {
  static get tableName() {
    return "articles";
  }
}

export default Article;
