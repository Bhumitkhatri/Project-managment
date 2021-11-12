const users = require("../models/user");
const mongoose = require('mongoose');
require('dotenv').config()

async function saveUserDetails(input) {
    try {
        const newUser = new users({
            name: input.name,
            email: input.email,
            password: input.password,
            token: input.token
        })
            const oldUser = await users.findOne({ email: input.email });
            if (oldUser) {
      return "User Already Exist. Please Login";
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await users.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    users.token = token;
    const UserDetails = await newUser.save()
    return UserDetails;
    } catch (err) {
        return err;
    }
}

module.exports= {saveUserDetails}