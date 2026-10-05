
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("Nusers").doc(user.uid);
        
        docRef.get().then((doc) => {
         
            if (doc.exists) {
                var userMessages = doc.data().messages;
                console.log("Message data:", userMessages);
                var recentMessages = userMessages.slice(Math.max(userMessages.length - 3, 0)).reverse();
                console.log(recentMessages.length);
                var recentMessagesLog = recentMessages.map((recentMessage) => {
                    
                    return `<div key=${recentMessage.id}>
                    <div class="email-list-item read border-0 pt-0">
                        <div class="email-short-preview position-relative">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="sender-mail">${recentMessage.title}</div>
                                <div class="date">${recentMessage.message_date}</div>
                            </div>
                           
                            <div class="mail-text">${recentMessage.messageBody}</div>
                            <div class="attached-file-preview d-flex align-items-center mt-15">
                                <div class="file d-flex align-items-center me-2">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    
                }).join(' ');
    
                
                document.getElementById('recentMessagesLog').innerHTML = recentMessagesLog;

               
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

            
        
    } else {
        // User is signed out
        // ...
    }
            
    
});

function expandMessage(){

}
