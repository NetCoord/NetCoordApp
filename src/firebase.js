import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA6D7TEGLuytgjBbLgvvhSn90IpsptPLDM",
  authDomain: "netcoord-us.firebaseapp.com",
  projectId: "netcoord-us",
  storageBucket: "netcoord-us.appspot.com",
  messagingSenderId: "238419129539",
  appId: "1:238419129539:web:fed4ce82adc465e6991e76",
  measurementId: "G-3JJX3TMVYJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const firestore = app.firestore();

export {
  app,
  auth,
  firestore,
  firebase
}
