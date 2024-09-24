type PostDetailsProps = {
	params: {
		id: string;
	};
};

// users/:id/

export default function PostDetails({ params }: PostDetailsProps) {
	return <h1>the post with id {params.id}</h1>;
}
