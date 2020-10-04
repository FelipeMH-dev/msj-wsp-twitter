const socketIO = require("socket.io");


var Twit = require("twit");
var T = new Twit({
  consumer_key: "CFBNtsIBflkbIMn5sCVqzqrQi",
  consumer_secret: "2cmm9egAq6NkbPK5jOH0roeYy3lqr47RDYYPPltbmG1d6oZqTh",
  access_token: "1251760929521483776-WO0s4IUb4vzyOI7cLNiQUnM1RlJu7R",
  access_token_secret: "EZgV1XX7fuu0P5QBJVCm3SYDj1U9mtokZoP0kAgN7EoZL",
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
