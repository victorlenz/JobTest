const express = require('express')
const http = require('http')
require('dotenv').config()

const app = express()

//create records in db
app.post('/create',(req, res) => {

})

//downloads records
app.get('/get', (req, res) => {
    
})

app.use(express.static(__dirname + '/public'))

app.listen(process.env.SRV_PORT, () => console.log(`Server Started on ${process.env.SRV_PORT}`));
