import { findRoute } from './findRoute.js';

export const checklistSocket = async (io, socket) => {
    socket.on('checklist:join', async (url) => {
        const match = await findRoute(url);
        const category = url.split('category=')[1] ?? null;

        if (
            match.route.path !== '/project/:projectId' ||
            match.paramValues < 1 ||
            !category
        ) {
            return;
        }

        const projectId = match.paramValues[0];

        socket.join(`${projectId}_${category}`);
		socket.room = `${projectId}_${category}`;
    });

    socket.on('checklist:update', (id) => {
		socket.to(socket.room).emit('checklist:update', id);
	});
};
