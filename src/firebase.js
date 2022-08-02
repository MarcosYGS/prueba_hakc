import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDhLb7hSBEJt0kLJyk35In9H5KEOCLfv0",
  authDomain: "prueba-hackathon-42b01.firebaseapp.com",
  projectId: "prueba-hackathon-42b01",
  storageBucket: "prueba-hackathon-42b01.appspot.com",
  messagingSenderId: "608915608088",
  appId: "1:608915608088:web:53924c458591557ead296d"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore();
// const storage = getStorage(firebaseApp);
//export {auth, db, storage};
export {auth};
