const config = require('config')

module.exports = function (app) {
    if(! config.get('jwtPrivateKey')){
        throw new Error('jwt key not find')
    }
}