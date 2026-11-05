module.exports = {
    ...require('./jwtWorker'),
    ...require('./storage'),
    ...require('./userRegistry'),
    User: require('./userSchema')
}