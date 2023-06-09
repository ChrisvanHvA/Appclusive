import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import path from 'path';
import routes from './router/router.js';
import hbsHelpers from './helpers/hbsHelpers.js';
import configurePassport from './config/passport.js';

import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { setHeadData } from './middleware/setHeadData.js';
import { checkAuth } from './middleware/checkAuth.js';

const __dirname = path.resolve();
const port = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));

app.use(express.json(), express.urlencoded({extended: true}));

app.set('trust proxy', 1);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({ secret: 'fckweebnation', saveUninitialized: true, resave: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
configurePassport(passport);

app.use(setHeadData);

io.on('connection', (socket) => {
    // Do stuff§
});

// routes
routes.forEach((route) => {
    app.use(route.path, checkAuth, route.handler);
});

app.engine(
    'hbs',
    handlebars.engine({
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        extname: 'hbs',
        defaultLayout: 'index',
        partialsDir: [path.join(__dirname, 'views', 'partials')],
        helpers: { ...hbsHelpers },
    })
);

server.listen(port, () => {
    console.log(`Appclusive listening on http://localhost:${port}!`);
});
