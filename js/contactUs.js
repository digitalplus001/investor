
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/8.4.1/firebase-database.js";


//listen for submit event//(1)
/*document
  .getElementById('contact-form')
  .addEventListener('submit', formSubmit);

//Submit form(2)
function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let name = document.querySelector('#fname').value;
  let email = document.querySelector('#email').value;
  let message = document.querySelector('#message').value;

  //send message values(3)
  sendMessage(name, email, message);
}

//Send Message to Firebase(4)
/*function sendMessage(name, email, message) {
  const database = getDatabase();

  set(ref(database, 'users/' + Math.floor(Math.random() * 10000000)), {
    name: name,
    email: email,
    message: message
  }).then(() => {
      //Show Alert Message(5)
      swal({
        title: "Contact Form",
        text: "Message sent successfully. We will reply shortly",
        icon: "success",
        button: "Back to Home"
    }).then(function () {
        window.location = "../index.html";
    })
   document.getElementById('registrationform').reset();
  }).catch((error) => {
    swal({
        title: "Contact Form",
        text: "Message sending failed",
        icon: "error",
        button: "Send again"
    }).then(function () {
        window.location();
    })
    console.log(error.message)
  })
}*/

document.getElementById("contact-form").addEventListener("submit", submitMessage);

function submitMessage(e) {
    e.preventDefault();

    let id = Math.floor(Math.random() * 10000000);
    let fname = document.querySelector('#fname').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;


    firebase.database().ref('contactus/' + id).set({
        messageId: id,
        fname: fname,
        email: email,
        message: message
    });

    swal({
        title: "Contact Form",
        text: "Message sent successfully. We will reply shortly",
        icon: "success",
        button: "Back to Home"
    }).then(function () {
        window.location = "../index.html";
    })
}