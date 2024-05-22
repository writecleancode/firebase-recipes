import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { Root } from './routes/Root';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { Posts } from './routes/Posts';
import './main.styles.scss';

const firebaseConfig = {
	apiKey: 'AIzaSyDOf6V9R13LJjiecO2fntrjyoUFmC0MMP8',
	authDomain: 'fir-test2-dbc70.firebaseapp.com',
	projectId: 'fir-test2-dbc70',
	storageBucket: 'fir-test2-dbc70.appspot.com',
	messagingSenderId: '99550911878',
	appId: '1:99550911878:web:d83652c2872990321da007',
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route index element={<p>Hello React Router!</p>} />
			<Route path='posts' element={<ProtectedRoute />}>
				<Route index element={<Posts />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
