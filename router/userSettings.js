import bcrypt from 'bcrypt';
import express from 'express';
import multer from 'multer';
import UserModel from '../models/userModel.js';

import messageController from '../controllers/messageController.js';

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
    const avatar = req.user?.profile_pic || 'public/images/no_img.png';

    res.render('userSettings', {
        title: 'Settings',
        avatar
    });
});

router.post(
    '/',
    upload.single('avatar'),
    validationChecks,
    handleValidationErrors('userSettings'),
    async (req, res) => {

        const submitData = mapObject(req.body, (value) => value);
        const user = req.user;

        const MessageController = new messageController();
        let messageKey = 2;

        if (!user) {
            messageKey = MessageController.getMessageKeyByType('unknown_user');
            return res.redirect(`/settings?m=${messageKey}`);
        }

        if (submitData.old_password) {
            const isValidPassword = await validPassword(
                submitData.old_password,
                user.password
            );

            if (!isValidPassword) {
                messageKey = MessageController.getMessageKeyByType('password_match', 'fail');
                return res.redirect(`/settings?m=${messageKey}`);
            }

            const hashedPassword = await generateHash(submitData.new_password);
            submitData.password = hashedPassword;

            delete submitData.old_password;
            delete submitData.new_password;
        }

        const updatedData = userModel.update(req.user.user_id, submitData);

        if (!updatedData) {
            console.log('failed to update user');
            messageKey = MessageController.getMessageKeyByType('user_update', 'fail');
            return res.redirect(`/settings?m=${messageKey}`);            
        }

        messageKey = 1;

        // no file, nothing else needed! so success
        if (!req.file) {
            return res.redirect(`/settings?m=${messageKey}`);            
        }

        const avatar = req.file.path;
        const avatarUpdated = await userModel.updateProfilePic(
            user.user_id,
            avatar
        );

        if (!avatarUpdated) {
            messageKey = MessageController.getMessageKeyByType('file_save', 'fail');
            return res.redirect(`/settings?m=${messageKey}`);            
        }

        return res.redirect(`/settings?m=${messageKey}`);
    }
);

export default router;
