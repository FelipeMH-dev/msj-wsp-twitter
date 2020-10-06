const socketIO = require("socket.io");


var Twit = require("twit");
var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_APY_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
let socket;

const connection = (server) => {
  // Adding socket connection to the server
  const io = socketIO.listen(server);

  // Handle events , escuchando nueva conexion
  io.on("connection", (newSocket) => {
    socket = newSocket;
    console.log(newSocket.id);
    var stream = T.stream("statuses/filter", { track: "@FelipeMH93" });

    stream.on("tweet", function (tweet) {
      
      io.emit("tweet", { tweet: tweet });
      console.log(tweet)
    //  console.log(tweet.entities.media[0].expanded_url)
      // res.render("index", { tweets: tweets });

    });
  });
};

const getSocket = () => socket;

module.exports = {
  connection,
  getSocket,
};
