const express   = require("express");
const http      = require("http");
const port      = process.env.PORT || 3000;
const socketIO  = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) =>{
    console.log("New User connected");


    socket.emit("newMessage", {
        from: "mike",
        text: "Hey, What's up my man ! testing it",
        createdAt: Date.now()
    });

    socket.on("createdMessage", (message)=>{
        console.log("Message Created",message);
    });


    socket.on("disconnect", ()=>{
        console.log("Disconnected from Server");
    });

});

server.listen(port, ()=>{
    console.log("Listening on port " + port);
});

