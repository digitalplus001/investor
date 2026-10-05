// $(document).ready(function () {
//     $("#spinner").hide()
// })


// const loginBtn = document.getElementById("signin").onclick = ((e) => {
//     e.preventDefault()

//     const password = document.getElementById("password-signin").value
//     const email = document.getElementById("email-signin").value

//     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
//         $("#email-signin").css("border", "solid red 2px")
//         $("#error-email").text("Invalid email address format")
//         return false
//     } else {
//         $("#signin").hide()
//         $("#spinner").show()

//         firebase.auth().signInWithEmailAndPassword(email, password)
//             .then((userCredentials) => {
//                 sessionStorage.setItem("uid", userCredentials.user.uid)
//                 window.location.href = "./dashboard/dashboard-index.html"
//             }).catch((error) => {
//                 swal({
//                     title: "Sign In",
//                     text: 'invalid Login Details',
//                     icon: "error",
//                     button: "Try again"
//                 }).then(function () {
//                     $("#spinner").hide()
//                     $("#signin").show()
//                     return false
//                 })
//         })
//     }
// });

$(document).ready(function () {
    $("#spinner").hide()
})


const loginBtn = document.getElementById("signin").onclick = ((e) => {
    e.preventDefault()

    const password = document.getElementById("password-signin").value
    const email = document.getElementById("email-signin").value

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        $("#email-signin").css("border", "solid red 2px")
        $("#error-email").text("Invalid email address format")
        return false
    } else {
        $("#signin").hide()
        $("#spinner").show()

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            // sessionStorage.setItem("uid", userCredentials.user.uid)
            const user = userCredentials.user;
            user.reload().then(() => {
                if (user.emailVerified){
                    // document.getElementById('message').innerText = "Login successful. Email is verified!";
                    // Proceed to app...
                    window.location.href = "./dashboard/dashboard-index.html"
                } else {
                    document.getElementById('message').innerHTML ="Email not verified. Please check your inbox.";
                }
            });
        }).catch((error) => {
            swal({
                title: "Sign In",
                text: 'invalid Login Details',
                icon: "error",
                button: "Try again"
            }).then(function () {
                $("#spinner").hide()
                $("#signin").show()
                return false
            })
        })
    }
});


