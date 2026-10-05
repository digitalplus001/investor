
function updateUserProfile(user){
  const username = user.username;
  const userEmail = user.email;
  const userProfilePicture = user.photoURL;

  document.getElementById('userName').textContent = 'Hello,' + ' ' + userEmail;
  document.getElementById('name').textContent = userEmail;
  document.getElementById('userEmail').textContent = userEmail;
  document.getElementById('userProfilePicture').src = userProfilePicture;
}

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
      updateUserProfile(user);
      const uid = user.uid;
      return uid;
  } else {
      window.location.href = 'index.html';
  }
});
