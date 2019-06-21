const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CourseSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  },
  instructors: [
    {
      type: ObjectId,
      ref: "Instructor"
    }
  ],
  students: [
    {
      type: ObjectId,
      ref: "Student"
    }
  ],
  assignments: [
    {
      type: ObjectId,
      ref: "Assignment"
    }
  ],
  exams: [
    {
      type: ObjectId,
      ref: "Exam"
    }
  ]
});

module.exports = mongoose.model("Course", CourseSchema);
