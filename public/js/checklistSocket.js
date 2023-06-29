import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { updateAfterEmit } from './checklist.js';

const socket = io();

const url = location.pathname + location.search;
const userId = document.querySelector('meta[name="user-id"]').content;

if (userId) {
	socket.emit('checklist:join', url, parseInt(userId));
}

socket.on('checklist:update', (id) => {
    updateAfterEmit(id);
});

socket.on('users:update', (users) => {
	
});

const emitUpdate = (id) => {
    socket.emit('checklist:update', id);
};

export { emitUpdate };
