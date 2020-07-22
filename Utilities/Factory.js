
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

class Factory {
   
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
        }
        return elements
    }
}