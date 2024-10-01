export interface User {
	id: string;
	name: string;
	username: string;
	avatar: string;
	description?: string;
	location?: string;
	url?: string;
	joinDate: string;
	followers: User[];
	following: User[];
}
