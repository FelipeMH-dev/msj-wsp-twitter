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
  ///const timeago = require("timeago.js");
  notifyMe("Nuevo mensaje de Whatsapp");


  const messagesList = document.getElementById("messages");

  var d_nested = document.getElementById("NOWSP");
  if(d_nested){
    messagesList .removeChild(d_nested);
  }
  const li = document.createElement("li");
  li.className =
    "list-group-item wspms list-group-item-action";

  const card= document.createElement("div")
  card.className = "card border-success rounded"

  const cardHeader= document.createElement("div")
  cardHeader.className = "card-header text-white bg-success"

  const pH= document.createElement("p")
  pH.className = "text-center"
  const ipH= document.createElement("i")
  ipH.className = "fab fa-whatsapp"

  pH.appendChild(ipH)
  pH.appendChild(document.createTextNode(data.From));
  cardHeader.appendChild(pH)
  //data.From = data.From.replace(/[0-9]/g, "x");
  //const from = document.createElement("span");
  card.appendChild(cardHeader)


  const cardBody= document.createElement("div")
  cardBody.className = "card-body"


  if (data.Media) {
    const div = document.createElement("div");
    div.className = "embed-responsive embed-responsive-16by9";
    const iframe = document.createElement("iframe");
    iframe.className = "embed-responsive-item";
    iframe.src = data.Media;
    div.appendChild(iframe);
    cardBody.appendChild(div);
    
  }

  if(data.Body){
    const div = document.createElement("div");
    div.className = "card mt-1";
    const body = document.createElement("p");
    body.className="text-center"
    body.appendChild(document.createTextNode(data.Body));
    cardBody.appendChild(body)
    
  }

  card.appendChild(cardBody)

  const cardFooter= document.createElement("div")
  cardFooter.className = "card-footer"
  
 // const _id = document.createElement("span");
  //_id.appendChild(document.createTextNode(data._id));
  const createdAt = document.createElement("span");
 //data.createdAt = timeago.format(data.createdAt)
  createdAt.appendChild(document.createTextNode(data.createdAt));
  cardFooter.appendChild(createdAt)
  card.appendChild(cardFooter)
  li.appendChild(card)
  messagesList.prepend(li);
});


//* SOCKET PARA TWEETS
socket.on("tweet", (tweet) => {
  console.log("tweet ->");
  console.log(tweet.tweet);

  notifyMe("Nuevo mensaje de Twitter");
  const messagesList = document.getElementById("tweets");
  var d_nested = document.getElementById("NOTWITTER");
  if(d_nested){
    console.log("He entrado para remover EL ELEMENTO")
    messagesList.removeChild(d_nested);
  }
  const li = document.createElement("li");
  li.className =
    "list-group-item twims list-group-item-action";
const card = document.createElement("div");
card.className= "card border-info rounded"

const cardBody = document.createElement("div");
cardBody.className= "card-body"


  if(tweet.tweet.entities.media){

const blockquote = document.createElement("blockquote");
blockquote.className="twitter-tweet"

const pb = document.createElement("p");
pb.lang = "es"
pb.dir ="ltr"

const ab1 = document.createElement("a");
ab1.href  = tweet.tweet.entities.media[0].url
ab1.appendChild(document.createTextNode(tweet.tweet.entities.media[0].display_url));
pb.appendChild(ab1)

const ab2 = document.createElement("a");
ab2.href = tweet.tweet.entities.media[0].expanded_url ;

blockquote.appendChild(pb)
blockquote.appendChild(ab2)
cardBody.appendChild(blockquote)
const script =document.createElement("script")
script.async;
script.src = "https://platform.twitter.com/widgets.js"
cardBody.appendChild(script)

card.appendChild(cardBody)
li.appendChild(card)
messagesList.prepend(li);

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

    const blockquote = document.createElement("blockquote");
    blockquote.className="twitter-tweet"

    const pb = document.createElement("p");
    pb.lang = "es"
    pb.dir ="ltr"

    const ab1 = document.createElement("a");
    ab1.href  = "https://twitter.com/" + tweet.tweet.user.screen_name + "/status/" +tweet.tweet.id_str;
    pb.appendChild(ab1)
    blockquote.appendChild(pb)

    cardBody.appendChild(blockquote)
    const script =document.createElement("script")
    script.async;
    script.src = "https://platform.twitter.com/widgets.js"
    cardBody.appendChild(script)
    card.appendChild(cardBody)
    li.appendChild(card)
    messagesList.prepend(li);

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


