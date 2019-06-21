const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Course = 
const Student = new Schema({
    regNumber : {
        type : String,
        length : 10,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : String,    
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    address : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    assignments : [{
         type : Array,
        
    }],
    courses : [{
        // type : Schema.types.ObjectId,
      //  ref : Course
    }],
    exams : [{
        //type : Schema.types.ObjectId,
        //ref : Exams
    }],
})

module.exports = mongoose.model('student',Student)
