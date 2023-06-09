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
            return res.send('User not found');
        }

        const isValidPassword = await validPassword(oldpassword, user.password);

        if (!isValidPassword) {
            return res.send('Invalid old password');
        }

        const hashedPassword = await generateHash(newpassword);

        const success = await userModel.updatePassword(
            user.user_id,
            hashedPassword
        );

        if (success) {
            return res.send('Password updated successfully');
        } else {
            return res.send('Error updating password');
        }
    } catch (error) {
        console.log(error);
        return res.send('An error occurred');
    }
});

export default router;
