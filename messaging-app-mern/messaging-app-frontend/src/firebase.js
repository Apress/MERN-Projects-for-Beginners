import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore

const firebaseConfig = {
    apiKey: "AIzaSyA049jF8nVblzoDqrQbtTgo1e8P0WVPVBY",
    authDomain: "messaging-app-mern.firebaseapp.com",
    projectId: "messaging-app-mern",
    storageBucket: "messaging-app-mern.appspot.com",
    messagingSenderId: "836380569421",
    appId: "1:836380569421:web:faa963c69d9de5ff2b1104"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db