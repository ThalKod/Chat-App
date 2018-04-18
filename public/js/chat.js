var socket = io();


function scrollToBottom(){
    // Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    // Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function(){
    var params = jQuery.deparam(window.location.search);

    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log("No Error");
        }
    });
});

socket.on("disconnect", function(){
    console.log("Disconnected to server");
});

socket.on("newMessage", function(message){
    var formatedTime = moment(message.createdTime).format("h:mm a");

    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
    // console.log("New Message !", message);

    // var formatedTime = moment(message.createdTime).format("h:mm a");

    // var li = jQuery("<li></li>");
    // li.text(message.from + " " + formatedTime + ": "+ message.text);

    // jQuery("#messages").append(li);
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