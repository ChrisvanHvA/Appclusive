import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const userModel = new UserModel();

const JWT_SECRET = process.env.JWT_SECRET;

const generateHash = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

router.get('/:id/:token', async (req, res, next) => {
    const { id, token } = req.params;

    try {
        const user = await userModel.getUser(id);

        if (!user) {
            res.send('Invalid user');
            return;
        }

        const secret = JWT_SECRET + user.password;

        try {
            const payload = jwt.verify(token, secret);
            res.render('resetPassword', {
                noNav: true,
                email: user.email_address,
            });
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/:id/:token', async (req, res, next) => {
    const { id, token } = req.params;
    const { password, confirm_password } = req.body;

    try {
        const user = await userModel.getUser(id);

        if (!user) {
            res.send('Invalid user');
            return;
        }

        const secret = JWT_SECRET + user.password;

        try {
            const payload = jwt.verify(token, secret);

            if (password !== confirm_password) {
                res.send('Passwords do not match');
                return;
            }

            const hashedPassword = await generateHash(password);

            const updated = await userModel.updatePassword(
                user.user_id,
                hashedPassword
            );

            if (updated) {
                res.send('Password updated successfully');
            } else {
                res.send('Failed to update password');
            }
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

export default router;
