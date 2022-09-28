import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBC9Q9HznZkA1lYYEtiXy3L3gVpMIyXmkA',
  authDomain: 'twitter-clone-ce238.firebaseapp.com',
  projectId: 'twitter-clone-ce238',
  storageBucket: 'twitter-clone-ce238.appspot.com',
  messagingSenderId: '380938046204',
  appId: '1:380938046204:web:6a87ddbf5515e8a7e4a579',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
