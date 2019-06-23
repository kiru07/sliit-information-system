const Student = require("../models/Student");
const CourseController = require("../Course/Course.controller");

const StudentController = function() {
  // Update Courses List of Student
  this.updateCourseList = (id, courseId) => {
    return new Promise((resolve, reject) => {
      // Find student using id, update submission array then save.
      Student.find({ regNumber: id })
        //Student.findById(id)
        .then(student => {
          if (student) {
            student.courses.push(courseId);
            student
              .save()
              .then(() => {
                CourseController.updateStudentList(courseId, id)
                  .then(() => {
                    resolve({
                      status: 200,
                      confirmation: "Success",
                      message: "Updated Courses List"
                    });
                  })
                  .catch();
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          } else {
            reject({
              status: 404,
              confirmation: "Fail",
              message: "Student Not Found"
            });
          }
        })
        .catch(err => {
          reject({
            status: 500,
            confirmation: "Fail",
            message: "Error: " + err
          });
        });
    });
  };

  // Update submission list of Student
  this.updateSubmissionList = (id, submissionId) => {
    return new Promise((resolve, reject) => {
      // Find student using id, update submission array then save.
      Student.findById(id)
        .then(student => {
          if (student) {
            student.submissions.push(submissionId);
            student
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Submissions List"
                });
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          } else {
            reject({
              status: 404,
              confirmation: "Fail",
              message: "Student Not Found"
            });
          }
        })
        .catch(err => {
          reject({
            status: 500,
            confirmation: "Fail",
            message: "Error: " + err
          });
        });
    });
  };

  // Update notifications list of Student
  this.updateNotificationList = (id, notificationId) => {
    return new Promise((resolve, reject) => {
      // Find student using id, update notification array then save.
      Student.findById(id)
        .then(student => {
          if (student) {
            student.notifications.push(notificationId);
            student
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Notifications List"
                });
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          } else {
            reject({
              status: 404,
              confirmation: "Fail",
              message: "Student Not Found"
            });
          }
        })
        .catch(err => {
          reject({
            status: 500,
            confirmation: "Fail",
            message: "Error: " + err
          });
        });
    });
  };
};

module.exports = new StudentController();
