module.exports = {
    ...require('./asyncwrapper'),
    resourceRouter: require('./crud.routes'),
    ...require('./responseEnvelope'),
    ...require('./user.routes')
}