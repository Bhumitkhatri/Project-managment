const express = require('express');

const routes = express.Router();

const projectsController = require('../controller/projectController');

routes.get('/project/get', async (req, res) => {
    const project = await projectsController.getProjectDetails();
    if (project) {
        res.status(200).json(project)
    } else {
        res.status(400).send("No data found")
    }
})
routes.get('/project/data/:id', async(req,res) => {
    const project = await projectsController.getProjectData(req.params.id);
    if (project.length) {
        res.status(200).json(project)
    } else {
        res.status(404).send("No data found")
    }
})
routes.post('/project/save', async (req, res) => {
    const project = await projectsController.saveProjectDetails(req.body);
    if (project) {
        res.status(201).json(project)
    } else {
        res.status(400).send("Project not saved")
    }
})

routes.patch('/project/update/:id', async (req, res) => {
    const project = await projectsController.updateProjectDetails(req.body, req.params.id);
    if (project) {
        res.status(200).send("project updated")
    }
    else {
        res.status(400).send("Project not updated")
    }
})

routes.delete('/project/delete/:id', async (req, res) => {
    const deleteProject = await projectsController.deleteProjectDetails(req.params.id);

    if (deleteProject) {
        res.status(200).json(deleteProject)
    }
    else {
        res.status(400).send("Project not deleted")
    }
})
module.exports = routes;