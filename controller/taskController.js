const tasks = require('../models/task');
const projects = require('../models/project');
const mongoose = require('mongoose');

async function getTaskDetails() {
    try {
        const taskDetails = await tasks.find();
        return taskDetails
    } catch (err) {
        return err
    }
}

async function getTaskData() {
    try {
        const taskData = await tasks.aggregate([
            {
                $lookup: {
                    from: "projects",
                    localField: "project",
                    foreignField: "_id",
                    as: "project info"
                }
            }
        ]);
        return taskData;
    } catch(err) {
        return err;
    }
}

async function saveTaskDetails(input) {
    try {
        const newTask = new tasks({
            project: input.project,
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

async function updateTaskDetails(input, _id) {
    try{
        const taskToUpdate = {
            project: input.project,
            title: input.title,
            description: input.description,
            assignedBy: input.assignedBy,
            assignedTo: input.assignedTo,
            createdAt: input.createdAt,
            estimationTime: input.estimationTime,
            type: input.type,
            priority: input.priority,
            status: input.status
        };
        const updateTaskDetail = await tasks.updateOne({_id: _id}, taskToUpdate, {new: true})
        if(updateTaskDetail.modifiedCount > 0){
            return updateTaskDetail;
        } else
        return false;
    } catch (err) {
        return err;
    }
}

async function deleteTaskDetails(_id) {
    try{
        const deleteTaskDetail = await tasks.remove({_id: _id})
    return deleteTaskDetail;
    } catch (err) {
        return err;
    }
}
module.exports = { getTaskDetails , getTaskData, saveTaskDetails, updateTaskDetails, deleteTaskDetails}