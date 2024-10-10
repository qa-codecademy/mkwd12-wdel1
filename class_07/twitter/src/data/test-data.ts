import { TweetType } from '../types/tweet-type.enum';
import { Tweet } from '../types/tweet.interface';
import { User } from '../types/user.interface';

const USER_1 = {
	id: '1',
	name: 'John Doe',
	avatar: 'https://picsum.photos/200',
	username: 'johndoe',
	joinDate: '2023-05-01T00:00:00.000Z',
	followers: [],
	following: [],
} satisfies User;

const USER_2 = {
	id: '2',
	name: 'Jane Doe',
	avatar: 'https://picsum.photos/200',
	username: 'janedoe',
	joinDate: '2023-05-01T00:00:00.000Z',
	followers: [],
	following: [],
} satisfies User;

const TWEET_REPLY = {
	id: '3',
	text: 'Hello, world!',
	likes: [],
	reposts: [],
	replies: [],
	type: TweetType.Reply,
	author: USER_1,
	createdAt: '2023-05-01T00:00:00.000Z',
} satisfies Tweet;

const TWEET_REPOST = {
	id: '4',
	text: 'Hello, world!',
	likes: [],
	reposts: [],
	replies: [],
	type: TweetType.Repost,
	author: USER_1,
	createdAt: '2023-05-01T00:00:00.000Z',
} satisfies Tweet;

export const TWEETS = [
	{
		id: '1',
		text: 'Hello, world! #reactjs #nextjs, this is a test, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		likes: [],
		reposts: [],
		replies: [],
		type: TweetType.Tweet,
		author: USER_1,
		createdAt: '2023-05-01T00:00:00.000Z',
	},
	{
		id: '2',
		text: 'Hello, world!',
		likes: [USER_1],
		reposts: [TWEET_REPOST],
		replies: [TWEET_REPLY],
		type: TweetType.Tweet,
		author: USER_2,
		createdAt: '2023-05-01T00:00:00.000Z',
	},
] satisfies Tweet[];
