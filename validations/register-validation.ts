import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Name field is required',
            'string.max': 'Name field should not contain more than 50 characters'
        }),
    phone: Joi
        .string()
        .required()
        .min(10)
        .max(15)
        .pattern(/^[0-9]+$/)
        .messages({
            'string.empty': 'Phone field is required',
            'string.min': 'Phone field should contain at least 10 numbers',
            'string.max': 'Phone field should not contain more than 15 numbers',
            'string.pattern.base': 'Phone can only contain numbers'
        }),
    email: Joi
        .string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
            'string.empty': 'Email field is required',
            'string.email': 'Invalid email format'
        }),
    username: Joi
        .string()
        .required()
        .max(50)
        .pattern(/^[a-z0-9.\-_]+$/)
        .messages({
            'string.empty': 'Username field is required',
            'string.max': 'Username field should not contain more than 50 characters',
            'string.pattern.base': 'Invalid username format'
        }),
    password: Joi
        .string()
        .required()
        .min(8)
        .max(50)
        .messages({
            'string.empty': 'Password field is required',
            'string.min': 'Password field should contain at least 8 characters',
            'string.max': 'Password field should not contain more than 50 characters',
        }),
    confirmPassword: Joi
        .any()
        .valid(Joi.ref('password'))
        .messages({
            'any.only': 'Password does not match'
        })
});

export default registerSchema;