const mongoose = require('mongoose');
const membersSchema = new mongoose.Schema({

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
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
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },

    gender: {
        type: String,
        enum: ['Male','Female'],
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    reportingTo: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('members', membersSchema);