firebase.auth().createUserWithEmailAndPassword(email, password)
.then()
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
