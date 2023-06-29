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

const activeUsersList = document.querySelector('.sidebar__active-users ul');
if (activeUsersList) {
    socket.on('users:update', (users) => {
		activeUsersList.innerHTML = '';
		users.forEach((user) => {
			const li = document.createElement('li');
			const containerSpan = document.createElement('span');
			const img = document.createElement('img');
			const nameSpan = document.createElement('span');

			containerSpan.classList.add('profile-pic');
			img.src = user.profile_pic || '';
			img.alt = '';
			img.onerror = () => {
				img.style.display = 'none';
			}

			img.onload = () => {
				img.style.display = 'block';
			}

			const fullName = `${user.first_name}${user.insertion ? ' ' + user.insertion : ''} ${user.surname}`;

			const nameArray = fullName.split(' ');
			const initials = nameArray[0][0] + nameArray[nameArray.length - 1][0];

			containerSpan.setAttribute('title', fullName);

			nameSpan.textContent = initials;
			nameSpan.setAttribute('aria-label', fullName);

			containerSpan.appendChild(img);
			containerSpan.appendChild(nameSpan);
			li.appendChild(containerSpan);
			activeUsersList.appendChild(li);
		});
	});
}

const emitUpdate = (id) => {
    socket.emit('checklist:update', id);
};

export { emitUpdate };
