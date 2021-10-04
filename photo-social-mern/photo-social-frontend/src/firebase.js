import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDRE5AZ3ot5xNpsyPPpAhqgsxZDee8KhnY",
    authDomain: "photo-social-mern.firebaseapp.com",
    projectId: "photo-social-mern",
    storageBucket: "photo-social-mern.appspot.com",
    messagingSenderId: "520411017059",
    appId: "1:520411017059:web:b9d329ef1ec76aac8d2d56"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }