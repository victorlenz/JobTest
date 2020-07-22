
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const EventEmitter = require('events')
class Factory extends EventEmitter{
   
    constructor(count){
        super()
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
              if(iteration%1000 == 0){
                const copy = JSON.parse(JSON.stringify(elements))
                this.emit('data', copy)
                elements=[]
             }
             iteration++
        }
        //emit left outs
        this.emit('data', elements)
        this.emit('finish')
    }
}

module.exports = Factory