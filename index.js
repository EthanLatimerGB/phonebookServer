//dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

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

const CheckForUniqueName = (body) => {
    Person.find({name: body.name}).then(result => {
        if(!result){
            return false
        }else{
            return true
        }
    })
    
}

//WebApp Requests
app.get('/info', (request, response)=>{
    response.send(`<h1>PhoneBook has information for ${persons.length} people</h1>
    <p>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
        response.json(person)
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response)=> {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
    }else if(CheckForUniqueName(body)){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
      })
    
    person.save().then(savedNote => {
        response.json(savedNote)
    })
})

morgan.token('type', (request, response) => {
    request.headers['content-type']
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

