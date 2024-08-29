import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken } from "firebase/messaging";


// const firebaseConfig = {
//     apiKey: "AIzaSyAosqmkjq2webzsEAtR91eXLg-xKwZQfvQ",
//     authDomain: "later-10294.firebaseapp.com",
//     projectId: "later-10294",
//     storageBucket: "later-10294.appspot.com",
//     messagingSenderId: "755577978516",
//     appId: "1:755577978516:web:ad9e7ac3f87a9aa03cbe81"
// };
const firebaseConfig = {
    apiKey: "AIzaSyA8Cg36IoZ32uOn5eVZuJvjtjMkMFQCAx0",
    authDomain: "dashodb-7f0af.firebaseapp.com",
    projectId: "dashodb-7f0af",
    storageBucket: "dashodb-7f0af.appspot.com",
    messagingSenderId: "456738692163",
    appId: "1:456738692163:web:e1eaea783843521695c8f6"
  };
  
export const app = initializeApp(firebaseConfig);
export const storage = getFirestore()
export const data = getStorage();
const messaging = getMessaging(app); // Pass the Firebase app instance to getMessaging

const getFCMToken = async () => {
  try {
    // Check if the messaging object has the requestPermission() method
    if (messaging.requestPermission) {
      // Request permission to receive notifications
      await messaging.requestPermission();
    }

    // Get the FCM token
    const fcmToken = await getToken();

    // Log the FCM token
    console.log('FCM Token:', fcmToken);

    return fcmToken;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

getFCMToken(); // Call the function to retrieve the FCM token

export default getFCMToken;
