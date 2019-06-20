const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ExamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: ObjectId,
    ref: "Course",
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  submissions: [
    {
      type: ObjectId,
      ref: "Submission"
    }
  ]
});

module.exports = mongoose.model("Exam", ExamSchema);
