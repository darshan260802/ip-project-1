const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const publicIP = (req.headers['x-forwarded-for'] ?? "").split(',')[0];
  
  if(!publicIP){
    res.status(400).json({error: {message: "IP NOT FOUND !!!"}});
    return;
  }
  res.status(200).json({IP: publicIP})
});

app.listen(PORT, () => {
  console.clear();
  console.log("Server started on : ", PORT);
});
