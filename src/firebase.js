import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyArF_pW6rEJXsSLzuiArj-u7qtHD2WPiMo",
    authDomain: "bt3103-week-6-8a96b.firebaseapp.com",
    projectId: "bt3103-week-6-8a96b",
    storageBucket: "bt3103-week-6-8a96b.appspot.com",
    messagingSenderId: "1085356511287",
    appId: "1:1085356511287:web:ebd589b424a8b4becaefb2",
    measurementId: "G-X69WVEEQC7"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;