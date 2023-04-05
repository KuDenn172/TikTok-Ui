import * as firebase from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAdiVbRPTqHC3Y5oAAJZ0eIGWCqsaRFvp0',
    authDomain: 'tiktokclone-32265.firebaseapp.com',
    databaseURL: 'https://tiktokclone-32265-default-rtdb.firebaseio.com',
    projectId: 'tiktokclone-32265',
    storageBucket: 'tiktokclone-32265.appspot.com',
    messagingSenderId: '647294397621',
    appId: '1:647294397621:web:5cbce3b4e6c161422ba2fc',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const auth = getAuth(app);
// lấy tham chiếu tới dịch vụ lưu trữ của firebase
const storage = getStorage(app);

export { auth, storage };
export default database;
