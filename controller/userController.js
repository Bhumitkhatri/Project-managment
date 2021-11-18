const users = require("../models/user");
const mongoose = require('mongoose');
require('dotenv').config()

async function saveUserDetails(input) {
    console.log("2122ws", input);
    try {
        const oldUser = await users.findOne({ email: input.email });
        if (oldUser) {
            return "User Already Exist. Please Login";
        }
        const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // const encryptedPassword = await bcrypt.hash(input.password, 10);
        // console.log("token", token, "##3s", encryptedPassword);
        // const newUser = new users({
        //     name: input.name,
        //     email: input.email,
        //     password: encryptedPassword,
        //     token: token
        // })
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await users.create({
            name: input.name,
            email: input.email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        console.log("user", user);
        console.log("env", process.env.TOKEN_KEY);
        // Create token
        const token = jwt.sign(
            input.email,
            "09876542312314438abdhchsihhfwiehuihiwgvvwshjnndkfiuhweiuh",
            {
                expiresIn: "2h",
            }
        );
        console.log("token", token);
        // save user token
        user.token = token;

        // const userDetails = await newUser.save()
        console.log("user", user);


        // Create user in our database
        // const user = await users.create({
        //   name,
        //   email: email.toLowerCase(),
        //   password: encryptedPassword,
        // });

        // users.token = token;
        // const UserDetails = await newUser.save()
        return user;
    } catch (err) {
        return err;
    }
}

module.exports = { saveUserDetails }