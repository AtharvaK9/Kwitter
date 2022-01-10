// Your web app's Firebase configuration
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
document.getElementById("welcome_user_name").innerHTML = "Welcome " + user_name + "!";

function addroom() {
      room_name = document.getElementById("room_name").value;

      localStorage.setItem("Roomname", room_name);

      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code 
                  console.log("room_name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToroomname(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToroomname(name) {
      console.log(name);
      localStorage.setItem("Roomname", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("Roomname");
      window.location = "index.html";
}