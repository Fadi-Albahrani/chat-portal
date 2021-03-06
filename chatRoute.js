const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./dbConnection");
const Chats = require("./messageSchema");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    Chats.find({}).then(chat => {
      res.json(chat);
    });
  });
});

module.exports = router;