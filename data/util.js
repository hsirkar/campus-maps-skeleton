const { initializeApp } = require('@firebase/app');
const { getFirestore } = require('firebase/firestore/lite');

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function range(min, max) {
    return Math.random() * (max - min) + min;
}

function irange(min, max) {
    return Math.round(range(min, max));
}

function randEl(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

function arr(generator, minLen, maxLen) {
    return Array(maxLen ? irange(minLen, maxLen) : minLen)
        .fill(0)
        .map(generator);
}

function uarr(generator, minLen, maxLen) {
    return [...new Set(arr(generator, minLen, maxLen))];
}

module.exports = { app, db, range, irange, randEl, randomDate, uid, arr, uarr };
