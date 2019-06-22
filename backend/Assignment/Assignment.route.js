const express = require("express");
const router = express.Router();
const AssignmentController = require("./Assignment.controller");

// Insert Assignment Details
// http://localhost:4000/api/assignments
router.post("/", (req, res) => {
  AssignmentController.create(req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get All Assignment Details
// http://localhost:4000/api/assignments
router.get("/", (req, res) => {
  AssignmentController.getAll()
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Assignment by id
// http://localhost:4000/api/assignments/:id
router.get("/:id", (req, res) => {
  AssignmentController.get(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Update Assignment information (except submission list)
// http://localhost:4000/api/assignments/:id
router.put("/:id", (req, res) => {
  AssignmentController.update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Delete Assignment
// http://localhost:4000/api/assignments/:id
router.delete("/:id", (req, res) => {
  AssignmentController.deleteAssignment(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
