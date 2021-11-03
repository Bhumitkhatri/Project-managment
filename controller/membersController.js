const members = require('../models/members');
const projects = require('../models/project');
const mongoose = require('mongoose');

async function getMembersDetails() {
    try {
        const memberDetails = await members.find();
        return memberDetails;
    } catch (err) {
        return err;
    }
}
async function getMembersData(membersProjectId, queryData) {
    try {
        const membersData = await members.find({
            projectId: mongoose.Types.ObjectId(membersProjectId),
            startDate: { $lt: new Date(queryData.startDate) }
        });
        return membersData;
    } catch (err) {
        return err;
    }
}

async function saveMemberDetails(input) {
    try {
        const newMember = new members({
            projectId: input.projectId,
            name: input.name,
            email: input.email,
            gender: input.gender,
            contact: input.contact,
            startDate: input.startDate,
            profile: input.profile,
            dob: input.dob,
            reportingTo: input.reportingTo
        })
        const membersData = await members.find({ email: input.email })
        if (membersData.length) {
            return ("email already exists");
        }
        const projectDetail = await projects.findOne({ _id: input.projectId })
        var toUTC = new Date(input.startDate)
        if (toUTC > projectDetail.startDate && toUTC < projectDetail.lastDate) {
            const memberDetails = await newMember.save()
            const projectDetails = await projects.find({ _id: input.projectId })
            const updateProjectDetails = await projects.updateOne({ _id: input.projectId }, { $set: { totalMembers: projectDetails[0].totalMembers + 1 } })
            return memberDetails;
        } else {
            return ("start date should be between project start Date and last date");
        }
    } catch (err) {
        return err;
    }
}

async function updateMemberDetails(input, _id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) return false;
    try {
        const dataToUpdateDetails = {
            name: input.name,
            email: input.email,
            profile: input.profile,
            gender: input.gender,
            contact: input.contact,
            profile: input.profile,
            dob: input.dob
        };
        const updateMemberDetail = await members.updateOne({ _id: _id }, dataToUpdateDetails, { new: true })
        if (updateMemberDetail.modifiedCount > 0) {
            return updateMemberDetail;
        } else
            return false;
    } catch (err) {
        return err;
    }
}

async function deleteMemberDetails(_id) {
    try {
        const membersData = await members.findOne({ _id: _id })
        const deleteMemberDetails = await members.deleteOne({ _id: _id })
        const projectId = membersData.projectId
        if (deleteMemberDetails) {
            const projectDetails = await projects.find({ _id: projectId })
            const updateProjectDetails = await projects.updateOne({ _id: projectId }, { $set: { totalMembers: projectDetails[0].totalMembers - 1 } })
            return projectDetails;
        }
        else {
            return ("total members don't get decrease");
        }
    }
    catch (err) {
        return err;
    }
}
module.exports = { getMembersDetails, getMembersData, saveMemberDetails, updateMemberDetails, deleteMemberDetails }