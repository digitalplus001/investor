function forgottenPassword() {
    var emailReset = document.getElementById('resetPassword').value;
    console.log(emailReset);
    firebase.auth().sendPasswordResetEmail(emailReset)
  .then(() => {
    swal({
        title: "Password Reset",
        text: "Password reset instructions sent to your email",
        icon: "success",
        button: "Back to home"
    }).then(function () {
        window.location.href = "index.html"
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

