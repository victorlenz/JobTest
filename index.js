const express = require('express')
const http = require('http')
require('dotenv').config()

const app = express()
app.use(express.static(__dirname + '/public'))

app.listen(process.env.SRV_PORT, () => console.log(`Server Started on ${process.env.SRV_PORT}`));
