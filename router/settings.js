import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router();

import UserModel from '../models/userModel.js';
const userModel = new UserModel();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';

const generateHash = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

const validPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const mapObject = (obj, callback) => {
    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];

        if (value !== '') {
            result[key] = callback(value);
        }

        return result;
    }, {});
};

router.get('/', (req, res) => {
    const errorParam = req.query.message;
    const avatar = req.user?.profile_pic || 'public/images/no_img.png';

    res.render('settings', {
        title: 'Settings',
        avatar,
        system_message: errorParam
            ? errorParam == 1
                ? 'Success!!!'
                : 'Failed to update'
            : null
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('settings'),
    async (req, res) => {
        const submitData = mapObject(req.body, (value) => value);
        const user = req.user;

        if (!user) {
            return res.redirect(`/settings?message=0`);
        }

        if (submitData.old_password) {
            const isValidPassword = await validPassword(
                submitData.old_password,
                user.password
            );

            if (!isValidPassword) {
                return res.redirect(`/settings?message=0`);
            }

            const hashedPassword = await generateHash(submitData.new_password);
            submitData.password = hashedPassword;

            delete submitData.old_password;
            delete submitData.new_password;
        }

        let extraParam = '?message=1';
        console.log('updating');
        const updatedData = userModel.update(req.user.user_id, submitData);

        if (!updatedData) {
            console.log('failed');
            extraParam = '?message=0';
        }

        // #TOFIX: after redirect with a message, on new submit it doesnt refresh correctly?
        console.log('redirect');
        return res.redirect(`/settings${extraParam}`);
    }
);

export default router;
