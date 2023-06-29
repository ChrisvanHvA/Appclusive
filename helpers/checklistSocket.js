import { findRoute } from './findRoute.js';
import UserModel from '../models/userModel.js';
const userModel = new UserModel();

import dotenv from 'dotenv';
dotenv.config();

const rooms = {};

export const checklistSocket = async (io, socket) => {
    socket.on('checklist:join', async (url, userId) => {
        const match = await findRoute(url);
        const category = url.split('category=')[1] ?? null;

        if (
            match.route.path !== '/project/:projectId' ||
            match.paramValues < 1 ||
            !category ||
            !userId
        ) {
            return;
        }

        const projectId = match.paramValues[0];

        socket.join(`${projectId}_${category}`);
        socket.room = `${projectId}_${category}`;

        let user = await userModel.getUser(userId);

        if (user) {
            if (!rooms[socket.room]) {
                rooms[socket.room] = [];
            }

			if (user.profile_pic) {
				user.profile_pic = process.env.SUPABASE_IMAGE_BUCKET + user.profile_pic;
			}

            user = { ...user, socketId: socket.id };
            rooms[socket.room].push(user);
        }

        io.in(socket.room).emit('users:update', rooms[socket.room]);
    });

    socket.on('checklist:update', (id) => {
        socket.to(socket.room).emit('checklist:update', id);
    });

    socket.on('disconnect', () => {
        socket.leave(socket.room);
        io.to(socket.room).emit('users:update');

        if (rooms[socket.room]) {
            rooms[socket.room] = rooms[socket.room].filter(
                (user) => user.socketId !== socket.id
            );
        }
    });
};
