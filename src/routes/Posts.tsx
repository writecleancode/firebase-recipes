import { useEffect, useState } from 'react';
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';
import { db } from '../main';
import './Posts.styles.scss';

export const Posts = () => {
	const [posts, setPosts] = useState<any>([]);
	const { user } = useAuth();

	const handleAddLike = async (id: any) => {
		try {
			const postRef = doc(db, 'posts', id);
			await updateDoc(postRef, {
				likes: arrayUnion(user.uid),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveLike = async (id: any) => {
		try {
			const postRef = doc(db, 'posts', id);
			await updateDoc(postRef, {
				likes: arrayRemove(user.uid),
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const postsQuery = query(collection(db, 'posts'));
		const unsub = onSnapshot(postsQuery, postsSnapshot => {
			const postsData = postsSnapshot.docs.map(post => ({
				id: post.id,
				...post.data(),
			}));
			setPosts(postsData);
		});

		return () => unsub();
	}, []);

	return (
		<div className='posts'>
			{posts.map((post: any) => (
				<div className='post' key={post.id}>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					{post.likes.length && post.likes.includes(user.uid) ? (
						<button className='posts__button' onClick={() => handleRemoveLike(post.id)}>
							{post.likes.length} 🤍 Unlike
						</button>
					) : (
						<button className='posts__button' onClick={() => handleAddLike(post.id)}>
							{post.likes.length} 💖 Like
						</button>
					)}
				</div>
			))}
		</div>
	);
};
