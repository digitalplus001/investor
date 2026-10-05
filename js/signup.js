// $(document).ready(function () {
//     $("#spinner").hide()
// })


// const registerBtn = document.getElementById("signup").onclick = ((e) => {
//     e.preventDefault()
//     console.log('clicked')

//     const username = document.getElementById("username-signup").value
//     const password = document.getElementById("password-signup").value

//     //const re_password = document.getElementById("re_pass").value
//     const email = document.getElementById("email-signup").value


//     // verify username
//     if (username.length >= 20 || username.length <= 3) {
//         $("#username-signup").css("border", "solid red 2px");
//         $("#error-name").text("Username must be atleast 4 characters and less than 20 characters.")
//         return false
//     }


//     if (password.length < 6) {
//         $("#password-signup").css("border", "solid red 2px");
//         $("#error-pass").text("Password must be atleast 6 characters")
//         return false
//     }

//     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
//         $("#email-signup").css("border", "solid red 2px")
//         $("#error-email").text("Invalid email address format")
//         return false
//     }

//     /*if (password !== re_password) {
//         $("#pass").css("border-bottom", "solid red 2px")
//         $("#re_pass").css("border-bottom", "solid red 2px")
//         $("#error-pass").text("Passwords do not match")
//         $("#error-re_pass").text("Passwords do not match")
//         return false
//     }*/


//     firebase.firestore().collection("Nusers").where("username", "==", username)
//         .get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 if (doc.data().username === username) {
//                 $("#name").css("border", "solid red 2px");
//                     $("#error-name").text("Username already exists, please choose a different one.")
//                     return false
//             }
//         })
//         }).catch(error => {
//             console.log("Unable to fetch document", error)
//         })
    
    
//     {
//         $("#signup").hide()
//         $("#spinner").show()

//         const today = new Date()
        
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then((userCredentials) => {
//                 db.collection("Nusers").doc(userCredentials.user.uid).set({
//                     username: username,
//                     email: email,
//                     userId: userCredentials.user.uid,
//                     wallet: 0,
//                     bonus: 0,
//                     roi: 0,  
//                     created_at: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()
//                 })

//                 swal({
//                     title: "Sign Up",
//                     text: "Account Creation Successful",
//                     icon: "success",
//                     button: "Proceed to Dashboard"
//                 }).then(function () {
//                     window.location.href = "./dashboard/dashboard-index.html"
//                 })
//             }).catch(error => {
//                 $("#email").css("border-bottom", "solid red 2px")
//                 $("#error-email").text(error.message)
//                 $("#spinner").hide()
//                 $("#signup").show()
//                 return false
//         })
//     }

// })


$(document).ready(function () {
    $("#spinner").hide()
})


const registerBtn = document.getElementById("signup").onclick = ((e) => {
    e.preventDefault()
    console.log('clicked')

    const username = document.getElementById("username-signup").value
    const password = document.getElementById("password-signup").value

    //const re_password = document.getElementById("re_pass").value
    const email = document.getElementById("email-signup").value


    // verify username
    if (username.length >= 20 || username.length <= 3) {
        $("#username-signup").css("border", "solid red 2px");
        $("#error-name").text("Username must be atleast 4 characters and less than 20 characters.")
        return false
    }


    if (password.length < 6) {
        $("#password-signup").css("border", "solid red 2px");
        $("#error-pass").text("Password must be atleast 6 characters")
        return false
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        $("#email-signup").css("border", "solid red 2px")
        $("#error-email").text("Invalid email address format")
        return false
    }

    /*if (password !== re_password) {
        $("#pass").css("border-bottom", "solid red 2px")
        $("#re_pass").css("border-bottom", "solid red 2px")
        $("#error-pass").text("Passwords do not match")
        $("#error-re_pass").text("Passwords do not match")
        return false
    }*/


    firebase.firestore().collection("Nusers").where("username", "==", username)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().username === username) {
                $("#name").css("border", "solid red 2px");
                    $("#error-name").text("Username already exists, please choose a different one.")
                    return false
            }
        })
        }).catch(error => {
            console.log("Unable to fetch document", error)
        })
    
    
    {
        $("#signup").hide()
        $("#spinner").show()

        const today = new Date()
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                db.collection("Nusers").doc(userCredentials.user.uid).set({
                    username: username,
                    email: email,
                    userId: userCredentials.user.uid,
                    wallet: 0,
                    bonus: 0,
                    roi: 0,  
                    created_at: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()
                })

                user.sendEmailVerification()
                .then(() => {
                // document.getElementById('message').innerText = "Verification email sent. Please check your inbox.";
                // alert("Verification email sent. Please check your inbox.");
                    swal({
                        title: "Sign Up",
                        text: "Verification sent to your email",
                        icon: "success",
                        button: "Back to home"
                    }).then(function () {
                        window.location.href = "./index.html"
                    })
                })
                .catch((error) => {
                // document.getElementById('message').innerText = "Error sending email: " + error.message;
                // alert("Error sending email: " + error.message);
                 swal({
                        title: "Sign Up",
                        text: "Error sending email verification",
                        icon: "error",
                        button: "Verify"
                    }).then(function () {
                        window.location.href = "./index.html"
                    })
                });

                
            }).catch(error => {
                $("#email").css("border-bottom", "solid red 2px")
                $("#error-email").text(error.message)
                $("#spinner").hide()
                $("#signup").show()
                return false
            })
    }

})