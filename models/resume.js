const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const opts = { toJSON: { virtuals: true}};

const ResumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialisation: {
        type: String
    },
    summary: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String
    },
    languages: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    education: {
        type: [Object]
    },
    project: {
        type: [Object]
    },
    training: {
        type: [Object]
    },
    hobbies: {
        type: String
    },
    link: {
        type: [Object]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, opts)


module.exports = new mongoose.model('Resume', ResumeSchema);