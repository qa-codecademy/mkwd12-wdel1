// Elements

const usersList = document.getElementById('users-list');
const input = document.getElementById('add-user');
const btn = document.getElementById('add-user-btn');

// Methods

const getUsers = async () => {
	try {
		const response = await fetch('http://localhost:3000/users');
		const users = await response.json();
		return users || [];
	} catch (error) {
		return [];
	}
};

const renderUsers = users => {
	usersList.innerHTML = '';

	users.forEach(user => {
		usersList.innerHTML += `<li>${user}</li>`;
	});
};

// Events

btn.addEventListener('click', async () => {
	const name = input.value;

	if (!name) return;

	await fetch('http://localhost:3000/users', {
		method: 'POST',
		body: JSON.stringify({ name }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	const users = await getUsers();
	renderUsers(users);

	input.value = '';
});

// Init
(async () => {
	const users = await getUsers();
	console.log(users);
	renderUsers(users);
})();
