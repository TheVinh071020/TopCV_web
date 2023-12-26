// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaAeuhQ00eBglJ0ze9QW3geD9_hIQKRiU",
  authDomain: "topcv-10a1d.firebaseapp.com",
  projectId: "topcv-10a1d",
  storageBucket: "topcv-10a1d.appspot.com",
  messagingSenderId: "990177762587",
  appId: "1:990177762587:web:94d93458cfd0d3430f87be",
  measurementId: "G-9TWHGGLHPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
