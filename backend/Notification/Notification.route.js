const express = require("express");
const router = express.Router();
const NotificationController = require("./Notification.controller");

// Insert Notification Details
// http://localhost:4000/api/notifications
router.post("/", (req, res) => {
  NotificationController.create(req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get all notifications
// http://localhost:4000/api/notifications
router.get("/", (req, res) => {
  NotificationController.getAll()
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Notification by studentId
// http://localhost:4000/api/notifications/student/:id
router.get("/student/:id", (req, res) => {
  NotificationController.getByStudentId(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Get Notification by instructorId
// http://localhost:4000/api/notifications/instructor/:id
router.get("/instructor/:id", (req, res) => {
  NotificationController.getByInstructorId(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Update Notification 'read' status
// http://localhost:4000/api/notification/:id
router.put("/:id", (req, res) => {
  NotificationController.update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

// Delete Notification
// http://localhost:4000/api/notifications/:id
router.delete("/:id", (req, res) => {
  NotificationController.deleteNotification(req.params.id)
    .then(data => {
      res.status(data.status).json(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
