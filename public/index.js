var database = firebase.database();
$(document).ready(function(){
  $(".sign-in-button").click(function(event){
    event.preventDefault();
    var email = $(".sign-in-email").val();
    var password = $(".sign-in-password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
      var userId = response.user.uid;
      window.location = "feed.html?id=" + userId
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    })
  })
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
  $(".sign-up-button").click(function(event){
     event.preventDefault();
    var name = $(".sign-up-name").val();
    var email = $(".sign-up-email").val();
    var password = $(".sign-up-password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        var userId = response.user.uid;
        database.ref("users/" + userId).set({
          name: name,
          email: email
        });
        window.location = "feed.html?id=" + userId
      })
    .catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     alert(errorCode, errorMessage);
    })
  })
})
