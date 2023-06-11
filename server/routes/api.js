const express = require('express');
const Task = require('../models/task.js');

const router = express.Router();

router.get('/', (req, res) => {
    Task.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data)
    })
    .catch((error) => {
        res.send('Error: ', error)
    })
})

router.put('/:_id', (req, res) => {
    const _id = req.params._id;
    const completed = req.body.completed;
    Task.findByIdAndUpdate({_id}, {completed: completed}, {new: true}) 
        .then((doc) => {
            res.json(doc)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
})

router.post('/save', (req, res) => {
    const data = req.body;
    const newTask = new Task(data);
    newTask.save()
    .then(() => {
        res.status(201).json(newTask)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).json({error: "Internal Service Error"})
    })
})

router.delete('/:_id', (req, res) => {
    const _id = req.params._id;
    Task.findByIdAndDelete({ _id: _id })
    .then((doc) => {
        res.json(doc)
    })
    .catch((error) => {
        console.log("error: ", error)
    })
})

module.exports = router
