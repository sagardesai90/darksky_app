require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const fetch = require("node-fetch");
const DARKSKY = process.env.DARKSKY;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

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

// fetch(
//   `https://api.darksky.net/forecast/61e9b18d204e4e5d2d2209062be1400e/${latLon[0]}, ${latLon[1]}`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "Access-Control-Allow-Origin": "*",
//       mode: "no-cors"
//     }
//   }
// ).then(res => res.json());

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
