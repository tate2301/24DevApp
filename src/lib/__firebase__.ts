// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGivGDJkfa9ed4h4JmOvE0VwYOj4yll-8',
  authDomain: 'devapp-7aee5.firebaseapp.com',
  projectId: 'devapp-7aee5',
  storageBucket: 'devapp-7aee5.appspot.com',
  messagingSenderId: '793713633558',
  appId: '1:793713633558:web:e538ceb3d70cd47e1d4837',
  measurementId: 'G-J6E4S0915N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
