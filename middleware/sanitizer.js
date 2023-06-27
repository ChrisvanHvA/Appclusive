import { body, validationResult } from 'express-validator';

const validationChecks = [
    body('first_name')
        .if(body('first_name').exists())
        .trim()
        .notEmpty()
        .withMessage('Please fill in a name'),
    body('surname')
        .if(body('surname').exists())
        .trim()
        .notEmpty()
        .withMessage('Please fill in a surname'),
    body('email_address')
        .if(body('email_address').exists())
        .trim()
        .notEmpty()
        .withMessage('Email address must not be empty')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .if(body('password').exists())
        .notEmpty()
        .withMessage('Password must not be empty')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('old_password')
        .if(body('old_password').exists().notEmpty())
        .isLength({ min: 6 })
        .withMessage('Pass must be at least 6 characters long'),
    body('new_password')
        .if(body('new_password').exists().notEmpty())
        .isLength({ min: 6 })
        .withMessage('Pass must be at least 6 characters long'),
    body('confirm_password')
        .if(body('confirm_password').exists())
        .notEmpty()
        .withMessage('Confirm password must not be empty')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match')
];

// Define validation middleware function to handle errors
const handleValidationErrors = (render, extraParams) => (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
        console.log('errors found');
        console.log(errors);

        let errorFields = {};

        errors.array().forEach((error) => {
            errorFields[`${error.path}-error`] = error.msg;
        });

        if (extraParams) {
            errorFields = { ...errorFields, ...extraParams };
        }

        return res.render(render, errorFields);
    }

    console.log('continue');

    next();
};

export { validationChecks, handleValidationErrors };
