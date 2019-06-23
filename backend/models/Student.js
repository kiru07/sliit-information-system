const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Student = new Schema({
  regNumber: {
    type: String,
    length: 10,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  semester: {
    type: String
  },
  courses: [
    {
      type: ObjectId,
      ref: "Course"
    }
  ],
  submissions: [
    {
      type: ObjectId,
      ref: "Submission"
    }
  ],
  notifications: [
    {
      type: ObjectId,
      ref: "Notification"
    }
  ]
});

module.exports = mongoose.model("student", Student);
