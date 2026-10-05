
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("Nusers").doc(user.uid);
        
        docRef.get().then((doc) => {
         
            if (doc.exists) {
                var userMessages = doc.data().messages;
                console.log("Message data:", userMessages);
                document.getElementById('messageCounter').innerHTML = 'All' + ' ' + userMessages.length;
                console.log(userMessages.length);
                var messagesReverse = userMessages.reverse();
                var userMessagesLog = messagesReverse.map((userMessage) => {
                    //var short = userMessage.messageBody;
                    //var maxLength = 30 ;
                    //var shortMessage = short.substr(0, maxLength) + '...' ;
                    
                    return `<div key=${userMessage.id} >
                    <div class="email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4">
                        <div class="email-short-preview position-relative">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="sender-name">${userMessage.title}</div>
                                <div class="date" style="font-weight: bold;">${userMessage.message_date}</div>
                            </div>
                            <div class="mail-sub" style="font-weight: 300px !important">${userMessage.messageBody}</div>
                            <div class="attached-file-preview d-flex align-items-center mt-15">
                                <div class="file d-flex align-items-center me-2">
                                    <span>${userMessage.attachment}</span>
                                </div>
                            </div>
                        
                        </div>
                    </div>`
                    
                }).join(' ');
    
                
                document.getElementById('userMessagesLog').innerHTML = userMessagesLog;

               
                
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
