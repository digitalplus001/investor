function changePassword() {
    
    //var oldPassword = document.getElementById('oldPassword').value;
    
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
            var newPassword1 = document.getElementById('newPassword1').value;
            var newPassword2 = document.getElementById('newPassword2').value;
        
            if(newPassword1 === newPassword2) {
                console.log(newPassword1)
                user.updatePassword(newPassword1).then(() => {
                    // Update successful
                      swal({
                        title: "Password",
                        text: "Password updated successfully",
                        icon: "success",
                        button: "Back to profile"
                    }).then(function () {
                        window.location.href = "../dashboard/account-settings.html"
                    })
                  }).catch((error) => {
                    alert(error.message)
                  }); 
            } else {
              swal({
                title: "Password",
                text: "Password do not match",
                icon: "error",
                button: "Try again"
            }).then(function () {
                window.location.location()
            })
            }
        } else {
          // User is signed out
          // ...
        }
    });
    
}








