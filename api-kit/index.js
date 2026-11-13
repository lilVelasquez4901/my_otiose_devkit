module.exports = {
    asyncWrapper: require('./asyncWrapper'),
    resourceRouter: require('./crud.routes'),
    ...require('./responseEnvelope'),
    ...require('./user.routes')
}