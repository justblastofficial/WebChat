var firebaseConfig = {
    apiKey: "AIzaSyDHJS7AsTYwtnwQp8WZZnmooxVfqZRrHRE",
    authDomain: "socialapp-10b59.firebaseapp.com",
    databaseURL: "https://socialapp-10b59.firebaseio.com",
    projectId: "socialapp-10b59",
    storageBucket: "socialapp-10b59.appspot.com",
    messagingSenderId: "1045300534404",
    appId: "1:1045300534404:web:0da1c59d1467fd73a336d1",
    measurementId: "G-71KCH6KDW7"
  };
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

    var myName = prompt("Enter your name");
    function sendMessage() {
		// get message
		var message = document.getElementById("message").value;

		// save in database
		firebase.database().ref("messages").push().set({
			"sender": myName,
			"message": message
		});

		// prevent form from submitting
		return false;
	}
    firebase.database().ref("messages").on("child_added", function (snapshot){
        var html = "";
        html += "<li id='message-" + snapshot.key + "'>";
          if (snapshot.val().sender == myName) {
              html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                html += "Delete";
              html += "</button>";
          }
          html += snapshot.val().sender + ":" + snapshot.val().message;
        html += "</li>";

        document.getElementById("messages").innerHTML += html;
    });
    function deleteMessage(self) {
	// get message ID
	var messageId = self.getAttribute("data-id");

	// delete message
	firebase.database().ref("messages").child(messageId).remove();
}

// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
	// remove message node
	document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
});