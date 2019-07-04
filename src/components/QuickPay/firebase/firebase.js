import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBV3l7Oof-jo0Og_mElvbFzKqNNpY2NB0M",
    authDomain: "evergov-dev3.firebaseapp.com",
    databaseURL: "https://evergov-dev3.firebaseio.com",
    projectId: "evergov-dev3",
    storageBucket: "evergov-dev3.appspot.com",
    messagingSenderId: "1073516806217",
    appId: "1:1073516806217:web:4fbc0065253ec88c"
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