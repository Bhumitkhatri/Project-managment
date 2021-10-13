const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({

    projectId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    profile: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dob:{
        type: Date,
        required: true
    },

    reportingTo: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('members',membersSchema);