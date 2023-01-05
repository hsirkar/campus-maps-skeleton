const { initializeApp } = require('@firebase/app');
const { getAuth, connectAuthEmulator } = require('@firebase/auth');
const {
    getFirestore,
    connectFirestoreEmulator,
} = require('firebase/firestore/lite');

const useEmulator = true;

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
const auth = getAuth(app);
const db = getFirestore(app);

if (useEmulator) {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
}

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

module.exports = {
    app,
    auth,
    db,
    range,
    irange,
    randEl,
    randomDate,
    uid,
    arr,
    uarr,
    adjectives,
    nouns,
};
