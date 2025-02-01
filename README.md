# JWT Practice

A simple authentication system using JWT (JSON Web Token) with Node.js, Express, and MySQL (Knex.js ORM).

## Features
- User authentication using JWT (access and refresh tokens)
- Middleware to protect routes
- MySQL database integration using Knex.js
- Secure token storage in HTTP-only cookies

## Technologies Used
- Node.js
- Express.js
- JWT (jsonwebtoken)
- Knex.js (MySQL ORM)
- dotenv (Environment variables)
- cookie-parser

 `.env` file with the following variables:
  ```env
  DB_HOST=your_database_host
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_NAME=your_database_name
  TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  ```

### Protected Routes
- **GET /api/users** (Requires Authentication)
  - Fetches users with related articles.

## Middleware
- **authenticate(req, res, next)**: Protects routes by verifying JWT stored in HTTP-only cookies.

## License
This project is licensed under the MIT License.

