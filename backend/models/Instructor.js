const mongoose = require('mongoose')
const schema = mongoose.Schema


var Instructor = new schema({
    regId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    courses:[{
        type:schema.Types.ObjectId,
        ref: 'Course'
    }]
})

module.exports = mongoose.model('instructor',Instructor)