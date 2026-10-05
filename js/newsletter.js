document.getElementById("newsletterForm").addEventListener("submit", subscribeNews);

function subscribeNews(e) {
    e.preventDefault();

    let id = Math.floor(Math.random() * 10000000);
    let email = document.querySelector('#email').value;
    console.log(email);

    firebase.database().ref('newsletter/' + id).set({
        messageId: id,
        email: email,
    });

    swal({
        title: "Newsletter",
        text: "Subscription successful",
        icon: "success",
        button: "Return"
    }).then(function () {
        window.location.reload();
    })
}