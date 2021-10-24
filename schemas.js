const Joi = require('joi');

module.exports.resumeSchema = Joi.object({
    name: Joi.string().required(),
    specialisation:Joi.string(),
    summary: Joi.string(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    maritalStatus: Joi.string(),
    languages: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    education: Joi.array(),
    project: Joi.array(),
    training: Joi.array(),
    hobbies: Joi.string(),
    link: Joi.array(),    
})