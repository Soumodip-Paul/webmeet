import { firebaseConfiguration } from "./firebaseconfig.mjs";

firebase.initializeApp(firebaseConfiguration);
let db = firebase.firestore();
let roomCollection = db.collection('room');
let userCollection = db.collection('user');

const createRoom = async () =>{
  let room = roomCollection.doc();
  await room.set({});
  // let elem = document.createElement('a');
  // elem.href = window.location.href + room.id;
  // elem.click();
  // elem.remove();
  window.location.replace(window.location.href + room.id);
}
document.querySelector('#create_room').addEventListener('click', createRoom);