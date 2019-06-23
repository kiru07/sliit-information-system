const Notification = require("../models/Notification.model");
const Instructor = require("../models/Instructor");
const Student = require("../models/Student");
const StudentController = require("../student/StudentController");

const NotificationController = function() {
  //Insert new Notification
  this.create = data => {
    return new Promise((resolve, reject) => {
      let notification = new Notification(data);

      notification
        .save()
        .then(data => {
          // Check if notification is for instructor/student and update accordingly (if neither instructor/student id is available, courseId should be present <- meant for all students)
          if (data.instructorId) {
            // Update Instructor's notifications list
            let instructorId = data.instructorId;
            Instructor.findById(instructorId)
              .then(instructor => {
                instructor.notifications.push(data._id);
                instructor
                  .save()
                  .then(() => {
                    resolve({
                      status: 200,
                      confirmation: "Success",
                      data: data
                    });
                  })
                  .catch(err => {
                    reject({
                      status: 500,
                      confirmation: "Fail",
                      message: "Error: " + err
                    });
                  });
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          } else if (data.studentId) {
            StudentController.updateNotificationList(data.studentId, data._id)
              .then(() => {
                resolve({ status: 200, confirmation: "Success", data: data });
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          } else if (data.courseId) {
            // To store all updateNotificationList promises
            let promises = [];
            // Fetch all students and check if they are assigned to the course. Then update each students notification list.
            Student.find()
              .then(students => {
                students.forEach(student => {
                  // If student contains courseId update his/her notification list
                  if (student.courses.includes(data.courseId)) {
                    let studentId = student._id;
                    promises.push(
                      StudentController.updateNotificationList(
                        studentId,
                        data._id
                      )
                    );
                  }
                });
                // Once iterations are complete, resolve all promises together
                Promise.all(promises)
                  .then(() => {
                    resolve({
                      status: 200,
                      confirmation: "Success",
                      message: "Notifications Sent Successfully",
                      data: data
                    });
                  })
                  .catch(err => {
                    reject({
                      status: 500,
                      confirmation: "Fail",
                      message: "Error: " + err
                    });
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
              status: 400,
              confirmation: "Fail",
              message:
                "Invalid request(need studentId/instructorId/courseId): " + err
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

  //Get all notification details
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      Notification.find()
        .then(notifications => {
          resolve({
            status: 200,
            confirmation: "Success",
            data: notifications
          });
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

  //Get notifications using student id
  this.getByStudentId = studentId => {
    return new Promise((resolve, reject) => {
      Notification.find({ studentId: studentId })
        .then(notifications => {
          notifications
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: notifications
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Notification Not Found"
              });
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

  //Get notifications using instructor id
  this.getByInstructorId = instructorId => {
    return new Promise((resolve, reject) => {
      Notification.find({ instructorId: instructorId })
        .then(notifications => {
          notifications
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: notifications
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Notification Not Found"
              });
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

  // Update Notification 'read' status
  this.update = (id, data) => {
    return new Promise((resolve, reject) => {
      delete data._id;
      Notification.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
        new: true
      }).then(course => {
        course
          ? resolve({
              status: 200,
              confirmation: "Success",
              data: course
            })
          : reject({
              status: 404,
              confirmation: "Fail",
              message: "Notification Not Found"
            });
      });
    });
  };

  //Delete Notification details
  this.deleteNotification = id => {
    return new Promise((resolve, reject) => {
      Notification.findByIdAndRemove(id, { useFindAndModify: false })
        .then(deletedNotification => {
          deletedNotification
            ? resolve({
                status: 200,
                confirmation: "Success",
                message: "Successfully deleted Notification"
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Notification Not Found"
              });
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

module.exports = new NotificationController();
