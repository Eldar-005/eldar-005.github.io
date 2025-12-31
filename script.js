const aiToggleBtn = document.getElementById("ai-toggle-btn");
const aiChat = document.getElementById("ai-chat");
const closeAI = document.getElementById("close-ai");

const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

const resizeHandle = document.getElementById("resize-handle");

let isResizing = false;

/* Toggle AI */
aiToggleBtn.onclick = () => {
    aiChat.style.display = "flex";
};

closeAI.onclick = () => {
    aiChat.style.display = "none";
};

/* Resize logic */
resizeHandle.addEventListener("mousedown", () => {
    isResizing = true;
    document.body.style.cursor = "ew-resize";
});

document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 320 && newWidth <= window.innerWidth * 0.6) {
        aiChat.style.width = newWidth + "px";
    }
});

document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.cursor = "default";
});

/* Persona AI */
function aiResponse(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("professionals")) {
        return "The Professionals Competition taught me advanced robotics design, teamwork under pressure, and real-world problem solving.";
    }
    if (msg.includes("experience")) {
        return "I gained hands-on experience with AI optimization, cybersecurity strategies, and high-level competition workflows.";
    }
    if (msg.includes("ai")) {
        return "AI is one of my strongest areas — from decision-making systems to intelligent automation projects.";
    }

    return "That's a great question. You can ask me about competitions, AI projects, robotics, or my learning journey.";
}

/* Send message */
sendBtn.onclick = sendMessage;
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    const reply = aiResponse(text);
    setTimeout(() => addMessage(reply, "ai"), 400);

    chatInput.value = "";
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}
