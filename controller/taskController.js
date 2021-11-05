const projects = require('../models/project');
const members = require('../models/members');
const tasks = require('../models/task');
const mongoose = require('mongoose');

async function getTaskDetails() {
    try {
        const taskDetails = await task.find();
        return taskDetails
    } catch (err) {
        return err
    }
}

async function saveTaskDetails(input) {
    try {
        const newTask = new tasks({
            title: input.title,
            description: input.description,
            assignedBy: input.assignedBy,
            assignedTo: input.assignedTo,
            createdAt: input.createdAt,
            estimationTime: input.estimationTime,
            type: input.type,
            priority: input.priority,
            status: input.status
        })
            const TaskDetails = await newTask.save()
            return TaskDetails
    } catch (err) {
        return err
    }
}
module.exports = { getTaskDetails , saveTaskDetails}