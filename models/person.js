const mongoose = require('mongoose')

const url = process.env.MONGOURL

console.log('Connecting to MongoDB address at: ', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log('Successfully connected to MongoDB server')
})
.catch(error => {
    console.log('Failed to connect to MongoDB server: ', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)