export const init = () => {
	console.log("Attempting to connect to Firebase");
	// Select Firebase services
	let firebase = require("firebase/app");
	require("firebase/auth");
	require("firebase/firestore");
	require("firebase/storage");

	// Initialize Firebase
	// TODO: Replace with your project's customized code snippet
	let config = {
		apiKey: "AIzaSyAMB5lME7Pcl--sMQrWCKLOdsC22kXaYJk",
		authDomain: "dev-match-2018.firebaseapp.com",
		projectId: "dev-match-2018",
		storageBucket: "dev-match-2018.appspot.com",
	};
	firebase.initializeApp(config);
	console.log("Connected to Firebase!")
}