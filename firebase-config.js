import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtiJRPNM-6kw4WY7u7GWXeJQpuv89vqpc",
  authDomain: "chatapp-8f1df.firebaseapp.com",
  projectId: "chatapp-8f1df",
  storageBucket: "chatapp-8f1df.appspot.com",
  messagingSenderId: "816560297114",
  appId: "1:816560297114:web:abacae15dcf0eed2e7bb23",
  measurementId: "G-WTGXF4N801",
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// const storage = getStorage(app);
const db = getFirestore(app);

export { app, db };
