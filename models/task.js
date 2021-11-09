const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    estimationTime: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['Bug', 'Story'],
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Reopen', 'To Be Tested'],
        required: true
    }
})

module.exports = mongoose.model('tasks', taskSchema);