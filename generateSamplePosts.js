const { LoremIpsum } = require('lorem-ipsum');
const lorem = new LoremIpsum();

const {
    Timestamp,
    GeoPoint,
    doc,
    writeBatch,
    getFirestore,
} = require('firebase/firestore/lite');

const types = require('./src/postTypes.js');
const eventTypes = types.events.map(e => e.url);
const placeTypes = types.places.map(p => p.url);

const { initializeApp } = require('@firebase/app');

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

function generateSamplePosts(num) {
    const posts = [];

    for (let i = 0; i < num; i++) {
        const isPlace = Math.random() < 0.5;
        posts.push({
            id: uid(),
            comments: Array(irange(0, 15))
                .fill(0)
                .map(() => lorem.generateWords(irange(5, 15))),
            desc: lorem.generateWords(irange(3, 25)),
            eventTime: Timestamp.fromDate(
                randomDate(new Date(2020, 1, 1), new Date(2025, 1, 1))
            ),
            likes: irange(0, 100),
            loc: new GeoPoint(range(38.977, 39.002), range(-76.972, -76.93)),
            nearest_location: randEl([
                'South Campus Commons 7',
                'South Campus Dining Hall',
                'McKeldin Mall',
                'McKeldin Library',
                'Stamp Center',
                'Iribe Center',
            ]),
            type: isPlace ? 'places' : 'events',
            subtype: Array(irange(1, 2))
                .fill(0)
                .map(() => (isPlace ? randEl(placeTypes) : randEl(eventTypes))),
            timeCreated: Timestamp.fromDate(new Date()),
            timeModified: Timestamp.fromDate(new Date()),
            title: lorem.generateWords(irange(3, 10)),
            user: randEl([
                'testify-badlands',
                'amuck-tidings',
                'form-sample',
                'elegant-pose',
                'workshop-derive',
                'cod-nice',
                'cornflower-cot',
                'repeat-cross',
                'finance-malicious',
                'sugarplum-chamber',
                'attach-incentive',
                'wander-unbecoming',
                'girlguide-shower',
                'position-dogfish',
                'debris-malin',
                'scold-toilet',
            ]),
        });
    }

    return posts;
}

async function uploadPosts(posts) {
    const batch = writeBatch(db);

    for (const post of posts) {
        const ref = doc(db, 'sample', post.id);
        batch.set(ref, post);
    }

    await batch.commit();
}

console.log('generating...');
const posts = generateSamplePosts(15);
console.log('uploading...');
uploadPosts(posts).then(() => console.log('done!'));
