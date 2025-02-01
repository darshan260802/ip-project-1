const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { publicIpv4, publicIp, publicIpv6 } = require("public-ip");

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const ip = await publicIpv4();
  const i6 = await publicIpv6();
  const ia = await publicIp();
  var ipPRIV = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  res.json({
    loc: ipPRIV,
    add: req.socket.remoteAddress. 
    ia,
    i6,
    ip: ip
  })
});

app.listen(PORT, () => {
  console.clear();
  console.log("Server started on : ", PORT);
});
