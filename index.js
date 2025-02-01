const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { publicIpv4 } = require("public-ip");

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const ip = await publicIpv4();
  var ipPRIV = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  res.json({
    loc: ipPRIV,
    ip: ip
  })
});

app.listen(PORT, () => {
  console.clear();
  console.log("Server started on : ", PORT);
});
