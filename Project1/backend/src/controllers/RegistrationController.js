const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

module.exports = {
    async register(req, res) {
        const { eventId } = req.params;
        try {
            const event = await Event.findById(eventId)
            //.findById() throw an error!
           
            const { user_id } = req.headers;
            const { date } = req.body;
            const register = await Registration.create({
                date,
                user: user_id,
                event: eventId,
            })
            await register.populate('event').populate('user', "-password").execPopulate();
            //If you put this line of code here It will return the entire User and Event object(showing all their properties
            //instead of just their IDs)

            return res.json(register);

        } catch (error) {
            return res.status(400).json({ message: "Event does not exist!" })
        }
    },
    async getRegistrationById(req, res) {
        const { registrationId } = req.params;
        try {
            const registration = await Registration.findById(registrationId)
            //.findById() throw an error!
            await registration.populate('user', "-password").populate('event').execPopulate()
            return res.json(registration)
        } catch (error) {
            return res.status(404).json({ message: "Registration not found!" })
        }
    }
}