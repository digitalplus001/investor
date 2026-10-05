
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("Nusers").doc(user.uid);
        
        docRef.get().then((doc) => {
         
            if (doc.exists) {
                var userWithdrawals = doc.data().withdrawals;
                console.log("Document data:", userWithdrawals);
                var withdrawReverse = userWithdrawals.reverse();
                var displayWithdrawalLog = withdrawReverse.map((userWithdrawal) => {
                    return `<div key=${userWithdrawal.id}>
                        <table class="table">
                            <thead  class="tableHead">
                                <tr style="background-color:#000 !important; color:#fff !important; font-size: 15px;">
                                <th scope="col">#Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment Type</th>
                                <th scope="col">Address</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr style="font-size: 13px;">
                                <td>${userWithdrawal.id}</th>
                                <td>$${userWithdrawal.amount}</td>
                                <td>${userWithdrawal.withdrawType}</td>
                                <td>${userWithdrawal.walletAddress}</td>
                                <td>${userWithdrawal.withdraw_date}</td>
                                <td class="depositStatus">${userWithdrawal.WithdrawStatus}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
                }).join(' ');
                document.getElementById('displayWithdrawalLog').innerHTML = displayWithdrawalLog;
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                document.getElementById('displayWithdrawalLog').innerHTML = 'No messages';
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            
        
        } else {
            // User is signed out
            // ...
        }
            
    
});
