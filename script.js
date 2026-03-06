const chatBox = document.getElementById("chat-box");
const typing = document.getElementById("typing");

// Load sounds
const sendSound = new Audio("/static/sounds/send.wav");
const receiveSound = new Audio("/static/sounds/receive.wav");

/* Send message */
function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    sendSound.play();

    
    input.value = "";

    showTyping();

    fetch("/get", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ msg: text })
    })
    .then(res => res.json())
    .then(data => {
        hideTyping();
        addMessage("bot", data.reply);
        receiveSound.play();
        
    });
}

/* Add smooth animated messages */
function addMessage(sender, text) {
    let msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}-msg`;

    let prefix = sender === "bot" ? "🤖 " : "";

    let bubble = document.createElement("div");
    bubble.className = `bubble ${sender}-bubble`;
    bubble.innerText = prefix + text;

    msgDiv.appendChild(bubble);
    chatBox.appendChild(msgDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

/* Typing indicator */
function showTyping() {
    typing.style.display = "block";
}
function hideTyping() {
    typing.style.display = "none";
}

/* Enter to send */
function checkEnter(event) {
    if (event.key === "Enter") sendMessage();
}



/* Load chat */
window.onload = () => {
    let history = JSON.parse(localStorage.getItem("chat_history")) || [];
    history.forEach(msg => addMessage(msg.sender, msg.text));
};
