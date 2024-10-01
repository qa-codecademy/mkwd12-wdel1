type ProfileProps = {
	params: { username: string };
};

export default function Profile({ params: { username } }: ProfileProps) {
	return <div>Profile: {username}</div>;
}
