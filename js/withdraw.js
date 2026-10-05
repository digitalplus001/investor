const today = new Date();

function submitWithdrawal() {
    console.log('clicked');
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);
        if (user) {
            const db = firebase.firestore();
            var docRef = db.collection("Nusers").doc(user.uid);
            var withdrawAmount = document.getElementById('withdrawAmount').value;
            var withdrawType = document.getElementById('withdrawSelect').value;
            var walletAddress = document.getElementById('walletAddress').value;
            var paymentValue = parseInt(withdrawAmount)
            console.log(typeof(withdrawAmount));
            if (withdrawAmount <= 0  || withdrawType == ' ' || walletAddress == ' '){
                alert('Fields can be empty')
            } else {
                docRef.update({
                    withdrawals: firebase.firestore.FieldValue.arrayUnion(
                        
                        {
                            id: Math.floor(Math.random() * 1000),
                            userId: user.uid,
                            amount: paymentValue,
                            withdrawType: withdrawType,
                            walletAddress: walletAddress,
                            withdraw_date: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate(),
                            WithdrawStatus: 'Pending'
                        },
                    )
                    
                 })
                 swal({
                    title: "Withdrawal",
                    text: "Withdraw request successful awaiting approval",
                    icon: "success",
                    button: "Back to Profile"
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