const express = require('express')
const http = require('http')
require('dotenv').config()
require('./sequelize')
const app = express()
const SimpleController = require('./Utilities/Controller')

//create records in db
app.post('/create', async (req, res) => {
    try{
        console.log("hmmm")
        await SimpleController.createRecords()
        res.send('success')
    }catch(err){
        console.log(err)
        res.send('oops')
    }
})

//downloads records
app.get('/get', (req, res) => {
    
})

app.use(express.static(__dirname + '/public'))

app.listen(process.env.SRV_PORT, () => console.log(`Server Started on ${process.env.SRV_PORT}`));
