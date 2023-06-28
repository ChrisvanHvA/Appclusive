import express from 'express';
const router = express.Router();

import multer from 'multer';
import UserModel from '../models/userModel.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('avatar'), async (req, res) => {
    const user = req.user.user_id;

    if (!req.file) {
        // TODO: handle error
        console.log('No file uploaded');
        return res.redirect('/settings');
    }

    const avatar = req.file.path;

    const userModel = new UserModel(user);
    await userModel.updateProfilePic(user, avatar);

    return res.redirect('/settings');
});

export default router;