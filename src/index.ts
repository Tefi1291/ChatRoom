import "./css/main.css";
import * as signalR from "@aspnet/signalr";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLInputElement = document.querySelector("#btnSend");
const usernameInput: HTMLInputElement = document.querySelector("#usernameInput");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.on("messageReceived", (username: string, message: string) => {
    let msgDiv = document.createElement("div");

    msgDiv.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(msgDiv);
    //divMessages.scrollTop = divMessages.scrollHeight;
});

connection.start()
    .catch(error => document.write(error));

tbMessage.addEventListener("keyup", (ev: KeyboardEvent) => {
    if (ev.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", (ev: MouseEvent) => {
    send();
});

function send() {
    let username = usernameInput.value;
    connection.send("newMessage", username, tbMessage.value)
        .then(() => {
            tbMessage.value = "";
        });
}
