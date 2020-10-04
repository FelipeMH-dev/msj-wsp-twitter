var express = require("express");
var Twitter = require("twitter");
var router = express.Router();

var Twitter = require("twitter");
var client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: "",
});
var params = { screen_name: "nodejs" };
client.get("statuses/user_timeline", params, function (
  error,
  tweets,
  response
) {
  if (!error) {
    console.log(tweets);
  }
});
var client = new Twitter({
  consumer_key: "XXX",
  consumer_secret: "XXX",
  access_token_key: "XXX",
  access_token_secret: "XXX",
});
router.get("/", function (req, res, next) {
    /*
    const tweetList = document.getElementById("tweets");
    const card = document.createElement("div");
    div.className ="card";
    const user = document.createElement("div");
    user.className ="card-header";
    user.appendChild(document.createTextNode(data.user));
    const body = document.createElement("div");
    body.className ="card-body";
    body.appendChild(document.createTextNode(data.text));
    card.appendChild(body);
    card.appendChild(user);
    tweetList.prepend(card)
    */
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  client.get(
    "statuses/user_timeline",
    { screen_name: "nodejs", count: 20 },
    function (error, tweets, response) {
      if (!error) {
        res.status(200).render("index", { tweets: tweets });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});
module.exports = router;
/*
 <div class="col-md-4">
    <form action="/send-sms" method="POST" class="card card-body">
      <div class="form-group">
        <input type="text" name="message" placeholder="Write your message" class="form-control" autofocus>
      </div>
      <div class="form-group">
        <input type="tel" name="phone" placeholder="+205123123" class="form-control" autocomplete="off">
      </div>
      <button class="btn btn-primary btn-block">
        Send
      </button>
    </form>

  </div> */