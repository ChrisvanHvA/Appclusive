import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

const userModel = new UserModel();

export default (passport) => {
    passport.serializeUser((user_id, done) => {
        done(null, user_id);
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
                usernameField: 'email_address',
                passwordField: 'password',
                passReqToCallback: true
            },
            async (req, email_address, password, done) => {
                try {
                    const user = await userModel.getUserByEmail(email_address);

                    if (user) {
                        return done(null, false);
                    } else {
                        const hashedPassword = await generateHash(password);

                        const userId = await userModel.insert({
                            first_name: req.body.first_name,
                            insertion: req.body.insertion,
                            surname: req.body.surname,
                            email_address: email_address,
                            password: hashedPassword
                        });

                        return done(null, userId);
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
                usernameField: 'email_address',
                passwordField: 'password',
                passReqToCallback: true
            },
            async (req, email_address, password, done) => {
                try {
                    const user = await userModel.getUserByEmail(email_address);
                    if (!user) {
                        return done(null, false);
                    }
                    const isValidPassword = await validPassword(
                        password,
                        user.password
                    );
                    if (!isValidPassword) {
                        return done(null, false);
                    }
                    return done(null, user.user_id);
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
