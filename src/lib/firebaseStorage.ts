// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  UploadTask,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(
  app,
  `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`
);
// Assuming you've initialized Firebase Storage

export async function uploadAvatarToFirebase(file: File): Promise<string> {
  try {
    // register the storage ref
    const storageRef = ref(storage, "avatars/" + file?.name); // Add a path for organization
    const snapshot = await uploadBytes(storageRef, file);

    console.log("File uploaded");

    // get the download url
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return "Server Error";
  }
}

export async function uploadPostImage(file: File): Promise<string>{
  try {
 const storageRef = ref(storage, "posts/" + file?.name);
  const snapshot = await uploadBytes(storageRef, file)

  console.log("files uploaded");

  const downloadUrl = await getDownloadURL(snapshot.ref);
  console.log(downloadUrl);
  return downloadUrl;
  }catch(err){
    console.log(err);
    return 'Server error';
  }
 
}

