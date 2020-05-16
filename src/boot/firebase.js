import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
	apiKey: "AIzaSyCU4WC3NTmQiVnFkUS-9v1Fem86ZDk7ZQQ",
	authDomain: "dentalwarehouse-87192.firebaseapp.com",
	databaseURL: "https://dentalwarehouse-87192.firebaseio.com",
	projectId: "dentalwarehouse-87192",
	storageBucket: "dentalwarehouse-87192.appspot.com",
	messagingSenderId: "606052494026",
	appId: "1:606052494026:web:c80feedc743dd73352a233",
	measurementId: "G-KVZ3W40HRH"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();
let firebaseStorage = firebaseApp.firestore();
let firebaseImageStorage = firebaseApp.storage();
export
{
	firebaseAuth,
	firebaseDb,
	firebaseStorage,
	firebaseImageStorage
}
