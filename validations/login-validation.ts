import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi
        .string()
        .required()
        .messages({
            'string.empty': 'Username field is required'
        }),
    password: Joi
        .string()
        .required()
        .messages({
            'string.empty': 'Password field is required'
        })
});

export default loginSchema;