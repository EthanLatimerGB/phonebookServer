const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send( { error: 'Malformed ID' } )
    }
    next(error)
}

module.exports = errorHandler, unknownEndpoint