$(document).ready(function(){

  $(".btncreate").click(function(event){
    event.preventDefault();
    var createEmail = $("#createemail").val();
    var createPassword = $("#createpassword").val();
  
    firebase.auth().createUserWithEmailAndPassword(createEmail, createPassword)
    .then(function(response){
      window.location = "home.html?id=" + response.user.uid;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  });

  $(".btnenter").click(function(event){
    event.preventDefault();
    var enterEmail = $("#enteremail").val();
    var enterPassword = $("#enterpassword").val();

    firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword)
    .then(function(response){
      window.location = "home.html?id=" + response.user.uid;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  });


});
