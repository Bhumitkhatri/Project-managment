const express = require('express');

const routes = express.Router();

const projectsController = require('../controller/projectController');

routes.get('/project/get', async (req, res) => {
    const project = await projectsController.getProjectDetails();
    if (project) {
        res.status(200).json(project)
    } else {
        res.status(400).send(err)
    }
})
routes.get('/project/data', async(req,res) => {
    const project = await projectsController.getProjectData();
    console.log("project", project);
    if (project) {
        res.status(200).json(project)
    } else {
        res.status(400).send(err)
    }
})
routes.post('/project/save', async (req, res) => {
    const project = await projectsController.saveProjectDetails(req.body);
    if (project) {
        res.status(200).json(project)
    } else {
        res.status(400).send(err)
    }
})

routes.patch('/project/update/:id', async (req, res) => {
    const project = await projectsController.updateProjectDetails(req.body, req.params.id);

    if (project) {
        res.json(project)
    }
    else {
        res.status(400).send(err)
    }
})

routes.delete('/project/delete/:id', async (req, res) => {
    const deleteProject = await projectsController.deleteProjectDetails(req.params.id);

    if (deleteProject) {
        res.json(deleteProject)
    }
    else {
        res.status(400).send(err)
    }
})
module.exports = routes;