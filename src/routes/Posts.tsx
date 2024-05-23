import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore';
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
	const { user } = useAuth();

	const handleAddLike = async (postId: string) => {
		const postRef = doc(db, 'posts', postId);
		try {
			await updateDoc(postRef, {
				likes: arrayUnion(user?.uid),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveLike = async (postId: string) => {
		const postRef = doc(db, 'posts', postId);
		try {
			await updateDoc(postRef, {
				likes: arrayRemove(user?.uid),
			});
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const posts = await getDocs(collection(db, 'posts'));
	// 			const postsData = posts.docs.map(post => ({
	// 				id: post.id,
	// 				...(post.data() as postDataType),
	// 			}));
	// 			setPosts(postsData);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, []);

	useEffect(() => {
		const postsQuery = query(collection(db, 'posts'));
		const unsub = onSnapshot(postsQuery, postsSnapshot => {
			const postsData = postsSnapshot.docs.map(post => ({
				id: post.id,
				...(post.data() as postDataType),
			}));
			setPosts(postsData);
		});

		return () => unsub();
	}, []);

	return (
		<div className='posts'>
			{posts.length
				? posts.map(post => (
						<div className='post' key={post.id}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
							{post.likes.length && post.likes.includes(user!.uid) ? (
								<button className='posts__button' onClick={() => handleRemoveLike(post.id)}>
									{post.likes.length} 💖 Unlike
								</button>
							) : (
								<button className='posts__button' onClick={() => handleAddLike(post.id)}>
									{post.likes.length} 🤍 Like
								</button>
							)}
						</div>
				  ))
				: null}
		</div>
	);
};
