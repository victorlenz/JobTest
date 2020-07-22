const Factory = require('./Factory')
const DB = require('../sequelize')
const NameTable = DB.names

class SimpleController {
    constructor(){}

     createRecords(){
        console.log("working")

         return new Promise((resolve, reject) => {
            const namesGen = new Factory(1000000)
            namesGen.on('data', (data = []) => {
                console.log("incoming data", data.length)
              NameTable.bulkCreate(data.map(e => ({name:e})))
              .catch(err => {
                  reject(err)
              })
            })
            
            namesGen.on('finish', () => {
                console.log('finish')
                resolve()
            })

            namesGen.generate()

         })
        
    }

    async downloadRecords(){}
}

module.exports = new SimpleController()