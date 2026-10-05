
var profilePics = document.getElementById('pics');
var profilePic1 = document.getElementById('profile-pics');


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
           
           
            profilePics.src = userDetails.imageUrl;
            profilePic1.src = userDetails.imageUrl;
           
            
            
    
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
