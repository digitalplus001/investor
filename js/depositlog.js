
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("Nusers").doc(user.uid);
        
        docRef.get().then((doc) => {
         
            if (doc.exists) {
                var userDeposits = doc.data().deposits;
                console.log("Document data:", userDeposits);
                var depositReverse = userDeposits.reverse();
                var displayDepositLog = depositReverse.map((userDeposit) => {
                    return `<div key=${userDeposit.id}>
                        <table class="table">
                            <thead  class="tableHead">
                                <tr style="background-color:#000 !important; color:#fff !important; font-size: 15px;">
                                <th scope="col">#Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr style="font-size: 13px;">
                                <td>${userDeposit.id}</th>
                                <td>$${userDeposit.amount}</td>
                                <td>${userDeposit.paymentType}</td>
                                <td>${userDeposit.payment_date}</td>
                                <td class="depositStatus">${userDeposit.paymentStatus}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
                }).join(' ');
                document.getElementById('displayDepositLog').innerHTML = displayDepositLog;
                
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
