# WEBMEET

Video-chat-v1 is a video chat app that makes it easy to groups up with people you want to meet

![IMG](./video-chat.png)

This app is build using NodeJS, Socket.io, and Peerjs(WebRTC) with Firebase as an database 

## How to run the project?

1. Clone this repository in your local system.

2. Open the command prompt from your project directory and run the command `npm start`.

3. Go to your browser and type `http://127.0.0.1:3000/` in the address bar.<br/>`or`<br/>You can type
`localhost:3000` in the address bar .

4. Create a firebase project and then copy the credentials in the path `public/js/firebaseconfig.mjs` like
    <br/>

    ```js
    export const firebaseConfiguration = {
        //...your config file
        //...paste here
    }
    ```

5. Hurray! That's it.

## How to create a firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com "Open f=firebase Console")

2. Click add new Project.

3. Follow the On screen instructions.<br/>
> Note: You donot need to copy the Firebase SDK file as they are included in this project

4. Copy the content inside the `firebaseConfig` 

```js

const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "project-id.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "some id...",
  appId: "app id...",
  measurementId: "some id"
};

```

4. Paste it into the `firebaseconfig.mjs` file inside `firebaseConfiguration` block.

```js
export const firebaseConfiguration = {
    //...your config file
    //...paste here
    }
```

## How to clone this project

***To clone this project***

*   Install git for your Computer<br/>
    Download git from [here](https://git-scm.com/downloads) and install

*   Goto the folder to computer your where you want to clone the project

*   Open `Terminal` (For _Linux_ and _Os X_) or `PowerShell` (for _Windows_)

*   Paste this Command
    ```ps1
    git clone https://github.com/Soumodip-Paul/webmeet.git
    ```

*   This project is cloned in your device

### ToDo

- [x] - Recreate the Front-end with React.

