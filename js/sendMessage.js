const today = new Date();



function sendMessage() {
    console.log('clicked');
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);
        if (user) {
            const db = firebase.firestore();
            var docRef = db.collection("Nusers").doc(user.uid);
            var messageTitle = document.getElementById('messageTitle').value;
            var messageText = document.getElementById('messageText').value;
            if (messageTitle == ' ' || messageText == ' '){
                alert("message can't be empty")
            } else {
                docRef.update({
                    messages: firebase.firestore.FieldValue.arrayUnion(
                        
                        {
                            id: Math.floor(Math.random() * 1000),
                            userId: user.uid,
                            title: messageTitle,
                            messageBody: messageText,
                            message_date: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate(),
                            attachment: ''
                        },
                    )
                    
                 })

                 swal({
                    title: "Message",
                    text: "Message sent successfully, you will recieve a response shortly",
                    icon: "success",
                    button: "Back to Message"
                }).then(function () {
                    window.location.reload()
                })
                 
                
            }
             
        } else {
          // User is signed out
          // ...
        }
    });
}

function resetMessageBody() {
    document.getElementById('messageTitle').value = ' ';
    document.getElementById('messageText').value = ' '
}