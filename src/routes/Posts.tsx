import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main';
import './Posts.styles.scss';

export const Posts = () => {
	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		(async () => {
			const posts = await getDocs(collection(db, 'posts'));
			const postsData = posts.docs.map(post => ({
				id: post.id,
				...post.data(),
			}));
			setPosts(postsData);
		})();
	}, []);

	return (
		<div className='posts'>
			{posts.map((post: any) => (
				<div className='post' key={post.id}>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
};
