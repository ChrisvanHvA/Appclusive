import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import path from 'path';
import routes from './router/router.js';
import hbsHelpers from './helpers/hbsHelpers.js';

// custom middleware
import { setHeadData } from './middleware/setHeadData.js';

const __dirname = path.resolve();
const port = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

io.on('connection', (socket) => {
    // Do stuff
});

// middleware
app.use(setHeadData);

// routes
routes.forEach((route) => {
    app.use(route.path, route.handler);
});

app.engine(
    'hbs',
    handlebars.engine({
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        extname: 'hbs',
        defaultLayout: 'index',
        partialsDir: [path.join(__dirname, 'views', 'partials')],
		helpers: { ...hbsHelpers }
    })
);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}! http://localhost:${port}`);
});
