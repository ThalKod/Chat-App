
var socket = io();

socket.on("connect", function(){
    console.log("Connected to Server");
});

socket.on("disconnect", function(){
    console.log("Disconnected to server");
});

socket.on("newMessage", function(message){
    console.log("New Message !", message);

    var formatedTime = moment(message.createdTime).format("h:mm a");

    var li = jQuery("<li></li>");
    li.text(message.from + " " + formatedTime + ": "+ message.text);

    jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e){
    e.preventDefault();

    var messageTextBox =  jQuery("[name=message]");

    socket.emit("createdMessage", {
        from: "User",
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("");
    });
});