const projects = require('../models/project');
const members = require('../models/members');

async function getProjectDetails() {
    try {
        const projectDetails = await projects.find();
        return projectDetails
    } catch (err) {
        return err
    }
}

async function getProjectData() {
    try {
        const projectData = await projects.aggregate([{
            $lookup: {
                from: "members",
                localField: "_id",
                foreignField: "projectId",
                as: "data"
            }
        }]);
        console.log("projects data", projectData);
        return projectData
        } catch (err) {
            return err
        }

}
async function saveProjectDetails(input) {
    try {
        const projects = new projects({
            name: input.name,
            clientName: input.clientName,
            startDate: input.startDate,
            lastDate: input.lastDate,
            totalMembers: input.totalMembers,
            description: input.description,
            status: input.status
        })
        const projectDetails = await projects.save()
        return projectDetails
    } catch (err) {
        return err
    }
}

async function updateProjectDetails(input, _id) {
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
        const updateProjectDetails = await projects.updateOne({ _id: _id }, dataToUpdateDetails, { new: true })
        return updateProjectDetails
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