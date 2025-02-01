const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const ipify = require('ipify');
const { publicIpv4, publicIp, publicIpv6 } = require("public-ip");

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const publicIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Ensure the IP is public
  const isPublicIP = (ip) => {
    const privateRanges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^127\./,
      /^::1$/,
      /^fc00:/,
      /^fe80:/
    ];
    return !privateRanges.some((range) => range.test(ip));
  };

  if (isPublicIP(publicIP)) {
    res.json({ publicIP });
  } else {
    res.status(400).json({ error: "Could not determine public IP address" });
  }
});

app.listen(PORT, () => {
  console.clear();
  console.log("Server started on : ", PORT);
});
