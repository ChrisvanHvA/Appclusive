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
        .custom((value, { req }) => {
            if (!req.originalUrl.includes('login')) {
                if (value.length < 6) {
                    throw new Error(
                        'Password must be at least 6 characters long'
                    );
                }
            }
            return true;
        }),
    body('old_password')
        .if(body('old_password').exists().notEmpty())
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('new_password')
        .if(body('new_password').exists().notEmpty())
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirm_password')
        .if(body('confirm_password').exists())
        .notEmpty()
        .withMessage('Confirm password must not be empty')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
    body('title')
        .if(body('title').exists())
        .trim()
        .notEmpty()
        .withMessage('Please fill in a project title'),
    body('wcag_level')
        .if(body('wcag_level').exists())
        .notEmpty()
        .withMessage('Please select a WCAG level for your project'),
    body('code')
        .if(body('code').exists().notEmpty())
        .isLength({ min: 6, max: 6 })
        .withMessage('Invite code must 6 characters long')
];

// Define validation middleware function to handle errors
const handleValidationErrors = (render, extraParams) => (req, res, next) => {
    const errors = validationResult(req);
    
    let errorFields = {};

    for (const key in req.body) {
        const value = req.body[key];
        errorFields[`${key}-user_input`] = value;
    }

    if (!errors.isEmpty()) {
        console.error('errors found');


        errors.array().forEach((error) => {
            errorFields[`${error.path}-error`] = error.msg;
        });

        if (extraParams) {
            errorFields = { ...errorFields, ...extraParams };
        }

        errorFields['general-form-error'] = 'One or multiple fields were not filled in correctly.';

        console.error(errorFields);

        return res.render(render, errorFields);
    }

    next();
};

export { validationChecks, handleValidationErrors };