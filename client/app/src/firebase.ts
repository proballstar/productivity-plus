import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAirohKLM_N6qo6cf_n0Nhv4J3xh3iYSvU",
  authDomain: "food-distr.firebaseapp.com",
  projectId: "food-distr",
  storageBucket: "food-distr.appspot.com",
  messagingSenderId: "16927179914",
  appId: "1:16927179914:web:00a961cc47559f15c89973",
  measurementId: "G-2B19KF4EQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }