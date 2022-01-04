import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-AhafVo2YqZG_EPfJ1JqsNp4tKYUsIKc",
    authDomain: "smartrev-storage.firebaseapp.com",
    projectId: "smartrev-storage",
    storageBucket: "smartrev-storage.appspot.com",
    messagingSenderId: "487238724732",
    appId: "1:487238724732:web:57841d9ab92e7559a12df9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };