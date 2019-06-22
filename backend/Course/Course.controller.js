const Course = require("../models/Course.model");
const Instructor = require("../models/Instructor");

const CourseController = function () {
  //Insert Course details
  this.create = data => {
    return new Promise((resolve, reject) => {
      let course = new Course(data);

      course
        .save()
        .then(data => {
          // Update Instructor's course list
          let instructors = data.instructors;
          let promises = [];
          // Loop through each instructor id, get the instructor and update the instructor's courses list.
          instructors.forEach(instructorId => {
            Instructor.findById(instructorId)
              .then(instructor => {
                instructor.courses.push(data._id);
                // add to promises array
                promises.push(instructor.save());
              })
              .catch(err => {
                reject({
                  status: 500,
                  confirmation: "Fail",
                  message: "Error: " + err
                });
              });
          });

          Promise.all(promises)
            .then(() => {
              resolve({
                status: 200,
                confirmation: "Success",
                message: "Course Added Successfully",
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
    });
  };

  //Get all course details
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      Course.find()
        // .populate({ path: "students", model: "Student" })
        // .populate({ path: "instructors", model: "Instructor" })
        .populate({ path: "assignments", model: "Assignment" })
        .populate({ path: "exams", model: "Exam" })
        .then(courses => {
          resolve({ status: 200, confirmation: "Success", data: courses });
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

  //Get course using id
  this.get = id => {
    return new Promise((resolve, reject) => {
      Course.findById(id)
        // .populate({ path: "students", model: "Student" })
        // .populate({ path: "instructors", model: "Instructor" })
        .populate({ path: "assignments", model: "Assignment" })
        .populate({ path: "exams", model: "Exam" })
        .then(course => {
          course
            ? resolve({ status: 200, confirmation: "Success", data: course })
            : reject({
              status: 404,
              confirmation: "Fail",
              message: "Course Not Found"
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

  // Update Course code,name,available
  this.update = (id, data) => {
    return new Promise((resolve, reject) => {
      delete data._id;
      Course.findByIdAndUpdate(id, data, { useFindAndModify: false }).then(
        course => {
          course
            ? resolve({
              status: 200,
              confirmation: "Success",
              data: course
            })
            : reject({
              status: 404,
              confirmation: "Fail",
              message: "Course Not Found"
            });
        }
      );
    });
  };

  // Update Course instructor list
  this.updateInstructorList = (id, instructorId) => {
    return new Promise((resolve, reject) => {
      // Find Course using id, update instructors array then save.
      Course.findById(id)
        .then(course => {
          if (course) {
            course.instructors.push(instructorId);
            course
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Instructor List"
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
              message: "Course Not Found"
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

  // Update StudentsList
  this.updateStudentList = (id, studentId) => {
    return new Promise((resolve, reject) => {
      // Find Course using id, update students array then save.
      Course.findById(id)
        .then(course => {
          if (course) {
            course.students.push(studentId);
            course
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Student List"
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
              message: "Course Not Found"
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

  // Update Exams List
  this.updateExamList = (id, examId) => {
    return new Promise((resolve, reject) => {
      // Find Course using id, update exams array then save.
      Course.findById(id)
        .then(course => {
          if (course) {
            course.exams.push(examId);
            course
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Exams List"
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
              message: "Course Not Found"
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

  // Update Assignments List
  this.updateAssignmentList = (id, assignmentId) => {
    return new Promise((resolve, reject) => {
      // Find Course using id, update assignments array then save.
      Course.findById(id)
        .then(course => {
          if (course) {
            course.assignments.push(assignmentId);
            course
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Assignment List"
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
              message: "Course Not Found"
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

  //Delete Course details
  this.deleteCourse = id => {
    return new Promise((resolve, reject) => {
      Course.findByIdAndRemove(id, { useFindAndModify: false })
        .then(deletedCourse => {
          deletedCourse
            ? resolve({
              status: 200,
              confirmation: "Success",
              message: "Successfully deleted Course"
            })
            : reject({
              status: 404,
              confirmation: "Fail",
              message: "Course Not Found"
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


  // Update Course accepted instructors list
  this.updateAcceptedInstructorList = (id, instructorId) => {
    return new Promise((resolve, reject) => {
      // Find Course using id, update instructors array then save.
      Course.findById(id)
        .then(course => {
          if (course) {
            course.acceptedInstructors.push(instructorId);
            course.available = true;
            course
              .save()
              .then(() => {
                resolve({
                  status: 200,
                  confirmation: "Success",
                  message: "Updated Instructor List"
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
              message: "Course Not Found"
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
}
module.exports = new CourseController();
