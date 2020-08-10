const winston = require('winston')

module.exports = function (app) {
    winston.exceptions.handle(
        new winston.transports.Console({colorize : true , prettyPrint : true}),
        new winston.transports.File({ filename: 'uncaught_exceptions.log' })
    );
    process.on('unhandledRejection', (ex) => {
    throw ex
    })
    
    winston.add(new winston.transports.File({ filename: 'logfile.log' }))
      
      // const p = Promise.reject(new Error("Failed"))
      // p.then(()=> console.log('Done'))
      
  
}