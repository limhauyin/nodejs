const express = require('express')
const router = express.Router();


const courses = [
    {
        id : 1 ,
        name : 'course1',
    },
    {
        id : 2 ,
        name : 'course2',
    },
    {
        id : 3,
        name : 'course3',
    }
]

router.get('/', (req,res) => {
    res.send(req)
})
// get id 
router.get('/:id', (req,res) => {
    res.send(courses.find(c => c.id == req.params.id) ? courses.find(c => c.id == req.params.id) : 'error 404')
})

// post  id 
router.post('/', (req,res) => {
    const schema = {
        id : Joi.number().integer().required(),
        name : Joi.string().required(),
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }


    const course = {
        id : req.body.id,
        name : req.body.name,
    }
    courses.push(course)
    res.send(course)
})

router.put('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        res.send('error 404')
    }

    const schema = {
        name : Joi.string().required(),
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    course.name = req.body.name
    res.send(course)
})
// delete 
router.delete('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
       return res.send('error 404')
    }
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})

module.exports = router