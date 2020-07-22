const Factory = require('./Factory')
const DB = require('../sequelize')
const NameTable = DB.names

class SimpleController {
    constructor(){}

     createRecords(){
         return new Promise((resolve, reject) => {
            const namesGen = new Factory(1000000)
            namesGen.on('data', (data = []) => {
              NameTable.bulkCreate(data.map(e => ({name:e})))
              .catch(err => {
                  reject(err)
              })
            })
            
            namesGen.on('finish', () => {
                resolve()
            })

            namesGen.generate()

         })
        
    }

    async downloadRecords(){

    }

    setDownloadHeaders(res){
        // set header as JSON
        res.statusCode = 200
        res.setHeader('Content-type', 'text/csv')
        
        res.setHeader('Access-Control-Allow-Origin', '*')

        // Header to force download
        res.setHeader('Content-disposition', 'attachment; filename=data.json')
        
        //to close the connection automatically
        res.set('Connection', 'close')
    }

    getRecords(limit=10, offset=0){
        return NameTable.findAndCountAll({limit,offset})
    }
}

module.exports = new SimpleController()