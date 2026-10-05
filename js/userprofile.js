var dashEmail = document.getElementById('dashEmail');

var dashUsername = document.getElementById('dashUsername');
var dashUsernam = document.getElementById('dashUsernam');
var profileUsername = document.getElementById('profileUsername');
var dashBalance = document.getElementById('dashBalance');
var dashEarnings = document.getElementById('dashEarnings');
var dashReturns = document.getElementById('dashReturns');
var profilePics = document.getElementById('profile-pics');


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
      var uid = user.uid;
      const db = firebase.firestore();
      var docRef = db.collection("Nusers").doc(uid);
      // ...
      docRef.get().then((doc) => {
        if (doc.exists) {
            var userDetails = doc.data();
            console.log("Document data:", userDetails);
           
            var upper = userDetails.username[0].toUpperCase() + userDetails.username.slice(1);
          
            dashUsername.innerHTML = 'Hello,' + ' ' + upper;
            
            dashBalance.innerHTML = '$'+ userDetails.wallet;
         
            dashEarnings.innerHTML = '$'+ userDetails.bonus;
            //dashEmail.innerHTML = userDetails.email;
            //dashUsernam.innerHTML = upper;
            dashReturns.innerHTML = '$' + (userDetails.wallet + userDetails.bonus);

            profilePics.src = userDetails.imageUrl;
           
            
            
    
            //profileUsername.setAttribute('placeholder', userDetails.username);
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



/*docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
*/
