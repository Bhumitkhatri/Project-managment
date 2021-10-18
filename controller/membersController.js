const members = require('../models/members');

async function getMembersDetails() {
    try {
        const memberDetails = await members.find();
        return memberDetails
    } catch (err) {
        return err
    }
}

async function saveMemberDetails(input) {
   console.log("input", input);
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

        const memberDetails = await newMember.save()
        console.log("memberDetails", memberDetails)
        return memberDetails
    } catch (err) {
        return err
    }
}

async function updateMemberDetails(input, _id) {
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
        const updateMemberDetails = await members.updateOne({ _id: _id }, dataToUpdateDetails, { new: true })
        return updateMemberDetails
    } catch (err) {
        return err
    }
}

async function deleteMemberDetails(_id) {
    try {
        const deleteMemberDetails = await members.remove({ _id: _id })
        return deleteMemberDetails
    } catch (err) {
        return err
    }
}
module.exports = { getMembersDetails, saveMemberDetails, updateMemberDetails, deleteMemberDetails }