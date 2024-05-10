import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Root } from './Root';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
