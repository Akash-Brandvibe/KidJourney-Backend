const pickupInformation = require('../models/PickupInformation');
const { StatusCodes } = require('http-status-codes');

const getPickup = async (req,res) => {
    try {
        const { id: studentId } = req.params;

        const pickupinfo = await pickupInformation.find({ student_id: studentId });
        if(!pickupinfo){
            return res.status(StatusCodes.NOT_FOUND).send(`No pickupinformation found`);
        }
        res.status(StatusCodes.OK).json(pickupinfo);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createPickup = async (req,res) => {
    try {
        const { id: studentId } = req.params;
        const { name, vehicle_details, contact_info, relation } = req.body;

        if( !name || !vehicle_details || !contact_info || !relation) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Not all necessary information is provided`);
        }

        const pickup = await pickupInformation.create({
            student_id: studentId,
            name: name,
            vehicle_details: vehicle_details,
            contact_info: contact_info,
            relation: relation
        });
        res.status(StatusCodes.CREATED).json(pickup);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updatePickup = async (req,res) => {
    try {
        const { id: studentId } = req.params;
        const { name, vehicle_details, contact_info, relation } = req.body;

        let updates = {};

        if(name) {
            updates.name = name
        }
        if(vehicle_details) {
            updates.vehicle_details = vehicle_details
        }
        if(contact_info) {
            updates.contact_info = contact_info
        }
        if(relation) {
            updates.relation = relation
        }

        if(Object.keys(updates).length === 0){
            return res.status(StatusCodes.BAD_REQUEST).send(`No updates provided`);
        }
        
        const pickup = await pickupInformation.findOneAndUpdate(
            { student_id: studentId },
            updates,
            { new: true, runValidators: true }
        );
        res.status(StatusCodes.OK).json(pickup);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const deletePickup = async (req,res) => {
    try {
        const { id: studentId } = req.params;

        const pickup = await pickupInformation.findOneAndDelete({ student_id: studentId });

        if(!pickup){
            return res.status(StatusCodes.NOT_FOUND).send(`No pickup info found to delete`);
        }
        res.status(StatusCodes.OK).json(pickup);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getPickup,
    createPickup,
    updatePickup,
    deletePickup
}