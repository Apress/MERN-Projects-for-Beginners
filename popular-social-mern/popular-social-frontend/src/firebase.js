import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDvjzX9G8ClFS79N9164r8RkR1rOEe79lc",
    authDomain: "popular-social-mern.firebaseapp.com",
    projectId: "popular-social-mern",
    storageBucket: "popular-social-mern.appspot.com",
    messagingSenderId: "190413428522",
    appId: "1:190413428522:web:00a8a8a5fdfc757142f053"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db