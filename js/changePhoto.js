document.querySelector("#photo").onchange = function(){
    document.querySelector("#file-name").textContent = this.files[0].name;
}

function changePhoto() {

    console.log('clicked');
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);
        if (user) {
         
            //const today = new Date();
            const db = firebase.firestore();
            const ref = firebase.storage().ref();
            var file = document.getElementById('photo').files[0];
            const kname = +new Date() + "-" + file.name;
            const metadata = {
                contentType: file.type
            }

            const task = ref.child(kname).put(file, metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url);
                
                db.collection("Nusers").doc(user.uid).update({
                    imageUrl: url
                })
                swal({
                    title: "Profile",
                    text: "Photo updated Succesfully",
                    icon: "success",
                    button: "Back to Profile"
                }).then(function () {
                    window.location.reload()
                })
            })
            
        } else {
          // User is signed out
          // ...
        }
    });

}