require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/omdb", (req, res) => {
  axios
    .request({
      method: "GET",
      url: `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`,
      params: req.query, //the s key in req.query matches up with the s parameter that omdb needs
    })
    .then((axiosRes) => {
      res.json(axiosRes.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
