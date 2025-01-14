import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            return res.render('resetPassword', {
                noNav: true,
                message: 'Invalid user'
            });
        }

        const secret = JWT_SECRET + user.password;

        try {
            const payload = jwt.verify(token, secret);
            res.render('resetPassword', {
                noNav: true,
                email: user.email_address
            });
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/:id/:token', async (req, res, next) => {
    const { id, token } = req.params;
    const { password, confirm_password } = req.body;

    try {
        const user = await userModel.getUser(id);

        if (!user) {
            return res.render('resetPassword', {
                noNav: true,
                message: 'Invalid user'
            });
        }

        const secret = JWT_SECRET + user.password;

        try {
            const payload = jwt.verify(token, secret);

            if (password !== confirm_password) {
                return res.render('resetPassword', {
                    noNav: true,
                    message: 'Passwords do not match'
                });
            }

            const hashedPassword = await generateHash(password);

            const updated = await userModel.updatePassword(
                user.user_id,
                hashedPassword
            );

            if (updated) {
                return res.render('resetPassword', {
                    noNav: true,
                    success: 'Password updated successfully'
                });
            } else {
                return res.render('resetPassword', {
                    noNav: true,
                    message: 'Failed to update password'
                });
            }
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
});

export default router;