const { StatusCodes } = require('http-status-codes');
const PaymentItem = require('../models/PaymentItem');

const getAllPaymentItem = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

const getPaymentItem = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

const createPaymentItem = async (req,res) => {
    try {
        const { userID: principalId } = req.cookies.user;
        const { name, description, price, currency } = req.body;

        if(!name || !price || !currency){
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide necessary information`)
        }

        const paymentItem = await PaymentItem.create({
            name: name,
            description: description,
            price: price,
            currency: currency,
            principalId: principalId
        });
        res.status(StatusCodes.CREATED).json(paymentItem);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

const updatePaymentItem = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

const deletePaymentItem = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

module.exports = {
    getAllPaymentItem,
    getPaymentItem,
    createPaymentItem,
    updatePaymentItem,
    deletePaymentItem
}