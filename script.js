let chatBox = document.getElementById("chat-box");

let messages = JSON.parse(localStorage.getItem("chat")) || [];

function saveMessages() {
    localStorage.setItem("chat", JSON.stringify(messages));
}

function loadMessages() {
    chatBox.innerHTML = "";
    messages.forEach((msg, index) => {
        displayMessage(msg.text, msg.type, msg.time, index);
    });
}

function getTime() {
    let now = new Date();
    return now.toLocaleTimeString();
}

function displayMessage(text, type, time, index) {

    let msgDiv = document.createElement("div");
    msgDiv.className = "message " + type;

    msgDiv.innerHTML = `
        ${text}
        <div class="timestamp">${time}</div>
        <button onclick="deleteMessage(${index})">❌</button>
    `;

    chatBox.appendChild(msgDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {

    let input = document.getElementById("message-input");
    let text = input.value.trim();

    if (text === "") return;

    let time = getTime();

    let msg = {
        text: text,
        type: "user",
        time: time
    };

    messages.push(msg);
    saveMessages();
    displayMessage(text, "user", time, messages.length - 1);

    input.value = "";

    setTimeout(botReply, 1000);
}

function botReply() {

    let replies = [
        "Hello!",
        "How can I help you?",
        "Nice to meet you!",
        "This is a mock reply.",
        "I am good",
        "Chat saved locally."
    ];

    let reply = replies[Math.floor(Math.random() * replies.length)];
    let time = getTime();

    let msg = {
        text: reply,
        type: "bot",
        time: time
    };

    messages.push(msg);
    saveMessages();
    displayMessage(reply, "bot", time, messages.length - 1);
}

function deleteMessage(index) {

    messages.splice(index, 1);
    saveMessages();
    loadMessages();
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function startApp() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "flex";
}

loadMessages();
