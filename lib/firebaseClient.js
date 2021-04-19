import * as firebase from 'firebase/app';
import 'firebase/firestore';

// const firebase = require("firebase"); 
// require('firebase/firestore');

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCRscQ5tfMV6qWGyY2gKZjVtq_etPn5V24",
  authDomain: "turfedup-1a8ee.firebaseapp.com",
  databaseURL: "https://turfedup-1a8ee-default-rtdb.firebaseio.com/",
  projectId: "turfedup-1a8ee",
  storageBucket: "turfedup-1a8ee.appspot.com",
  messagingSenderId: "554614483422",
  appId: "1:554614483422:web:c8cde1d51bc819c629554f",
  measurementId: "G-QKFX04XSE6"
};


export default function firebaseClient() {
    if(!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

}