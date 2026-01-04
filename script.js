// --- LANGUAGE CONFIGURATION ---
let currentLang = 'en';

const aiGreetings = {
    en: "Hello! I am Eldar's AI Assistant. How can I help you regarding his achievements?",
    az: "Salam! Mən Eldarın Süni İntellekt köməkçisiyəm. Onun nailiyyətləri haqqında sizə necə kömək edə bilərəm?"
};

function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    
    // Reset AI greeting when language changes
    const chat = document.getElementById('ai-messages');
    chat.innerHTML = `<div class="msg-bot">${aiGreetings[lang]}</div>`;
    document.getElementById('ai-user-input').placeholder = lang === 'en' ? "Ask a question..." : "Sual verin...";
}

// Initial call
setLang('en');

// --- AI WINDOW CONTROLS ---
const aiBtn = document.getElementById('ai-open-btn');
const aiWin = document.getElementById('ai-window');
const aiClose = document.getElementById('ai-close-btn');

aiBtn.onclick = () => { aiWin.classList.remove('hidden'); aiBtn.classList.add('hidden'); };
aiClose.onclick = () => { aiWin.classList.add('hidden'); aiBtn.classList.remove('hidden'); };

// Resize logic
const resizer = document.getElementById('ai-resizer');
let isResizing = false;

resizer.addEventListener('mousedown', () => { isResizing = true; document.body.style.cursor = 'ew-resize'; });
document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    let newWidth = window.innerWidth - e.clientX;
    if (newWidth > 280 && newWidth < (window.innerWidth * 0.8)) {
        aiWin.style.width = newWidth + 'px';
    }
});
document.addEventListener('mouseup', () => { isResizing = false; document.body.style.cursor = 'default'; });

// --- AI CORE ENGINE (GEMINI) ---
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";

async function askAI(userMsg) {
    const chat = document.getElementById('ai-messages');
    chat.innerHTML += `<div class="msg-user">${userMsg}</div>`;
    chat.scrollTop = chat.scrollHeight;

    const ELDAR_PROMPT = `
    You are Eldar Hamidov's Personal Assistant.
    Current Language: ${currentLang.toUpperCase()}
    Instructions: Respond ONLY in ${currentLang === 'en' ? 'English' : 'Azerbaijani'}.
    
    About Eldar:
    - 1st Place: Professionals Competition (St. Petersburg 2025) - Focus on Cybersecurity & Networking.
    - 2nd Place: National Junior Cybersecurity Olympiad 2025.
    - Winner: SAF Festival 2023 (Innovative Exhibition).
    - Global 2nd Place: RoboCross Egypt 2020.
    - 1st Place: USA International English Olympiad.
    - 1st Place: EU4Climate 'Özün Yarat' 2020.
    - Finalist: Teknofest Azerbaijan 2022, WRO Panama 2020, WRO Azerbaijan 2024.
    - Skills: Python, C++, Robotics, Cybersecurity, Algorithms.
    
    Rule: Be professional, concise, and helpful. If you don't know an answer, direct them to Eldar's email.
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: ELDAR_PROMPT + "\nUser Question: " + userMsg }] }]
            })
        });
        
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        chat.innerHTML += `<div class="msg-bot">${aiResponse}</div>`;
        chat.scrollTop = chat.scrollHeight;
    } catch (error) {
        chat.innerHTML += `<div class="msg-bot">${currentLang === 'en' ? 'Connection error.' : 'Bağlantı xətası.'}</div>`;
    }
}

document.getElementById('ai-send-btn').onclick = () => {
    const input = document.getElementById('ai-user-input');
    if (input.value.trim()) {
        askAI(input.value);
        input.value = "";
    }
};

document.getElementById('ai-user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('ai-send-btn').click();
});
