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
        name: user_name,
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

                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + " <img class = 'user_tick' src = 'tick.png'></h4>";
                message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + like + " onclick = 'updateLike(this.id)'>";
                span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like :  " + like + " </span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}


function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Roomname");
    window.location = "main.html";
}