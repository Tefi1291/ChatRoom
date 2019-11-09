"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@aspnet/signalr");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.on("messageReceived", function (username, message) {
    var msgDiv = document.createElement("div");
    msgDiv.innerHTML = "<div class=\"message-author\">" + username + "</div><div>" + message + "</div>";
    divMessages.appendChild(msgDiv);
    //divMessages.scrollTop = divMessages.scrollHeight;
});
connection.start()
    .catch(function (error) { return document.write(error); });
tbMessage.addEventListener("keyup", function (ev) {
    if (ev.keyCode === 13) {
        send();
    }
});
btnSend.addEventListener("click", function (ev) {
    send();
});
function send() {
    var username = "estefania";
    connection.send("newMessage", username, tbMessage.value)
        .then(function () {
        tbMessage.value = "";
    });
}
