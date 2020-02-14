require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const fetch = require("node-fetch");
const DARKSKY = process.env.DARKSKY;
// const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("public"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  );
}

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/forecast", function(req, res) {
  const { lat, lon } = req.query;
  fetch(`https://api.darksky.net/forecast/${DARKSKY}/${lat},${lon}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(dsRes => dsRes.json())
    .then(finRes => res.json(finRes));
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
