const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    async store(req, res){
        
        try {
            const { email, password } = req.body;
            //console.log(req.body)
            //console.log(Boolean(email))
            // console.log(!email) -> If email = "", Boolean(email) == false // console.log(Boolean(email))
            if(!email || !password){
                return res.status(200).json({message: "Required field missing."})
            }
            
            const user = await User.findOne({email});
            if(!user){
                return res.status(200).json({message: "User not found. Do you want to register instead?"})
            }

            if(user && await bcrypt.compare(password, user.password)){
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstname: user.firstName,
                    lastname: user.lastName
                }
                return res.json(userResponse);
            }else{
                return res.status(200).json({message: "Password or Email does not match."})
            }

        } catch (error) {
            throw Error(`Error while authenticating an user ${error}`)
        }
    }
}