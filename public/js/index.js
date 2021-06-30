firebase.initializeApp(firebaseConfiguration);
const header = document.querySelector("header");
let db = firebase.firestore();
let currentUser;
let roomCollection = db.collection('room');
let userCollection = db.collection('user');
const showToast = (html) => {
  let toast = document.createElement('div');
  toast.innerHTML = html;
  toast.classList.add('toast','show');
  document.body.append(toast)
  setTimeout(()=> {
    toast.classList.remove('show');
    setTimeout(()=> toast.remove(),1000)
  },3000);
}

showToast('hi');

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
/**
 * Firebase User functions
*/
const updateUser = (user) =>{
  if(user)
  document.getElementById('user-img').src = user.photoURL;
  else 
  document.getElementById('user-img').src = "./assets/svg/user.svg"
}

firebase.auth().onAuthStateChanged((user) => {
  currentUser = user;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    updateUser(user);
    // ...
  } else {
    // User is signed out
    updateUser(null);
    // ...
  }
});

const logOut = () => firebase.auth().signOut();

const getCurrentUser = () =>{
  const user = firebase.auth().currentUser;
//  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    // const uid = user.uid;
    //updateUser(user);
    
//  }
  return user;}

const googleSignIn = () =>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    updateUser(user);
    
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

document.getElementById('user-img').addEventListener('click',()=>{
  console.log(currentUser);
  if (currentUser) logOut()
  else googleSignIn()
})

const scrollEffect = (height) => {
  let y = window.pageYOffset;
  
  if (y > height) {
    header.style.height = '20vh';
    header.style.borderRadius = '0 0 0 0'
    header.classList.add('small-header');
  }
  
  else{
    header.style.height = `${height}vh`
    header.style.borderRadius = '0 0 12px 12px'
    header.classList.remove('small-header');
  }
};

window.onscroll =() => scrollEffect(65);

window.onload = () => {
  currentUser = getCurrentUser();
  updateUser(currentUser);
};