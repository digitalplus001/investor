

var provider = new firebase.auth.GoogleAuthProvider();

function signWithGoogle(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
    console.log(user);

    window.location.href = "./dashboard/dashboard-index.html"
    // var today = new Date();

    // db.collection("Nusers").doc(user.uid).set({
    //     username: user.name,
    //     email: user.email,
    //     userId: user.uid,
    //     wallet: 0,
    //     bonus: 0,
    //     roi: 0,  
    //     created_at: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()
    // })
    // swal({
    //     title: "Sign Up",
    //     text: "Account Creation Successful",
    //     icon: "success",
    //     button: "Proceed to Dashboard"
    // }).then(function () {
    //     window.location.href = "./dashboard/dashboard-index.html"
    // })
    // user.sendEmailVerification().then(function() {
    //     alert('An email with a verification code has been sent to your registered email address');
    //   }).catch(function(error) {
    //     console.log(error.message);
    // });
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    alert(email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}