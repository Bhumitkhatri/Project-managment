const express = require('express');
const routes = express.Router();
const userController = require("../controller/userController");

routes.post("/user/register", async (req, res) => {
    const User = await userController.saveUserDetails(req.body);
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
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