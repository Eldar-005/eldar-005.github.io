const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const aiToggleBtn = document.getElementById('ai-toggle-btn');
const aiChat = document.getElementById('ai-chat');

// Eldar-AI persona prompt
const personaPrompt = `
You are Eldar Hamidov, a high-achieving student with expertise in robotics, AI, and cybersecurity.
Answer questions as if you are him, providing experience from competitions, projects, and learning journey.
Be friendly, informative, and confident.
`;

// Toggle funksiyası: aç/bağla
aiToggleBtn.addEventListener('click', () => {
    if (aiChat.style.display === 'flex') {
        aiChat.style.display = 'none'; // bağla
    } else {
        aiChat.style.display = 'flex'; // aç
        chatInput.focus(); // açanda yazı hissəsinə fokus
    }
});

// AI cavab funksiyası (hazırda predefined)
function respond(userMessage) {
    const msg = userMessage.toLowerCase();

    if(msg.includes("professionals competition")) {
        return "Ah, the Professionals Competition! I learned a lot about advanced robotics systems, teamwork, and problem-solving strategies.";
    } else if(msg.includes("new experiences") || msg.includes("experience")) {
        return "Recently, I gained experience in AI algorithm optimization and handling real-time data during competitions.";
    } else if(msg.includes("ai project")) {
        return "My AI project focuses on real-time data processing and intelligent decision-making, which I developed for HASC 2025.";
    } else {
        return "Interesting question! Could you be more specific or ask about my competitions, AI projects, or robotics experience?";
    }
}

// Mesaj göndərmə funksiyası
function sendMessage() {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // User mesajını chatdə göstər
    chatBody.innerHTML += `<p><strong>You:</strong> ${userMsg}</p>`;

    // AI cavabı
    const aiMsg = respond(userMsg);
    chatBody.innerHTML += `<p><strong>Eldar-AI:</strong> ${aiMsg}</p>`;

    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight; // avtomatik scroll
}

// Send düyməsi
sendBtn.addEventListener('click', sendMessage);

// Enter ilə göndərmə
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});
