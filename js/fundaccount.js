const today = new Date();

function submitPayment() {
    console.log('clicked');
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);
        if (user) {
            const db = firebase.firestore();
            var docRef = db.collection("Nusers").doc(user.uid);
            var fundAmount = document.getElementById('fundAmount').value;
            var paymentType = document.getElementById('paymentSelect').value;
            var paymentValue = parseInt(fundAmount)
            console.log(typeof(paymentValue));
            if (fundAmount == '' || fundAmount < 500){
                swal({
                    title: "Deposit",
                    text: "Minimum deposit is $500",
                    icon: "error",
                    button: "Back to deposit"
                }).then(function () {
                    window.location.reload()
                })
                
            } else {
                docRef.update({
                    deposits: firebase.firestore.FieldValue.arrayUnion(
                        
                        {
                            id: Math.floor(Math.random() * 1000),
                            userId: user.uid,
                            amount: paymentValue,
                            paymentType: paymentType,
                            payment_date: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate(),
                            paymentStatus: 'Pending'
                        },
                    )
                    
                 });
                 swal({
                    title: "Deposit",
                    text: "Deposit successful awaiting approval",
                    icon: "success",
                    button: "Back to deposit"
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