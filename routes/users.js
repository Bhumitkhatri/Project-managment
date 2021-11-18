const express = require('express');
const routes = express.Router();
const userController = require("../controller/userController");

routes.post("/user/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
        res.status(400).send("All input is required");
      } else {
    console.log("*UU2ww", req.body);
        const user = await userController.saveUserDetails(req.body);
    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400).send("User not saved")
    }
}
})

module.exports = routes;