const express = require('express');
const routes = express.Router();
const tasksController = require('../controller/taskController');

routes.get('/task/get', async (req, res) => {
    const task = await tasksController.getTaskDetails();
    if (task) {
        res.status(200).json(task)
    } else {
        res.status(404).send("No data found")
    }
})

routes.post('/task/save', async (req, res) => {
    const task = await tasksController.saveTaskDetails(req.body);
    if (task) {
        res.status(201).json(task)
    } else {
        res.status(400).send("Task not saved")
    }

})

module.exports = routes;