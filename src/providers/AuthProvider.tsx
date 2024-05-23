import { ReactNode, createContext, useContext, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../main';

type AuthContextType = {
	user: User | null;
	handleSignIn: () => void;
	handleSignOut: () => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	handleSignIn: () => {},
	handleSignOut: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUserData] = useState<User | null>(null);

	onAuthStateChanged(auth, user => {
		if (user) {
			setUserData(user);
		} else {
			setUserData(null);
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

	return <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const auth = useContext(AuthContext);

	if (!auth) {
		throw Error('useAuth needs to be used inside AuthContext Provider');
	}

	return auth;
};
