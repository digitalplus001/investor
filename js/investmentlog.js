
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("Nusers").doc(user.uid);
        
        docRef.get().then((doc) => {
         
            if (doc.exists) {
                var investment = doc.data().investments;
                console.log("Document data:", investment);
                var investmentReverse = investment.reverse();

                var investmentLog = investmentReverse.map((invest) => {
                    return `<div key=${invest.id}>
                        <table class="table">
                            <thead  class="tableHead"  >
                                <tr style="background-color:#000 !important; color:#fff !important; font-size: 15px;">
                                <th scope="col">#Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Returns/day</th>
                                <th scope="col">Maturity</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr style="font-size: 13px;">
                                <td>${invest.id}</th>
                                <td>$${invest.amount}</td>
                                <td>$${invest.profit}</td>
                                <td>${invest.maturity_date}</td>
                                <td class="depositStatus">${invest.investStatus}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
                }).join(' ');
                document.getElementById('displayInvestLog').innerHTML = investmentLog;
                
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
