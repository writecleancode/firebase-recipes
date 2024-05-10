import { createContext, useContext, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../main';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
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

	return <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const auth: any = useContext(AuthContext);

	if (!auth) {
		throw Error('useAuth needs to be used inside AuthContext Provider');
	}

	return auth;
};
