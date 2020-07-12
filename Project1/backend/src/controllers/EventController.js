const Event = require('../models/Event');
const User = require('../models/User');
module.exports = {
    async createEvent(req, res) {
        const { title, description, price, sport } = req.body;

        const { user_id } = req.headers;
        const { filename } = req.file;

        //console.log(req.file)
        const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" })
        }

        const event = await Event.create({
            title,
            description,
            price: parseFloat(price),
            sport,
            user: user_id,
            thumbnail: filename
        })
        res.json(event);
    },
    async delete(req, res) {
        const { eventId } = req.params;
        try {
            const event = await Event.findByIdAndDelete(eventId);
            if (event == null) {
                event.error()
            }
            return res.status(204).json(event)
        } catch (error) {
            return res.status(400).json({ message: "Unable to delete an event under this ID." })
        }
    }
}