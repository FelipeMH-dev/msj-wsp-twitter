const socket = io();

Notification.requestPermission().then(function (result) {
  console.log(result);
});

function notifyMe(message = "Hi there") {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

socket.on("new message", (data) => {
  notifyMe("New SMS received");
  const messagesList = document.getElementById("messages");
  const li = document.createElement("li");
  li.className =
    "list-group-item list-group-item-warning list-group-item-action";

  if (data.Media) {
    const div = document.createElement("div");
    div.className = "embed-responsive embed-responsive-16by9";
    const iframe = document.createElement("iframe");
    iframe.className = "embed-responsive-item";
    iframe.src = data.Media;
    div.appendChild(iframe);
    li.appendChild(div);
  }

  const body = document.createElement("p");
  body.appendChild(document.createTextNode(data.Body));

  data.From = data.From.replace(/[0-9]/g, "x");
  const from = document.createElement("span");
  from.appendChild(document.createTextNode(data.From));

  const _id = document.createElement("span");
  _id.appendChild(document.createTextNode(data._id));
  const createdAt = document.createElement("span");
  createdAt.appendChild(document.createTextNode(data.createdAt));

  li.appendChild(body);
  li.appendChild(from);
  li.appendChild(_id);
  li.appendChild(createdAt);
  messagesList.prepend(li);
});

socket.on("tweet", (tweet) => {
  console.log("tweet ->");
  console.log(tweet.tweet);

  if(tweet.tweet.entities.media){
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/tweet",
      data: JSON.stringify({
        User: tweet.tweet.user.screen_name,
        Body: tweet.tweet.text,
        Userimagen:tweet.tweet.user.profile_image_url_https,
        Url: tweet.tweet.entities.media[0].url,
        DisplayUrl:tweet.tweet.entities.media[0].display_url,
        ExpandedUrl:tweet.tweet.entities.media[0].expanded_url,
        IDmensaje:tweet.tweet.id_str
      }),
      contentType: "application/json",
    });
  }else{
    console.log("entre aqui")
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/tweet",
      data: JSON.stringify({
        User: tweet.tweet.user.screen_name,
        Body: tweet.tweet.text,
        Userimagen:tweet.tweet.user.profile_image_url_https,
        IDmensaje:tweet.tweet.id_str
     
      }),
      contentType: "application/json",
    });
  }
 
});
