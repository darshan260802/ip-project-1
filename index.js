const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    const ip = req.socket.remoteAddress;
    res.json({
        yourIP: ip
    })
})

app.listen(PORT, () => {
    console.log("Server started on port :", PORT);
})