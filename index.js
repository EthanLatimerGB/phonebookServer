//dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const { json } = require('express')

//Parsers and Tokens
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('build'))

//Other Functions 
const GenerateID = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0

    return maxId +1
}

//WebApp Requests
app.get('/info', (request, response)=>{
    response.send(`<h1>PhoneBook has information for ${Person.collection.length(response => response.toJSON())} people</h1>
    <p>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
        response.json(person)
    }).catch(error => {
        console.log(error.name)
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next)=> {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(request.body)   
    
    if(!body.name){
        return response.status(400).json({
            error: 'Name missing'
        })
    }else if(!body.number){
        return response.status(400).jsoon({
            error: 'Number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save()
    .then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
})

morgan.token('type', (request, response) => {
    request.headers['content-type']
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error: "Malformed ID"})
    }
    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

