const Registration = require('../models/Registration');

module.exports = {
    async approve(req, res) {
        const { user_id } = req.headers;
        const { registrationId } = req.params;
        try {
            
            const registration = await Registration.findById(registrationId)
            await registration.populate('event').execPopulate();
            if(registration.event.user == user_id){
                registration.approved = true
                await registration.save()
                return res.json(registration)
            }
            return res.status(400).json({message: "User is not the owner of this event!"})

        } catch (error) {
            return res.status(400).json({message: "Registration not found."})
        }

    }
}