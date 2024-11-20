import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Root endpoint to check if the server is running
app.get("/", (req, res) => res.send("Ok!"));

// Endpoint to get users (requires authentication)
app.get("/api/users", authenticate, (req, res) => {
  const users = [{ id: 1, name: "Bartosz" }];
  res.send(users);
});

// Endpoint for user login, generates access and refresh tokens
app.post("/api/auth/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
    expiresIn: 86400, // Valid for 1 day
  });

  const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 525600, // Valid for 1 year
  });

  res.cookie("JWT", accessToken, {
    maxAge: 86400000,
    httpOnly: true,
  });

  res.send({ accessToken, refreshToken });
});

// Endpoint to refresh access tokens
app.post("/api/auth/refresh", async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401);

  // Verify the refresh token
  try {
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.sendStatus(403); // Forbidden if verification fails
  }

  // Issue a new access token
  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.send({ accessToken });
});

// Middleware to authenticate requests using JWT
function authenticate(req, res, next) {
  const token = req.cookies.JWT;

  if (!token) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user;
    next();
  });
}

// Start the server
app.listen(3000, () => console.log("Server is up!"));
