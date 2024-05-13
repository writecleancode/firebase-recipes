import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import { useAuth } from '../providers/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';
import './Root.styles.scss';

export const Root = () => {
	const { user, handleSignIn, handleSignOut } = useAuth();

	return (
		<div className='layout'>
			<nav className='layout__navigation'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='posts'>Posts</NavLink>
			</nav>
			<div className='layout__login'>
				{user ? (
					<Typography>
						Hello <strong>{user.displayName}</strong>
					</Typography>
				) : null}
				<Button className='layout__button' variant='contained' onClick={handleSignIn}>
					Sign in
				</Button>
				<Button className='layout__button' variant='contained' onClick={handleSignOut}>
					Sign out
				</Button>
			</div>
			<Outlet />
		</div>
	);
};
