const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: new Date()
  },
  instructorId: {
    // to which instructor this notification is sent
    type: ObjectId,
    ref: "Instructor"
  },
  studentId: {
    // OR to which student this notification is sent
    type: ObjectId,
    ref: "Student"
  },
  courseId: {
    type: ObjectId,
    ref: "Course"
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
