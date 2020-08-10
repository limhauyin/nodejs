const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('connect to db'))
.catch (err => console.log('cant connect'))


const courseSchema = new mongoose.Schema({
    name : String ,
    author : String,
    Tag : [ String ],
    date : { type : Date, default : Date.now},
    isPublished : Boolean,
    price : Number
})

const Course = mongoose.model('Course', courseSchema); 
// async function createCourse() {
//     const course = new Course( {
//         name : 'course 1',
//         author : 'author 1',
//         Tag : [ 'node', 'backend'],
//         isPublished : true
//     })
//     const result = await course.save();
//     console.log(result)
// }

async function getCourses() {
    const pageNumber  = 2 ;
    const pageSize   = 1 ;
    const courses = await Course
        // .find({author : 'author 1'})
        .find({author : /^Mosh/})
        .skip(((pageNumber - 1 ) * pageSize))
        .select({name : 1})
        // .count()
    console.log(courses)
}
getCourses()
