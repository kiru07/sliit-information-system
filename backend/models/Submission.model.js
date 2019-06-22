const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubmissionSchema = new Schema({
  studentId: {
    type: ObjectId,
    ref: "Student"
  },
  fileUrl: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date,
    required: true
  },
  marks: {
    type: Number
  },
  examId: {
    type: ObjectId,
    ref: "Exam"
  },
  assignmentId: {
    type: ObjectId,
    ref: "Assignment"
  }
});

module.exports = mongoose.model("Submission", SubmissionSchema);
