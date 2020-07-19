const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useCreateIndex', true)

const url = process.env.MONGOURL

console.log('Connecting to MongoDB address at: ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( console.log('Successfully connected to MongoDB server') )
    .catch(error => {
        console.log('Failed to connect to MongoDB server: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        minlength: 7,
        required: true,
        unique: true,
    },
    id: Number,
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)