var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
  database.ref('users/' + USER_ID).once('value')
  .then(function(snapshot){
    var userInfo = snapshot.val();
    $(".user-name").text(userInfo.name)
  })

  database.ref('users/').once('value')
  .then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createUsers(childData.name, childKey);
    });
  });

  database.ref('post/' + USER_ID).once('value')
  .then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      var data = document.createElement("small");
      data.textContent = moment().format('hour').fromNow();
      createPost(childData.text, childKey);
    });
  });

  $(".send-button").click(function(event){
    event.preventDefault();

    var text = $(".post-input").val();
    var dropMenu = $(".drop-menu").val();
    $(".post-input").val("");

    var newPostIndb = database.ref('post/' + USER_ID).push({
      text: text,
      menu: dropMenu
    });
    createPost(text, newPostIndb.key);
  })
});

  function createPost(text, key) {
    database.ref('users/' + USER_ID).once("value")
    .then(function(snapshot){
      var nameUser = snapshot.toJSON();
      var namePost = nameUser.name;
      $(".posts-list").append(`
        <li>
          <span>${namePost}</span>
          <span data-text-id="${key}" >${text}</span>
          <button data-edit-id="${key}" >Editar</button>
          <button data-delete-id="${key}" >Excluir</button>
        </li>
      `);

      $(`button[data-delete-id=${key}]`).click(function(){
        $(this).parent().remove();
        database.ref('post/' + USER_ID + "/" + key).remove();
      });
      $(`button[data-edit-id=${key}]`).click(function(){
        console.log("oi");
        var newText = prompt(`Altere seu texto: ${text}`);
        $(`span[data-text-id=${key}]`).text(newText);
          database.ref('post/' + USER_ID + "/" + key).update({
          text: newText
        })
      });
    });
  }
  function createUsers(name, key){
    if (key !== USER_ID){
      $(".users-list").append(`
          <li>
          <span>${name}</span>
          <button data-user-id="${key}">Seguir</button>
          </li>
      `);
      $(`button[data-user-id=${key}]`).click(function(){
        database.ref('friendship/' + USER_ID).push({
          friendship: key,
          name: name
        });
        $(this).parent().attr("class", "friend-follow");
        $(".users-follow").append(`
        <li>
          <span>${name}</span>
          <span data-user-id="${key}">Seguindo</span>
          </li>
       `);
      })
      // if
      // for Each
      // snashot childSnapshot
      // ref data base.once.("value").then
    }
  }
