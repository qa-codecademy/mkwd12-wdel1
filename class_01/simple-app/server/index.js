import express from 'express';
import cors from 'cors';

// Database Mock
const users = ['John Doe', 'Jane Doe'];

const app = express();

app.use(cors());
app.use(express.json());

// http://localhost:3000/users GET
app.get('/users', (req, res) => {
	res.json(users);
});

// http://localhost:3000/users POST
app.post('/users', (req, res) => {
	const user = req.body; // { name: 'John Doe' }
	users.push(user.name);
	res.json(user);
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
