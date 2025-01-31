const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const {publicIpv4} = require('public-ip');

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    const ip = req.socket.remoteAddress;
    const pubIp = await publicIpv4();
    res.json({
        yourIP: ip,
        yourPublicIp: pubIp
    })
})

app.listen(PORT, () => {
    console.log("Server started on port :", PORT);
})