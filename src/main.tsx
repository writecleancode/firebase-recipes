import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { AuthProvider } from './providers/AuthProvider';
import { Root } from './routes/Root';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { Posts } from './routes/Posts';
import './main.styles.scss';

const firebaseConfig = {
	apiKey: 'AIzaSyCADj3V-1hfxVB2BEgDCWlbrvei2LMLDHY',
	authDomain: 'fir-recipes-fbe67.firebaseapp.com',
	projectId: 'fir-recipes-fbe67',
	storageBucket: 'fir-recipes-fbe67.appspot.com',
	messagingSenderId: '895150143193',
	appId: '1:895150143193:web:b4a26c7472ac3f2145b0c8',
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);

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
	// <React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	// </React.StrictMode>
);
