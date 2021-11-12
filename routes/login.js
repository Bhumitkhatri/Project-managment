const express = require('express');
const routes = express.Router();
const loginController = require("../controller/loginController");

routes.post("/user/login",async (req, res) => {
    const User = await loginController.saveLoginDetails(req.body);
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    else {
    if (User) {
        res.status(201).json(User)
    } else {
        res.status(400).send("User not saved")
    }
}
})

module.exports = routes;