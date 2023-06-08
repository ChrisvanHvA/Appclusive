import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

const userModel = new UserModel();

export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.getUser(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                const confirmPassword = req.body.confirm_password;
                if (password !== confirmPassword) {
                    return done(
                        null,
                        false,
                        req.flash('registerMsg', 'Passwords do not match..')
                    );
                }

                try {
                    const user = await userModel.getUserByEmail(email);
                    if (user) {
                        return done(
                            null,
                            false,
                            req.flash(
                                'registerMsg',
                                'This email address is already in use..'
                            )
                        );
                    } else {
                        const hashedPassword = await generateHash(password);
                        const newUser = await userModel.insertUser(
                            email,
                            hashedPassword
                        );
                        return done(null, newUser);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const user = await userModel.getUserByEmail(email);
                    if (!user) {
                        return done(
                            null,
                            false,
                            req.flash('loginMsg', 'User not found..')
                        );
                    }
                    const isValidPassword = await validPassword(
                        password,
                        user.password
                    );
                    if (!isValidPassword) {
                        return done(
                            null,
                            false,
                            req.flash('loginMsg', 'Oops! Wrong password..')
                        );
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    const generateHash = async (password) => {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    };

    const validPassword = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    };
};
