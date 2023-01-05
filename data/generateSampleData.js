const { uid, randEl, irange, range, randomDate, db } = require('./util');

const { LoremIpsum } = require('lorem-ipsum');
const lorem = new LoremIpsum();

const {
    Timestamp,
    GeoPoint,
    writeBatch,
    doc,
} = require('firebase/firestore/lite');

const types = require('../src/postTypes.js');
const eventTypes = types.events.map(e => e.url);
const placeTypes = types.places.map(p => p.url);

const adjectives = [
    'shapeless',
    'assured',
    'dazzling',
    'unconscious',
    'temporary',
    'fellow',
    'impossible',
    'specialized',
    'puzzled',
    'gradual',
    'dusty',
    'exhausted',
    'countless',
    'daring',
    'delightful',
    'drastic',
    'waiting',
    'intent',
    'shadowy',
    'battered',
    'naval',
    'educated',
    'urban',
    'pro',
    'ample',
    'distinguished',
    'wooden',
    'following',
    'positive',
    'eligible',
    'organic',
    'formal',
    'sturdy',
    'welcome',
    'rubber',
    'accessible',
    'glorious',
    'complete',
    'previous',
    'cautious',
    'dominant',
    'rational',
    'lousy',
    'regulatory',
    'feminine',
    'cardboard',
    'grave',
    'misleading',
    'rocky',
    'overseas',
    'accustomed',
    'scattered',
    'magnificent',
    'honorable',
    'known',
    'sudden',
    'male',
    'doctoral',
    'overwhelming',
    'full-time',
    'architectural',
    'resourceful',
    'embarrassed',
    'minuscule',
    'direct',
    'curved',
    'controlling',
    'utopian',
    'disorderly',
    'merciful',
    'corporate',
    'heartening',
    'foolish',
    'untenable',
    'junior',
    'primitive',
    'deserted',
    'collected',
    'disastrous',
    'never-ending',
    'calm',
    'fetid',
    'appropriate',
    'unfair',
    'wise',
    'precious',
    'shut',
    'venomous',
    'unaware',
    'obsessed',
    'muddy',
    'brave',
    'illuminated',
    'two-bit',
    'noisy',
    'lost',
    'independent',
    'compact',
    'stored',
    'hazel',
];

const nouns = [
    'slick',
    'glitter',
    'puddle',
    'quake',
    'pearl',
    'handgun',
    'cleavage',
    'blindness',
    'serving',
    'snarl',
    'solace',
    'bedding',
    'reprisal',
    'prohibition',
    'entrepreneur',
    'goblin',
    'fission',
    'protagonist',
    'noun',
    'allusion',
    'cookbook',
    'urn',
    'venom',
    'esteem',
    'gland',
    'hulk',
    'questionnaire',
    'fiasco',
    'wrench',
    'spasm',
    'tack',
    'receipt',
    'jargon',
    'rapture',
    'heading',
    'backup',
    'hiss',
    'flutist',
    'freeway',
    'liner',
    'chord',
    'spiral',
    'crate',
    'healer',
    'seduction',
    'expressway',
    'fad',
    'lark',
    'mosque',
    'windmill',
    'carnival',
    'billboard',
    'coral',
    'future',
    'clump',
    'make-up',
    'extent',
    'leash',
    'stunt',
    'recreation',
    'proximity',
    'pal',
    'link',
    'imperialism',
    'documentary',
    'gutter',
    'porter',
    'slogan',
    'reminder',
    'boardwalk',
    'paradigm',
    'accountant',
    'psychologist',
    'republic',
    'shudder',
    'waitress',
    'cellar',
    'radar',
    'superpower',
    'hood',
    'liar',
    'amateur',
    'jeopardy',
    'terminal',
    'cure',
    'thorn',
    'heartland',
    'transport',
    'candy',
    'son-in-law',
    'graduation',
    'pasture',
    'blur',
    'sting',
    'stairwell',
    'agenda',
    'sanctuary',
    'pigment',
    'orthodoxy',
    'indictment',
];

function generateSampleData(numUsers, numPosts) {
    // Generate users
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        const username = randEl(adjectives) + '-' + randEl(nouns);
        users.push({
            id: uid(),
            username: username,
            profilePic: `https://source.boringavatars.com/beam/120/${username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
            followers: [],
            following: [],
            saved: [],
        });
    }

    // Generate posts
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

    // Generate followers, following, and saved
    for (let i = 0; i < numUsers; i++) {
        const followers = [
            ...new Set(
                Array(irange(0, numUsers))
                    .fill(0)
                    .map(() => randEl(users).id)
            ),
        ].filter(f => f !== users[i].id);
        users[i].followers = followers;

        for (let j = 0; j < followers.length; j++) {
            users.find(u => u.id === followers[j]).following.push(users[i].id);
        }

        users[i].saved = [
            ...new Set(
                Array(irange(0, numPosts / 2))
                    .fill(0)
                    .map(() => randEl(posts).id)
            ),
        ];
    }

    return { posts, users };
}

async function uploadSampleData({ posts, users }) {
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
}

console.log('generating...');

const data = generateSampleData(25, 300);

console.log('uploading...');

uploadSampleData(data).then(() => console.log('done!'));
