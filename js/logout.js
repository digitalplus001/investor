document.getElementById("logout-btn").onclick = (() => {
    console.log("Logged out")

    firebase.auth().signOut().then(() => {
        sessionStorage.removeItem("uid")
        swal({
            title: "Logged Out",
            text: "Log out successful",
            icon: "success",
            button: "Login Again"
        }).then(function () {
            $("#spinner").hide()
            $("#signin").show()
            window.location.href = "../index.html"
            return false
        })
    }).catch(error => {
        swal({
            title: "Logged Out",
            text: error.message,
            icon: "error",
            button: "Login Again"
        }).then(function () {
            $("#spinner").hide()
            $("#signin").show()
            return false
        })
    })

    return false
})