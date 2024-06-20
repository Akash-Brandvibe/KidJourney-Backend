const Event = require('../models/Event');
const School = require('../models/School')
const { StatusCodes } = require('http-status-codes');

const getAllEvents = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;

        const event = await Event.find({ principal_id: principalID, school_id: schoolID });

        if(event.length === 0){
            return res.status(StatusCodes.NOT_FOUND).send(`No Events found`);
        }

        res.status(StatusCodes.OK).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}
const getEvent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;
        const { id: eventID } = req.params;

        const event = await Event.findOne({ principal_id: principalID, school_id: schoolID, _id: eventID });

        if(!event){
            return res.status(StatusCodes.NOT_FOUND).send(`No Event found with ID ${eventID}`);
        }
        res.status(StatusCodes.OK).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}
const createEvent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;
        const { event_name, event_type, event_date, description, location, organizer } = req.body;

        if(!event_name || !event_type || !event_date || !description || !location || !organizer){
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide necessary details`);
        }

        const eventEntry = {
            principal_id: principalID,
            school_id: schoolID,
            event_name: event_name,
            event_type: event_type,
            event_date: event_date,
            description: description,
            location: location,
            organizer: organizer
        }
        const event = await Event.create({ ...eventEntry });
        res.status(StatusCodes.CREATED).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}
const updateEvent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;
        const { event_name, event_type, event_date, description, location, organizer } = req.body;
        const { id: eventID } = req.params;

        let updates = {};

        if(event_name){
            updates.event_name = event_name;
        }
        if(event_type){
            updates.event_type = event_type;
        }
        if(event_date){
            updates.event_date = event_date;
        }
        if(description){
            updates.description = description;
        }
        if(location){
            updates.location = location;
        }
        if(organizer){
            updates.organizer = organizer;
        }

        if(Object.keys(updates).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(`No updates provided`);
        }

        const event = await Event.findOneAndUpdate({ principal_id: principalID, school_id: schoolID, _id: eventID }, 
            updates, {new: true, runValidators: true});
        res.status(StatusCodes.OK).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}
const deleteEvent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;
        const { id: eventID } = req.params;

        const event = await Event.findOneAndDelete({ principal_id: principalID, school_id: schoolID, _id: eventID });
        res.status(StatusCodes.OK).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}