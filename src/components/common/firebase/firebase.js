import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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

    app.initializeApp(firebaseConfig)
    firebaseCache = app
    return app
}

export default getFirebase