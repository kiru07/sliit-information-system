const express = require("express");
const router = express.Router();
const ExamController = require("./Exam.controller");

// Insert Exam Details
// http://localhost:4000/api/exams
router.post("/", (req, res) => {
  ExamController.create(req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get All Exam Details
// http://localhost:4000/api/exams
router.get("/", (req, res) => {
  ExamController.getAll()
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Exam by id
// http://localhost:4000/api/exams/:id
router.get("/:id", (req, res) => {
  ExamController.get(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Update Exam information (except submission list)
// http://localhost:4000/api/exams/:id
router.put("/:id", (req, res) => {
  ExamController.update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Delete Exam
// http://localhost:4000/api/exams/:id
router.delete("/:id", (req, res) => {
  ExamController.deleteExam(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
