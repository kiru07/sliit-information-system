const Assignment = require("../models/Assignment.model");
const CourseController = require("../Course/Course.controller");

const AssignmentController = function() {
  // Insert Assignment details
  this.create = data => {
    return new Promise((resolve, reject) => {
      let assignment = new Assignment({
        name: data.name,
        course: data.course,
        dueDate: data.dueDate,
        assignmentFileUrl: data.assignmentFileUrl
      });
      assignment
        .save()
        .then(newAssignment => {
          // Update assignment list in Courses document
          CourseController.updateAssignmentList(
            newAssignment.course,
            newAssignment._id
          )
            .then(() => {
              resolve({
                status: 200,
                confirmation: "Success",
                message: "Assignment saved successfully",
                data: newAssignment
              });
            })
            .catch(err => {
              reject({
                status: 500,
                confirmation: "Fail",
                message: "Error" + err
              });
            });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Get all assignments
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      Assignment.find()
        .populate({ path: "course", select: "code name", model: "Course" }) // project(returns) only code, name properties of Course
        .populate({ path: "submissions", model: "Submission" })
        .then(assignments => {
          resolve({ status: 200, confirmation: "Success", data: assignments });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Get assignment using id
  this.get = id => {
    return new Promise((resolve, reject) => {
      Assignment.findById(id)
        .populate({ path: "course", model: "Course" })
        // .populate({ path: "submissions", model: "Submission" })
        .then(assignment => {
          assignment
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: assignment
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Assignment Not Found"
              });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Update assignment
  this.update = (id, data) => {
    return new Promise((resolve, reject) => {
      delete data._id;
      Assignment.findByIdAndUpdate(id, data, { useFindAndModify: false }).then(
        assignment => {
          assignment
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: assignment
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Assignment Not Found"
              });
        }
      );
    });
  };

  // Update submission list of assignment
  this.updateSubmissionList = (id, submissionId) => {
    return new Promise((resolve, reject) => {
      // Find assignment using id, update submission array then save.
      Assignment.findById(id)
        .then(assignment => {
          if (assignment) {
            assignment.submissions.push(submissionId);
            assignment
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
              message: "Assignment Not Found"
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

  // Delete assignment
  this.deleteAssignment = id => {
    return new Promise((resolve, reject) => {
      Assignment.findByIdAndRemove(id, { useFindAndModify: false })
        .then(deletedAssignment => {
          deletedAssignment
            ? resolve({
                status: 200,
                confirmation: "Success",
                message: "Successfully deleted Assignment"
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Assignment Not Found"
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

module.exports = new AssignmentController();
