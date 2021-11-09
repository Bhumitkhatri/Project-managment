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

routes.get('/task/data', async (req, res) => {
    const task = await tasksController.getTaskData();
    if (task){
        res.status(200).json(task)
    } else{
        res.status(400).send("No data found")
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

routes.patch('/task/update/:_id', async (req, res) => {
    const task = await tasksController.updateTaskDetails(req.body, req.params.id);
    if (task){
        res.status(200).json(task)
    } else {
        res.status(400). send("task not updated")
    }
})

routes.delete('/task/delete/:_id', async (req, res) =>{
    const task = await taskController.deleteTaskDetails(req.params.id);
    if (task){
        res.status(200).json(task)
    }
    else {
        res.status(404).send("task not found")
    }
})
module.exports = routes;