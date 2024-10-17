'use server';

import { redirect } from 'next/navigation';
import { loginUser as login } from '../../services/users.service';

export default async function loginUser(formData: FormData) {
	const loginData = {
		username: formData.get('username') as string,
		password: formData.get('password') as string,
	};

	await login(loginData);

	redirect(`/${formData.get('username')}`);
}
