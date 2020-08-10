const mongoose = require('mongoose')
const { callbackify } = require('util')

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('connect to db'))
.catch (err => console.log('cant connect'))


const courseSchema = new mongoose.Schema({
    name : {
        type: String ,
        required : true ,
        minlength : 5 ,
        maxlength : 25
    } ,
    category: { 
        type: String , 
        required  : true,
        enum : ['web', 'mobile', 'network'], // only can select in this 3 
        lowercase : true
    },
    author : String,
    Tag : {
        type : Array,
        validate : {
            isAsync : true ,
            validator : function (v,callback) { 
                setTimeout(() => { 
                    const result = v && v.length > 0
                    callback(result)
                }, 4000)
            }, 
            message : 'A course should have at least one tag'
        }
    },
    date : { type : Date, default : Date.now},
    isPublished : Boolean,
    price : { 
        type : Number ,
        required : function () { return this.isPublished},
        
    }
})

const Course = mongoose.model('Course', courseSchema); 
async function createCourse() {
    const course = new Course( {
        name : 'course 1',
        category : '-',
        author : 'author 1',
        // Tag : ['node', 'backend'],
        isPublished : true,
        price : 5
    })
    try { 
        const result = await course.save();
        console.log(result)
    } catch (ex){ 
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
  
}

async function getCourses() {
    const pageNumber  = 2 ;
    const pageSize   = 1 ;
    const courses = await Course
        // .find({author : 'author 1'})
        .find({author : /^author/})
        .skip(((pageNumber - 1 ) * pageSize))
        // .select({name : 1})
        .count()
    console.log(courses)
}
// getCourses()


async function UpdateCourses(id) {
    const course = await Course.update({_id : id},{
        $set : { 
            auther : 'HY', 
            isPublished : false 
        }
    })
    console.log(course)

}

// UpdateCourses('5f043be31a887be23aa8646d')

async function removeCourse(id) {
    const course = await Course.deleteOne({_id : id})
    console.log(course)

}
// removeCourse('5f043be31a887be23aa8646d')
createCourse()
