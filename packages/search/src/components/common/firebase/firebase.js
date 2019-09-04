// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';

const windowGlobal = typeof window !== 'undefined' && window

if (windowGlobal){
    var firebase = require('firebase/app');
    require('firebase/auth');
    require('firebase/firestore');
    require('firebase/storage');
}

const firebaseConfig = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DB_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MSG_SENDER_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID
};


let firebaseCache

const getFirebase  = () => {
    if (firebaseCache) {
        return firebaseCache
    }
    if (windowGlobal) {
        firebase.initializeApp(firebaseConfig)
        firebaseCache = firebase
        return firebase
    }
}

export default getFirebase