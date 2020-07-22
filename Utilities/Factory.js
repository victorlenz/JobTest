
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const EventEmitter = require('events')
class Factory extends EventEmitter{
   
    constructor(count){
        this.count=count
    }

    generate(){
        let elements=[]
        let iteration=0
        while(iteration!==this.count){
            elements.push(uniqueNamesGenerator({
                dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
                length: 2
              }))
              iteration++
              
              if(iteration === 1000){
                return this.emit('data', elements.splice() )
             }
             elements=[]
        }

        this.emit('finish')
    }
}

module.exports = Factory