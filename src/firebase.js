import { initializeApp } from '@firebase/app';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    inMemoryPersistence,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    doc,
    getFirestore,
    setDoc,
} from 'firebase/firestore/lite';


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

// Wrapper functions
export async function login({ email, password, remember }) {
    await setPersistence(
        auth,
        remember ? browserLocalPersistence : inMemoryPersistence
    );
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
}

export async function register({
    email,
    password,
    username,
    isStudent,
    campus,
}) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', user.user.uid), {
        id: user.user.uid,
        email,
        username,
        isStudent,
        profilePic: `https://source.boringavatars.com/beam/120/${username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
        followers: [],
        following: [],
        saved: [],
        campus,
        verified: false,
    });
    return user;
}

export async function signout() {
    return signOut();
}
