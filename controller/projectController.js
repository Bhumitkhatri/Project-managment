const projects = require('../models/project');
const members = require('../models/members');
const mongoose = require('mongoose');

async function getProjectDetails() {
    try {
        const projectDetails = await projects.find();
        return projectDetails
    } catch (err) {
        return err
    }
}
async function getProjectData(input) {

    try {
        const projectData = await projects.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(input)
                }
            },
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "data"
                }
            }
        ]);
        return projectData
    } catch (err) {
        return err
    }
}
async function saveProjectDetails(input) {
    try {
        const newProject = new projects({
            name: input.name,
            clientName: input.clientName,
            startDate: input.startDate,
            lastDate: input.lastDate,
            totalMembers: input.totalMembers,
            description: input.description,
            status: input.status
        })
        if (input.startDate > input.lastDate) {
            return `start Date must be less than last Date`
        } else {
            const projectDetails = await newProject.save()
            return projectDetails
        }
    } catch (err) {
        return err
    }
}

async function updateProjectDetails(input, _id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) return false;
    try {
        const dataToUpdateDetails = {
            name: input.name,
            clientName: input.clientName,
            startDate: input.startDate,
            lastDate: input.lastDate,
            totalMembers: input.totalMembers,
            description: input.description,
            status: input.status
        };
        const updateProjectDetail = await projects.updateOne({ _id: _id }, dataToUpdateDetails, { new: true })
        if (updateProjectDetail.modifiedCount > 0) {
            return updateProjectDetail;
        } else
            return false;
    } catch (err) {
        return err
    }
}

async function deleteProjectDetails(_id) {
    try {
        const deleteProjectDetails = await projects.remove({ _id: _id })
        return deleteProjectDetails
    } catch (err) {
        return err
    }
}

module.exports = { getProjectDetails, getProjectData, saveProjectDetails, updateProjectDetails, deleteProjectDetails }