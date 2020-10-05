const SMS = require("../models/sms");
const TWEET = require("../models/twitter");
const { sendMessage } = require("../twilio/send-sms");
const MessagingReponse = require("twilio").twiml.MessagingResponse;
//var tvd = require('twitter-video-downloader');
const { getSocket } = require("../sockets");

var exif = require('exiftool');
const fs = require("fs");
const request = require("request");

/*
process.stdout.write("mediainfo --Output=JSON \n");
process.stdin.on("data", function (data) {
  let body = JSON.parse(data);
  console.log(body);
}); */

const indexController = async (req, res) => {

 /* fs.readFile('./videos/videodeprueba.mp4', function (err, data) {
    if (err)
      throw err;
    else {
      exif.metadata(data, function (err, metadata) {
        if (err)
          throw err;
        else
          console.log(metadata);
      });
    }
  });*/
  // Find all saved messages
  const messages = await SMS.find().sort("-createdAt").lean();
  console.log(messages);

  for (let i = 0; i <= messages.length - 1; i++) {
    if (messages[i].Media) {
      request(messages[i].Media).pipe(
        fs.createWriteStream("videos/" + i + ".mp4")
      );
    }
  }

  const tweets = await TWEET.find().sort("-createdAt").lean();

  for (let i = 0; i <= tweets.length - 1; i++) {
    if (tweets[i].ExpandedUrl) {
      let url = tweets[i].ExpandedUrl;
      let aux = url.split("/");
      for (let j = 0; j <= aux.length - 1; j++) {
        if (aux[j] === "video") {
          // request(tweets[i].Url).pipe(fs.createWriteStream('videos/' + j +  '_twitter.mp4'));
        }
      }
    }
  }
  console.log(tweets);
  //const tweets = await TWEET.find().sort("-createdAt").lean()
  // console.log("valor de tweet fuera" + tweets);
  res.render("index", { messages: messages, tweets: tweets });
};

const postMessage = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) return res.json("Missing message or phone");

  // Send an SMS with the message
  const result = await sendMessage(message, phone);

  // log the SMS id
  console.log(result.sid);

  // Saving the SMS in database
  await SMS.create({ Body: req.body.message, From: req.body.phone });

  res.redirect("/");
};

const receiveMessage = async (req, res) => {
  const twiml = new MessagingReponse();

  // Receiving the SMS
  console.log(req.body);
  // console.log(req.body.From)
  if (req.body.MediaUrl0) {
    try{
    // Saving the SMS in database
    const savedSMS = await SMS.create({
      Body: req.body.Body,
      From: req.body.From,
      Media: req.body.MediaUrl0,
    });

    //emite un evento con el mensaje
    getSocket().emit("new message", savedSMS); 
    }catch(e){
      console.log(e)
    }
   
  } else {

    try{
      const savedSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From,
      });
      getSocket().emit("new message", savedSMS);

    }catch(e){
      console.log(e)
    }
   
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  // twiml.message('This is my response');
  // console.log(twiml.toString())

  // Reponse Back SMS
  // res.end('<Response></Response>')
  res.end(twiml.toString());
};

const receiveTweet = async (req, res) => {
  console.log("He entrado aqui");
  console.log(req.body);
  if (req.body.Url) {
    const savedTweet = await TWEET.create({
      User: req.body.User,
      Body: req.body.Body,
      Userimagen: req.body.Userimagen,
      Url: req.body.Url,
      DisplayUrl: req.body.DisplayUrl,
      ExpandedUrl: req.body.ExpandedUrl,
      IDmensaje: req.body.IDmensaje,
    });
    await savedTweet.save();
  } else {
    const savedTweet = await TWEET.create({
      User: req.body.User,
      Body: req.body.Body,
      Userimagen: req.body.Userimagen,
      IDmensaje: req.body.IDmensaje,
    });
    await savedTweet.save();
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  /*
  
  let tweets = [];
  T.get("search/tweets", { q: "@FelipeMH93", count: 100 }, function (
    err,
    data,
    res
  ) {
    

    for (let i = 0; i <= data.statuses.length - 1; i++) {
      let tweet = [{ user: "anonimo" + [i], text: data.statuses[i].text }];

      tweets.push(tweet);

      tweet = [];
    }

    console.log(tweets); 
   // res.render("index", { tweets: tweets });
  }); */
};

module.exports = {
  indexController,
  postMessage,
  receiveMessage,
  receiveTweet,
};
