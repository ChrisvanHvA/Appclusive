import express from 'express';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const userModel = new UserModel();

const generateHash = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

const validPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

router.post('/', async (req, res) => {
    const { oldpassword, newpassword } = req.body;
    const user = req.user;

    try {
        if (!user) {
            res.render('account', {
                user: req.user,
                message: 'User not found',
            });
            return;
        }

        const isValidPassword = await validPassword(oldpassword, user.password);

        if (!isValidPassword) {
            res.render('account', {
                user: req.user,
                message: 'Invalid old password',
            });
            return;
        }

        const hashedPassword = await generateHash(newpassword);

        const success = await userModel.updatePassword(
            user.user_id,
            hashedPassword
        );

        if (!success) {
            res.render('account', {
                user: req.user,
                message: 'Error updating password',
            });
            return;
        }
        res.render('account', {
            user: req.user,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
