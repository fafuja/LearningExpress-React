const User = require('../models/User');
const Event = require('../models/Event');

module.exports = {
    async getEventById(req, res){
        const {eventId} = req.params;
        
        try {
            const event = await Event.findById(eventId)
            if(event == null){
                event.error()
            }
            res.json(event);
        } catch (error) {
            return res.status(400).json({message: "Event does not exist!"})
        }
    },
    async getAllEvents(req, res){
        try {
            const events = await Event.find({})
            res.json(events);
        } catch (error) {
            return res.status(400).json({message: "We don't have any events yet."})
        }
    },
    async getEventsBySport(req, res){
        const { sport } = req.params;
        const query = { sport } || {} // means "query equal sport object but if you don't have a sport obj. just assign 
        // query to an empty obj. "
        try {
            // console.log(sport); // prints "cycling"
            // console.log({sport}) // prints "{ sport: 'cycling' }"

            const events = await Event.find(query)
           
            if(!events.length > 0){
                events.error()
            }
            res.json(events);
        } catch (error) {
            return res.status(400).json({message: "Unable to find any events under this sport tag."})
        }
    }
}