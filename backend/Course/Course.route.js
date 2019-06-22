const express = require("express");
const router = express.Router();
const CourseController = require("./Course.controller");

// Insert Course Details
// http://localhost:4000/api/courses
router.post("/", (req, res) => {
  CourseController.create(req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get All Course Details
// http://localhost:4000/api/courses
router.get("/", (req, res) => {
  CourseController.getAll()
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Course by id
// http://localhost:4000/api/courses/:id
router.get("/:id", (req, res) => {
  CourseController.get(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Update Course information (except submission list)
// http://localhost:4000/api/courses/:id
router.put("/:id", (req, res) => {
  CourseController.update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Delete Course
// http://localhost:4000/api/courses/:id
router.delete("/:id", (req, res) => {
  CourseController.deleteCourse(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Update Course's accepted instructors list
// http://localhost:4000/api/courses/:id/acceptedInstructors/:instructorId
router.put("/:id/acceptedInstructors/:instructorId", (req, res) => {
  CourseController.updateAcceptedInstructorList(req.params.id, req.params.instructorId)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
