const express = require('express');

const routes = express.Router();

const membersController = require('../controller/membersController');
var validator = require("email-validator");

routes.get('/member/get', async (req, res) => {
    const members = await membersController.getMembersDetails();
    if (members) {
        res.status(200).json(members)
    } else {
        res.status(404).send("No data found")
    }
})

routes.get('/member/data/:id', async (req, res) => {
    const member = await membersController.getMembersData(req.params.id, req.query);
    if (member.length) {
        res.status(200).json(member)
    } else {
        res.status(404).send("No data found")
    }
})
routes.post('/member/save', async (req, res) => {
    const members = await membersController.saveMemberDetails(req.body);
    if (!(validator.validate(req.body.email))) {
        res.status(400).send("Invalid email")
    }
    else {
        if (members) {
            res.status(201).json(members)
        } else {
            res.status(400).send("member not inserted")
        }
    }
})

routes.patch('/member/update/:id', async (req, res) => {
    const newDetails = await membersController.updateMemberDetails(req.body, req.params.id);

    if (newDetails) {
        res.status(200).json("member updated")
    }
    else {
        res.status(400).send("member not updated")
    }
})

routes.delete('/member/delete/:id', async (req, res) => {
    const deleteMember = await membersController.deleteMemberDetails(req.params.id);

    if (deleteMember.length) {
        res.json(deleteMember)
    }
    else {
        res.status(404).send("selected member not found")
    }
})

module.exports = routes;