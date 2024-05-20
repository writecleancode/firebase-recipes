import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Root } from './Root';

const firebaseConfig = {
	apiKey: 'AIzaSyDEhSy0p9_Z1ZdIQllJLLmgJChA7pqoFz0',
	authDomain: 'fir-test-2105a.firebaseapp.com',
	projectId: 'fir-test-2105a',
	storageBucket: 'fir-test-2105a.appspot.com',
	messagingSenderId: '420600315772',
	appId: '1:420600315772:web:51362e5b6c88ad63a3aef9',
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
