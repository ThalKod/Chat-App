const express   = require("express");
const http      = require("http");
const port      = process.env.PORT || 3000;
const socketIO  = require("socket.io");

const {generateMessage} = require("./utils/message");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) =>{
    console.log("New User connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Join"));

    socket.on("createdMessage", (message, callback)=>{
        console.log("Message Created",message);

        io.emit("newMessage",generateMessage(message.from , message.text));
        callback("from the server");
        // socket.broadcast.emit("newMessage", {
        //     rom: message.from,
        //     text: message.text,
        //     createdAt: Date.now()
        // });
    });


    socket.on("disconnect", ()=>{
        console.log("Disconnected from Server");
    });

});

server.listen(port, ()=>{
    console.log("Listening on port " + port);
});

