const Exam = require("../models/Exam.model");
const CourseController = require("../Course/Course.controller");

const ExamController = function() {
  // Insert Exam details
  this.create = data => {
    return new Promise((resolve, reject) => {
      let exam = new Exam({
        name: data.name,
        course: data.course,
        dueDate: data.dueDate,
        examFileUrl: data.examFileUrl,
        examLink: data.examLink
      });
      exam
        .save()
        .then(newExam => {
          // Update exam list in Courses document
          CourseController.updateExamList(newExam.course, newExam._id)
            .then(() => {
              resolve({
                status: 200,
                confirmation: "Success",
                message: "Exam saved successfully",
                data: newExam
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

  // Get all exams
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      Exam.find()
        .populate({ path: "course", select: "code name", model: "Course" }) // project(returns) only code, name properties of Course
        .populate({ path: "submissions", model: "Submission" })
        .then(exams => {
          resolve({ status: 200, confirmation: "Success", data: exams });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Get exam using id
  this.get = id => {
    return new Promise((resolve, reject) => {
      Exam.findById(id)
        .populate({ path: "course", model: "Course" })
        // .populate({ path: "submissions", model: "Submission" })
        .then(exam => {
          exam
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: exam
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Exam Not Found"
              });
        })
        .catch(err => {
          reject({ status: 500, confirmation: "Fail", message: "Error" + err });
        });
    });
  };

  // Update exam
  this.update = (id, data) => {
    return new Promise((resolve, reject) => {
      delete data._id;
      Exam.findByIdAndUpdate(id, data, { useFindAndModify: false }).then(
        exam => {
          exam
            ? resolve({
                status: 200,
                confirmation: "Success",
                data: exam
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Exam Not Found"
              });
        }
      );
    });
  };

  // Update submission list of exam
  this.updateSubmissionList = (id, submissionId) => {
    return new Promise((resolve, reject) => {
      // Find exam using id, update submission array then save.
      Exam.findById(id)
        .then(exam => {
          if (exam) {
            exam.submissions.push(submissionId);
            exam
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
              message: "Exam Not Found"
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

  // Delete exam
  this.deleteExam = id => {
    return new Promise((resolve, reject) => {
      Exam.findByIdAndRemove(id, { useFindAndModify: false })
        .then(deletedExam => {
          deletedExam
            ? resolve({
                status: 200,
                confirmation: "Success",
                message: "Successfully deleted Exam"
              })
            : reject({
                status: 404,
                confirmation: "Fail",
                message: "Exam Not Found"
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

module.exports = new ExamController();
