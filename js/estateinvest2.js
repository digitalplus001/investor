
//var today = new Date();
//var priorDate = new Date(new Date().setDate(today.getDate() + 30));

//console.log(today);
//console.log(priorDate);


function estateInvest2() {
    var estateInvest2Amount = document.getElementById('estateInvest1Amount').value;
    var tonumber = parseInt(estateInvest2Amount);
    if(tonumber >= 5000){
        var investReturn = (tonumber * 0.006);
        var rounded = Math.round(investReturn * 10) / 10;
        var roundReturn = tonumber + (investReturn * 56);
        var roundedReturn = Math.round(roundReturn * 10) / 10;
        //var returnsOnInvestment = (tonumber * 0.006)
        document.getElementById('totalReturn').innerHTML = investReturn;
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user.uid);
            if (user) {
                const db = firebase.firestore();
                var docRef = db.collection("Nusers").doc(user.uid);
                var today = new Date();
                var priorDate = new Date(new Date().setDate(today.getDate() + 122));
                var formatPriorDate = priorDate.toLocaleDateString("en-US");
               
                docRef.update({
                    investments: firebase.firestore.FieldValue.arrayUnion(
                        
                        {
                            id: Math.floor(Math.random() * 1000),
                            userId: user.uid,
                            amount: tonumber,
                            profit: rounded,
                            returnsOnInvestment: roundedReturn,
                            maturity_date: '122 Days',
                            investStatus: 'Pending',
                            typeOfInvestment: 'Commercial',
                            invest_date: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate(),
                        },
                    )
                    
                })
                
                swal({
                    title: "Commercial Investment",
                    text: "Commercial investment successful awaiting approval",
                    icon: "success",
                    button: "Back to investment"
                }).then(function () {
                    window.location.reload()
                })
                
                 
            } else {
              // User is signed out
              // ...
            }
        });
    } else {
        alert('Minimum Invest Amount must be $5000')
    }
}

