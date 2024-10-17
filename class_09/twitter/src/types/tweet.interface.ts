import { TweetType } from './tweet-type.enum';
import { User } from './user.interface';

export interface Tweet {
	id: string;
	text: string;
	type: TweetType;
	reposts: Tweet[];
	replies: Tweet[];
	likes: User[];
	author: User;
	createdAt: string;
}
