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
                console.log("incoming data")
              NameTable.bulkCreate(data.generate().map(e => ({name:e})))
              .catch(err => {
                  reject(err)
              })
            })
            
            namesGen.on('finish', () => {
                resolve()
            })

         })
        
    }

    async downloadRecords(){}
}

module.exports = new SimpleController()