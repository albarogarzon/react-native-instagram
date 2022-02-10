import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgX5QEG7J4WrhxS69ir-ci-d2AQ4FH4UU',
  authDomain: 'react-native-firebase-20c73.firebaseapp.com',
  projectId: 'react-native-firebase-20c73',
  storageBucket: 'react-native-firebase-20c73.appspot.com',
  messagingSenderId: '260385971213',
  appId: '1:260385971213:web:173803e7644f6147de4944',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
