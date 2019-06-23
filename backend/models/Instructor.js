const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Instructor = new schema({
  regId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  courses: [
    {
      type: schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  notifications: [
    {
      type: schema.Types.ObjectId,
      ref: "Notification"
    }
  ]
});

module.exports = mongoose.model("instructor", Instructor);
