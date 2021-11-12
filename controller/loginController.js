const login = require("../models/user");
const mongoose = require('mongoose');
require('dotenv').config()

async function saveLoginDetails(input) {
    try {
        const newLogin = new login({
            email: input.email,
            password: input.password
        })
            const user = await User.findOne({ email: input.email});
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                  { user_id: user._id, email },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: "2h",
                  }
                );
                user.token = token;
             }
            if(user) {
                return "user already exist" ;
            }
            const LoginDetails = await newLogin.save()
            return LoginDetails
    } catch (err) {
        return err
    }
}

module.exports = {saveLoginDetails}