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
app.get('/download', async (req, res) => {
    SimpleController.setDownloadHeaders(res)
    
    //send response in chunks
    let page = 1
    const chunkLength = 10000

    // db.getAll(limit,offset)
    const content = await SimpleController.getRecords(1) // {count:1000343, rows:[]}
    // {count:1000343, rows:[]}

    let total = 0

    // total loops we need
    const totalPages = parseInt(content.count / chunkLength)
    console.log('total pages: ', totalPages)

    const leftouts = content.count % chunkLength

    // send first bytes as bracket as we want to send array of objects: [ {},{}]
    //res.write('[') // array starting bracket
    try {
      while (true) {
        const offset = (page - 1) * chunkLength
        let limit = chunkLength

        // if its the last page, then no limit spit the all the remaining data you have
        if (page === totalPages) {
          limit = null
        }

        const content = await SimpleController.getRecords(limit, offset) // {count:1000343, rows:[]}

        let str = JSON.stringify(content.rows)
        let parsed = JSON.parse(str)
        let csv =  parsed.reduce((acc, curr) => {
            //get single object value
            let row = Object.values(curr)
            //join them with comma and put them together as string 
            acc.push(row.join(','))
            return acc
        }, [])

        csv = csv.join('\n')
        
        res.write(csv)
        // its the last page so we do not put "," at the end as: [.....{},{}
        if (page === totalPages) {
          break
        }

        res.flush()
        total += chunkLength
        page++
      }
      // send the null byte
      res.end()
    } catch (err) {
      console.error(err)
      console.log('ending with error')
      return res.end()
    }

})

app.use(express.static(__dirname + '/public'))

app.listen(process.env.SRV_PORT, () => console.log(`Server Started on ${process.env.SRV_PORT}`));
