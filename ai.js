const panel = document.getElementById("aiPanel");
const toggle = document.getElementById("aiToggle");

toggle.onclick = () => {
    panel.style.display = "block";
    toggle.style.display = "none";
};

document.getElementById("closeAI").onclick = () => {
    panel.style.display = "none";
    toggle.style.display = "block";
};

function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;

    input.value = "";
    addMsg("You", msg);

    // TEST MODE RESPONSE
    setTimeout(() => {
        addMsg("Eldar-AI", "AI backend not connected yet. UI is working correctly.");
    }, 500);
}

function addMsg(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${sender}:</b> ${text}<br><br>`;
    document.getElementById("messages").appendChild(div);
}
