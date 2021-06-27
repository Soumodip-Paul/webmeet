import firebase from "firebase"
import "@firebase/firestore"
import { firebaseConfiguration } from "../public/js/firebaseconfig.mjs";

console.log(firebaseConfiguration);
console.log('hi')
firebase.initializeApp(firebaseConfiguration);
let db = firebase.firestore();
let roomCollection = db.collection('room');
let userCollection = db.collection('user');

export const database =async (req,res) =>
{
  let id = req.params.room;
  let room =await roomCollection.doc(id).get();
  if (room.exists) res.render("room", { roomId: req.params.room });
  else res.render("404", { roomId: req.params.room });
}