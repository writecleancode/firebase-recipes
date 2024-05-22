import { useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './main';

export const Root = () => {
	const [user, setUser] = useState<User | null>(null);

	onAuthStateChanged(auth, user => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
	});

	const handleSignIn = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Hello {user ? user.displayName : 'world!'}</h1>
			<button onClick={handleSignIn}>Sign in</button>
			<button onClick={handleSignOut}>Sign out</button>
			{user ? (
				<div>
					<h2>Posts</h2>
					<h3>Lorem ispum</h3>
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
				</div>
			) : null}
		</div>
	);
};
