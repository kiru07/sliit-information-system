const express = require("express");
const router = express.Router();
const SubmissionController = require("./Submission.controller");

// Insert Submission Details
// http://localhost:4000/api/submissions
router.post("/", (req, res) => {
  SubmissionController.create(req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get All Submission Details
// http://localhost:4000/api/submissions
router.get("/", (req, res) => {
  SubmissionController.getAll()
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Submission by id
// http://localhost:4000/api/submissions/:id
router.get("/:id", (req, res) => {
  SubmissionController.get(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

//Update Submission
// http://localhost:4000/api/submissions/:id
router.put("/:id", (req, res) => {
  SubmissionController.update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Delete Submission
// http://localhost:4000/api/submissions/:id
router.delete("/:id", (req, res) => {
  SubmissionController.deleteSubmission(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
