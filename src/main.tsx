import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { Root } from './routes/Root';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { Posts } from './routes/Posts';
import './main.styles.scss';

const firebaseConfig = {
	apiKey: 'AIzaSyAkFNS1KejjT29wsjWFsAIxg_P_Wy9PpT0',
	authDomain: 'fir-recipes-2-dcfd9.firebaseapp.com',
	projectId: 'fir-recipes-2-dcfd9',
	storageBucket: 'fir-recipes-2-dcfd9.appspot.com',
	messagingSenderId: '178067684354',
	appId: '1:178067684354:web:9ed19603c24abf85d9fb1b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
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
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
