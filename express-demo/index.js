const config = require('config')
const express = require('express')
const Joi = require('joi')
const morgan = require('morgan')
const app = express()
const helmet = require('helmet')
const Debug = require('debug')('app:startup')
const courses = require('./routes/courses')
const home = require('./routes/home')
const logger = require('./middleware/logger')
app.set('view engine', 'pug');
app.set('views', './views') 

// port env var 
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

if(app.get('env') === 'development') { 
    app.use(morgan('tiny'))
    Debug('use morgan')
}
 
app.listen(port,()=> console.log(`listening on port ${port}`))
