import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const userModel = new UserModel();

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
        user: process.env.MAILER_MAIL,
        pass: process.env.MAILER_PASS,
    },
});

router.get('/', (req, res, next) => {
    res.render('forgotPassword', { noNav: true });
});

router.post('/', async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            res.render('forgotPassword', {
                noNav: true,
                message: 'User not found',
            });
            return;
        }

        const secret = JWT_SECRET + user.password;
        const payload = {
            email: user.email_address,
            id: user.user_id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:5500/reset-password/${user.user_id}/${token}`;

        const mailOptions = {
            from: process.env.MAILER_MAIL,
            to: user.email_address,
            subject: 'Appclusive: password reset',
            text: `Click the link (expires in 15m) to reset your password: ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.render('forgotPassword', {
                    noNav: true,
                    message: 'Error sending password reset email',
                });
            } else {
                console.log('Email sent:', info.response);
                res.render('forgotPassword', {
                    noNav: true,
                    message: 'Password reset link has been sent to your email',
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

export default router;