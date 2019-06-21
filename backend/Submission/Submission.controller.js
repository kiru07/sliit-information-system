const Submission = require("../models/Submission.model");
const AssignmentController = require("../Assignment/Assignment.controller");
const ExamController = require("../Exam/Exam.controller");

const SubmissionController = function() {
  //Insert Submission details
  this.create = data => {
    return new Promise((resolve, reject) => {
      let submission = new Submission(data);
      if (data.assignmentId || data.examId) {
        submission
          .save()
          .then(data => {
            if (data.assignmentId) {
              // assignment submission
              AssignmentController.updateSubmissionList(
                data.assignmentId,
                data._id
              )
                .then(() => {
                  resolve({
                    status: 200,
                    confirmation: "Success",
                    message: "Submission Added Successfully",
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
            } else {
              // exam submission
              ExamController.updateSubmissionList(data.examId, data._id)
                .then(() => {
                  resolve({
                    status: 200,
                    confirmation: "Success",
                    message: "Submission Added Successfully",
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
            }
          })
          .catch(err => {
            reject({
              status: 500,
              confirmation: "Fail",
              message: "Error: " + err
            });
          });
      } else {
        // examId or assignmentId not present
        reject({
          status: 400,
          confirmation: "Fail",
          message: "Error: ExamId Or AssignmentId required"
        });
      }
    });
  };

  // Get all submissions
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      Submission.find()
        // .populate({ path: "studentId", model: "Student" })
        .then(submissions => {
          resolve({ status: 200, confirmation: "Success", data: submissions });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Get submission using id
  this.get = id => {
    return new Promise((resolve, reject) => {
      Submission.findById(id)
        // .populate({ path: "studentId", model: "Student" })
        .then(submission => {
          submission
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: submission
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Submission Not Found"
              });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Update submission
  this.update = (id, data) => {
    return new Promise((resolve, reject) => {
      delete data._id;
      Submission.findByIdAndUpdate(id, data, { useFindAndModify: false }).then(
        submission => {
          submission
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: submission
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Submission Not Found"
              });
        }
      );
    });
  };

  // Delete submission
  this.deleteSubmission = id => {
    return new Promise((resolve, reject) => {
      Submission.findByIdAndRemove(id, { useFindAndModify: false })
        .then(deletedSubmission => {
          deletedSubmission
            ? resolve({
                status: 200,
                confirmation: "Success",
                message: "Successfully deleted Submission"
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Submission Not Found"
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

module.exports = new SubmissionController();
