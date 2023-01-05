import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// See https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: 'AIzaSyBNYzyZz9QTpTZpTWBYyA9YZVpKddYN5zs',
    authDomain: 'campus-maps-53c7c.firebaseapp.com',
    databaseURL: 'https://campus-maps-53c7c-default-rtdb.firebaseio.com',
    projectId: 'campus-maps-53c7c',
    storageBucket: 'campus-maps-53c7c.appspot.com',
    messagingSenderId: '591540730553',
    appId: '1:591540730553:web:ca62a4bcf1d987ed753968',
    measurementId: 'G-X0QNYZD797',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
