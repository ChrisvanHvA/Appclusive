import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const userModel = new UserModel();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req, res, next) => {
    res.render('forgotPassword', { noNav: true });
});

router.post('/', async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            res.send('User not found');
            return;
        }

        const secret = JWT_SECRET + user.password;
        const payload = {
            email: user.email_address,
            id: user.user_id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:5500/reset-password/${user.user_id}/${token}`;
    
        console.log(link);
        res.send('Password reset link has been sent to your email');
    } catch (error) {
        console.log(error);
    }
});

export default router;
