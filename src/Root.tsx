import { useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './main';

export const Root = () => {
	const [user, setUserData] = useState<any>(null);

	onAuthStateChanged(auth, user => {
		if (user) {
			setUserData(user);
		} else {
			setUserData(null);
		}
	});

	const handleSignIn = async () => {
		try {
			const authResult = await signInWithPopup(auth, provider);
			console.log(authResult.user);
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
			<h1>Hello {user ? user.displayName : 'world'}!</h1>
			<button onClick={handleSignIn}>Sign in</button>
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
};
