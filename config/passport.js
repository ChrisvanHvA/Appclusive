import { Strategy as LocalStrategy } from 'passport-local';
import fs from 'fs';
import bcrypt from 'bcrypt';

const usersFilePath = 'config/users.json';

export default function (passport) {
    // passport serialize/unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // read users JSON file
        const users = getUsersFromFile();
        const user = users.find((user) => user.id === id);
        done(null, user);
    });

    // ================= SIGNUP =================
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function (req, email, password, done) {
                process.nextTick(function () {
                    // read users JSON file
                    const users = getUsersFromFile();
                    const user = users.find(
                        (user) => user.local.email === email
                    );
                    if (user) {
                        return done(null, false, 'ERROR MSG HERE');
                    } else {
                        // no user --> create user
                        const newUser = {
                            id: generateUniqueId(),
                            local: {
                                email: email,
                                password: generateHash(password),
                            },
                        };
                        users.push(newUser);
                        // push user to users JSON file
                        saveUsersToFile(users, function (err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            }
        )
    );

    // ================= LOGIN =================
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function (req, email, password, done) {
                // read users JSON file
                const users = getUsersFromFile();
                const user = users.find((user) => user.local.email === email);
                if (!user) {
                    return done(null, false, 'ERROR MSG HERE');
                }
                if (!validPassword(user, password)) {
                    return done(null, false, 'ERROR MSG HERE');
                }
                return done(null, user);
            }
        )
    );

    // helper function to read the users data from the JSON file
    function getUsersFromFile() {
        const usersData = fs.readFileSync(usersFilePath);
        return JSON.parse(usersData);
    }

    // helper function to save the updated users array back to the JSON file
    function saveUsersToFile(users, callback) {
        const usersData = JSON.stringify(users, null, 2);
        fs.writeFile(usersFilePath, usersData, callback);
    }

    function generateUniqueId() {
        const timestamp = new Date().getTime().toString(36);
        const randomString = Math.random().toString(36).substring(2, 7);
        return timestamp + randomString;
    }

    function generateHash(password) {
        const saltRounds = 10; // salt rounds for bcrypt
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    // helper function to validate the provided password against the stored hash
    function validPassword(user, password) {
        return bcrypt.compareSync(password, user.local.password);
    }
}
