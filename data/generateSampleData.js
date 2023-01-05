const { LoremIpsum } = require('lorem-ipsum');
const lorem = new LoremIpsum();
const {
    Timestamp,
    GeoPoint,
    writeBatch,
    doc,
} = require('firebase/firestore/lite');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const fs = require('fs/promises');
const {
    uid,
    randEl,
    irange,
    range,
    randomDate,
    db,
    auth,
    adjectives,
    nouns,
} = require('./util');
const types = require('../src/postTypes.js');

const eventTypes = types.events.map(e => e.url);
const placeTypes = types.places.map(p => p.url);

async function main(numUsers, numPosts) {
    // Generate sample users
    console.log('Generating sample users...');
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        const username = randEl(adjectives) + '-' + randEl(nouns);
        const isStudent = Math.random() < 0.5;
        const campus = 'umd';
        const email = `${username}@${
            isStudent
                ? randEl(['umd.edu', 'terpmail.umd.edu'])
                : randEl(['gmail.com', 'hotmail.com', 'yahoo.com'])
        }`;
        const password = 'password';
        const profilePic = `https://source.boringavatars.com/beam/120/${username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;

        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        users.push({
            id: user.uid,
            username,
            isStudent,
            campus,
            email,
            profilePic,
        });
    }

    // Generate sample posts
    console.log('Generating sample posts...');
    const posts = [];

    for (let i = 0; i < numPosts; i++) {
        const isPlace = Math.random() < 0.5;
        posts.push({
            id: uid(),
            comments: Array(irange(0, 15))
                .fill(0)
                .map(() => ({
                    id: uid(),
                    user: randEl(users).id,
                    content: lorem.generateWords(irange(5, 15)),
                    time: Timestamp.fromDate(
                        randomDate(new Date(2020, 1, 1), new Date(2025, 1, 1))
                    ),
                })),
            desc: lorem.generateWords(irange(3, 25)),
            eventTime: Timestamp.fromDate(
                randomDate(new Date(2020, 1, 1), new Date(2025, 1, 1))
            ),
            likes: [
                ...new Set(
                    Array(irange(0, numUsers))
                        .fill(0)
                        .map(() => randEl(users).id)
                ),
            ],
            loc: new GeoPoint(range(38.977, 39.002), range(-76.972, -76.93)),
            nearestLocation: randEl([
                'South Campus Commons 7',
                'South Campus Dining Hall',
                'McKeldin Mall',
                'McKeldin Library',
                'Stamp Center',
                'Iribe Center',
            ]),
            type: isPlace ? 'places' : 'events',
            subtype: [
                ...new Set(
                    Array(irange(1, 2))
                        .fill(0)
                        .map(() =>
                            isPlace ? randEl(placeTypes) : randEl(eventTypes)
                        )
                ),
            ],
            timeCreated: Timestamp.fromDate(
                randomDate(new Date(2020, 1, 1), new Date())
            ),
            timeModified: Timestamp.fromDate(new Date()),
            title: lorem.generateWords(irange(3, 10)),
            user: randEl(users).id,
        });
    }

    // Write to firestore
    console.log('Writing to firestore...');
    const batch = writeBatch(db);

    for (const post of posts) {
        const ref = doc(db, 'posts', post.id);
        batch.set(ref, post);
    }

    for (const user of users) {
        const ref = doc(db, 'users', user.id);
        batch.set(ref, user);
    }

    await batch.commit();
    await fs.writeFile(
        'generated.json',
        JSON.stringify({ posts, users }, null, 2)
    );

    console.log('Done!');
}

main(25, 300);
