const aiBtn = document.getElementById("ai-btn");
const aiPanel = document.getElementById("ai-panel");
const closeAI = document.getElementById("close-ai");

const input = document.getElementById("ai-input");
const send = document.getElementById("send");
const messages = document.getElementById("ai-messages");

aiBtn.onclick = () => {
    aiPanel.style.display = "flex";
};

closeAI.onclick = () => {
    aiPanel.style.display = "none";
};

send.onclick = sendMessage;
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
        addMessage(aiReply(text), "ai");
    }, 300);
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function aiReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("competition")) {
        return "Competitions taught me discipline, teamwork, and solving real-world problems under pressure.";
    }
    if (msg.includes("experience")) {
        return "I gained strong experience in AI logic, robotics systems, and cybersecurity fundamentals.";
    }
    if (msg.includes("ai")) {
        return "AI is one of my main focus areas, especially intelligent decision-making systems.";
    }

    return "You can ask me about competitions, AI projects, or my learning journey.";
}
