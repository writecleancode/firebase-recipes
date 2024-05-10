import { useAuth } from '../providers/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';

export const Root = () => {
	const { user, handleSignIn, handleSignOut } = useAuth();

	return (
		<div>
			<h1>Hello {user ? user.displayName : 'world'}!</h1>
			<button onClick={handleSignIn}>Sign in</button>
			<button onClick={handleSignOut}>Sign Out</button>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/posts'>Posts</NavLink>
			<Outlet />
		</div>
	);
};
