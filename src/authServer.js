require("dotenv").config();
const express = require("express");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  user,
  reservation,
  flight,
  creditCard,
  companion,
} = require("../Models/export");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require("../Service/DBService.js");

let refreshTokens = [];

app.post("/getaToken", (req, res) => {
  console.log("getaToken");
  console.log(req.cookies.refreshToken);
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user", user);
    const accessToken = generateAccessToken({ userId: user.userId });
    console.log("new Access token", accessToken);
    res.cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: false,
    });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  // remove the user's refresh token from the collection
  console.log("before", refreshTokens);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.rtoken);
  console.log("after", refreshTokens);
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  // console.log("login");
  // console.log(req.body);
  // console.log(req);
  // set cookies to specific path
  // res.cookie("server", "cook", {
  //   path: "/login",
  //   httpOnly: true,
  // });
  // res.cookie("server", j"cok");

  const username = req.body.username;
  const password = req.body.password;
  // Authenticate User
  const loggingUser = await user.findOne({ username: username });
  if (!loggingUser) return res.status(401).send({ message: "Wrong username" });

  if (loggingUser.password !== password) {
    console.log("wrong password", loggingUser.password, password);
    return res.status(401).send({ message: "Wrong password" });
  }
  // const payload = loggingUser._doc;
  const payload = { userId: loggingUser.id, isAdmin: loggingUser.isAdmin };

  console.log("payload", payload);
  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  refreshTokens.push(refreshToken);

  res.cookie("accessToken", accessToken, {
    path: "/",
    httpOnly: false,
  });
  res.cookie("refreshToken", refreshToken, {
    path: "/getaToken",
    httpOnly: false,
  });
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Auth Server at localhost:${port}`));
