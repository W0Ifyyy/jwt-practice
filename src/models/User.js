import { Model } from "objection";
import knex from "../config/database.js";
import Article from "./Article.js";

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    return {
      articles: {
        relation: Article.HasManyRelation,
        modelClass: Article,
        join: {
          from: "users.id",
          to: "articles.user_id",
        },
      },
    };
  }
}

export default User;
