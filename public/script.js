const socket = io('/') ;
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
const main__left = document.querySelector(".main__left");
const main__right = document.querySelector(".main__right");

myVideo.muted = true;

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ]
};


backBtn.addEventListener("click", () => {
  // document.querySelector(".main__left").style.display = "flex";
  // document.querySelector(".main__left").style.flex = "1";
  // document.querySelector(".main__right").style.display = "none";
  // document.querySelector(".header__back").style.display = "none";

  if (main__right.style.display === "none"){
    main__right.style.display = "flex"
    main__right.style.flex = "0.3"
    main__left.style.flex ="0.7" 
  }
  else {
    main__right.style.display = "none"
    main__left.style.flex ="1" 
  }
  backBtn.classList.toggle('rotated')
});
backBtn.click();
showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

const user = prompt("Enter your name");

let constraints = {
  audio: true,
  video: {
  width: {
      max: 1920
  },
  height: {
      max: 1080
  },
  
  }
}

let peer = new Peer(configuration)

let myVideoStream;
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
    console.log("stream");
    socket.on("user-connected", (userId,socket_id) => {
      connectToNewUser(userId, stream,socket_id);
    });
  });

const connectToNewUser = (userId, stream,socket_id) => {
  console.log(userId)
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  video.id = socket_id
  call.on("stream", (userVideoStream) => {
    console.log(userVideoStream + userId)
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});

socket.on('removePeer', socket_id => {
  console.log('removing peer ' + socket_id)
  removePeer(socket_id)
})

function removePeer(socket_id) {

  let videoEl = document.getElementById(socket_id)
  if (videoEl) {

      const tracks = videoEl.srcObject.getTracks();

      tracks.forEach(function (track) {
          track.stop()
      })

      videoEl.srcObject = null
      videoEl.parentNode.removeChild(videoEl)
  }
  //if (peers[socket_id]) peers[socket_id].destroy()
  // delete peers[socket_id]
}
function setScreen(){
  navigator.mediaDevices.getDisplayMedia(constraints). then(stream =>
  {})
}