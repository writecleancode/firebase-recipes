import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main';
import './Posts.styles.scss';

type postDataType = {
	title: string;
	content: string;
	likes: string[];
};

type postType = {
	id: string;
	title: string;
	content: string;
	likes: string[];
};

export const Posts = () => {
	const [posts, setPosts] = useState<postType[] | never[]>([]);

	useEffect(() => {
		(async () => {
			const posts = await getDocs(collection(db, 'posts'));
			const postsData = posts.docs.map(post => ({
				id: post.id,
				...(post.data() as postDataType),
			}));
			setPosts(postsData);
		})();
	}, []);

	return (
		<div className='posts'>
			{posts.length
				? posts.map(post => (
						<div className='post' key={post.id}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
						</div>
				  ))
				: null}
		</div>
	);
};
