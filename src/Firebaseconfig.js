import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAgGS7HCJENK9kkuPHDKPNlSfj2OoHHde4",
    authDomain: "campus-recruitment-system-cr.firebaseapp.com",
    databaseURL: "https://campus-recruitment-system-cr.firebaseio.com",
    projectId: "campus-recruitment-system-cr",
    storageBucket: "campus-recruitment-system-cr.appspot.com",
    messagingSenderId: "864262446127"
};
const firebaseconfig = firebase.initializeApp(config);

export default firebaseconfig;