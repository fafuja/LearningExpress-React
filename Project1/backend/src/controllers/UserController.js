const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(req, res){
        try{ 
            const {firstName, lastName, password, email} = req.body;
            const hashedPassword = await bcrypt.hash(password, 6);

            const existentUser = await User.findOne({email})

            if (!existentUser){
                const user = await User.create({
                    //Because the property and the variable are the same, you can use the following short-hand:
                    firstName, // = firstName: firstName
                    lastName, // = lastName: lastName
                    email, // = email: email 
                    password: hashedPassword, 
                });
                return res.json(user)
            }else{
                return res.status(400).json({
                    message: "Email registered. Do you want to login instead?"
                })
            }

            // every single object created inside MongoDB, MongoDB will create an ID and a Version
            //(0v initially but if you update user, version will change).
            
        }catch(error){
            throw Error(`Error while registering a new user : ${error}`)
        }
    },
    async getUserById(req, res){
        const {userId} = req.params; // userId need braces coz req.params returns an Object. (Destructuring_assignment)
        try {
            const user = await User.findById(userId, "-password");
            return res.json(user)
        } catch (error) {
            return res.status(400).json({
                message: "User does not exist."
            })
        }
        
    }
}