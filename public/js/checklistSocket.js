import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { updateAfterEmit } from './checklist.js';

const socket = io();

socket.emit('checklist:join', location.pathname + location.search);

socket.on('checklist:update', (id) => {
	updateAfterEmit(id);
});

const emitUpdate = (id) => {
    socket.emit('checklist:update', id);
};

export { emitUpdate };
