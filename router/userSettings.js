import bcrypt from 'bcrypt';
import express from 'express';
import multer from 'multer';
import UserModel from '../models/userModel.js';

const router = express.Router();
const userModel = new UserModel();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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

    res.render('userSettings', {
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
    upload.single('avatar'),
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

        if (!req.file) {
            // TODO: handle error
            console.log('No file uploaded');
            return res.redirect('/settings');
        }

        const avatar = req.file.path;
        await userModel.updateProfilePic(user.user_id, avatar);

        // #TOFIX: after redirect with a message, on new submit it doesnt refresh correctly?
        console.log('redirect');
        return res.redirect(`/settings${extraParam}`);
    }
);

export default router;
