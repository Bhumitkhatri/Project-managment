const express = require('express');

const routes = express.Router();

const membersController = require('../controller/membersController');

routes.get('/member/get', async (req,res)=>{
    const members = await membersController.getMembersDetails();
    if(members){
        res.status(200).json(members)
    }else{
        res.status(400).send(err)
    }
})

routes.post('/member/save', async (req,res)=>{
    const members = await membersController.saveMemberDetails(req.body);
    if(members){
        res.status(200).json(members)
    }else {
        res.status(400).send(err)
    }
})

routes.patch('/member/update/:id', async (req, res) =>{
    const newDetails = await membersController.updateMemberDetails(req.body,req.params.id);

    if (newDetails){
        res.json(newDetails)
    }
    else {
        res.status(400)
    }
})

routes.delete('/member/delete/:id', async (req, res) => {
    const deleteMember = await membersController.deleteMemberDetails(req.params.id);

    if (deleteMember) {
        res.json(deleteMember)
    }
    else {
        res.status(400)
    }
})

module.exports = routes;