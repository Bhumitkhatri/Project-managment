const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    clientName: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true,
    },

    lastDate: {
        type: Date,
        required: true,
    },

    totalMembers: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('projects',projectSchema);