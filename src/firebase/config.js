import app from 'firebase/app'
import firebase from 'firebase'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAHShz4eRvZzRkaRIk_SJTZ7yvjb4Qr6c",
  authDomain: "react-native-a5dcf.firebaseapp.com",
  projectId: "react-native-a5dcf",
  storageBucket: "react-native-a5dcf.appspot.com",
  messagingSenderId: "656218260826",
  appId: "1:656218260826:web:83d8938549731658b19f63"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();