//YOUR FIREBASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyBqE0mPjDEylTWnXIzMWqlUplBu0tx-EeA",
    authDomain: "kwitter-36ce5.firebaseapp.com",
    databaseURL: "https://kwitter-36ce5-default-rtdb.firebaseio.com",
    projectId: "kwitter-36ce5",
    storageBucket: "kwitter-36ce5.appspot.com",
    messagingSenderId: "299204004875",
    appId: "1:299204004875:web:56e6c4a5693c67fece0b0e",
    measurementId: "${config.measurementId}"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("Username");
room_name = localStorage.getItem("Roomname");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        Name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code

                //End code
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Roomname");
    window.location = "main.html";
}
