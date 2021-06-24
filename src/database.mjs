import firebase from "firebase"
 const firebaseConfig = {
        apiKey: "AIzaSyA9jCW3r2lautg-IrG4vkUSUlW0yt8lmDk",
        authDomain: "webacademy-video-meet.firebaseapp.com",
        projectId: "webacademy-video-meet",
        storageBucket: "webacademy-video-meet.appspot.com",
        messagingSenderId: "673000090587",
        appId: "1:673000090587:web:b91a660a41caf7655895fe",
        measurementId: "G-0GJG5H5MTH"
      };
    console.log('hi')
    firebase.initializeApp(firebaseConfig);
export const database = (req,res) =>
{
   console.log(firebaseConfig)
}