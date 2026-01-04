document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("aiToggle");
    const panel = document.getElementById("aiPanel");
    const close = document.getElementById("closeAI");
    const sendBtn = document.getElementById("sendBtn");

    toggle.onclick = () => {
        panel.style.display = "block";
        toggle.style.display = "none";
    };

    close.onclick = () => {
        panel.style.display = "none";
        toggle.style.display = "block";
    };

    sendBtn.onclick = () => {
        const input = document.getElementById("userInput");
        if (!input.value.trim()) return;

        addMsg("You", input.value);
        input.value = "";

        setTimeout(() => {
            addMsg("Eldar-AI", "UI test successful. AI backend not connected yet.");
        }, 400);
    };
});

function addMsg(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${sender}:</b> ${text}<br><br>`;
    document.getElementById("messages").appendChild(div);
}

