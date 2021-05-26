import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA9IlrF91VbBYecyCDO9-85ibMH0K87sHE",
    authDomain: "fixxcap.firebaseapp.com",
    projectId: "fixxcap",
    storageBucket: "fixxcap.appspot.com",
    messagingSenderId: "1005548033804",
    appId: "1:1005548033804:web:08ab9a105b73174fbc5b29",
    measurementId: "G-ZXSC3G7BPT"
});
// Initialize Firebase
const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
let facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, storage, provider, facebookProvider };
export default app