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

async function getProjectData(input) {
   console.log("input", input);
    try {
        const projectData = await projects.aggregate([
            {
                $match: {
                    _id: "input"
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
        console.log("projects data", projectData);
        return projectData
    } catch (err) {
        return err
    }
}
async function saveProjectDetails(input) {
    console.log("input", input);
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
        const projectDetails = await newProject.save()
        console.log("projectDetails", projectDetails);
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