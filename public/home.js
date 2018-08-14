var database = firebase.database();
$(document).ready(function(){
  // var userId = firebase.auth().currentUser.uid;
  // console.log(userId);
  var userId = "batata";
   //usar o reguex aqui
  database.ref('/posts/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});

// dar um jeito de fazer um for (forEach(para cada userId dos amigos dentro do user)) 
// fazer um if para public e friends, myself
// database.ref('/posts/' /*+ userId dos amigos*/).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// });





  $(".post-btn").click(function(event){
    event.preventDefault();
    var newPost = $(".post-input").val();
    var modeVal = $("#drop-menu").val();

    var userId = "batata";

    
    database.ref('posts/' + userId).push({
      // user:
      text: newPost,
      mode: modeVal,
      // profile_picture : imageUrl
    });


    $(".posts-list").prepend(`<div>${newPost}</div>`)
  });
});