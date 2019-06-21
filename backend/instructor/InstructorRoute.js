const express = require('express')
const router = express.Router()
const Instructor = require('../models/Instructor')

// Add an Instructor details using POST method
// http://localhost:4000/api/instructor/add & Request Body
router.post('/add', (req,res) => {
    const instructor = new Instructor(req.body);
    instructor.save()
        .then(() => res.status(200).send({"message":"Successfully added instructor"}))
        .catch((err) => res.status(400).send({"message":err}))
});

// Get instructors details using GET method
// http://localhost:4000/api/instructor/get
router.get('/get', (req,res) => {
    Instructor.find()
        .then((instructor) => res.status(200).send({"message":"Successfully retrived","data":instructor}))
        .catch((err) => res.status(400).send({"message":err}))
});

// Get an instructor details using GET method
// http://localhost:4000/api/instructor/get/ + id
router.get('/get/:id', (req,res) => {
    Instructor.findById(req.params.id)
        .then((instructor) => res.status(200).send({"message":"Successfully retrived","data":instructor}))
        .catch((err) => res.status(400).send({"message":err}))
});

// Update an instructor details using PUT method
// http://localhost:4000/api/instructor/update + id
router.put('/update/:id', (req,res) => {
    Instructor.updateOne({'_id':req.params.id},req.body)
        .then((instructor) => res.status(200).send({"message":"Successfully updated","data":instructor}))
        .catch((err) => res.status(400).send({"message":err}))
});

// Delete an instructor details using DELETE method
// http://localhost:4000/api/instructor/delete + id
router.delete('/delete/:id', (req,res) => {
    Instructor.deleteOne({'_id':req.params.id})
        .then((instructor) => res.status(200).send({"message":"Successfully deleted","data":instructor}))
        .catch((err) => res.status(400).send({"message":err}))
})

module.exports = router;