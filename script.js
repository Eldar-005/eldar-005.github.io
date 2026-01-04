// Dil Ayarı
function setLang(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}
setLang('en');

// AI Pencere Kontrolü
const aiBtn = document.getElementById('ai-open-btn');
const aiWin = document.getElementById('ai-window');
const aiClose = document.getElementById('ai-close-btn');

aiBtn.onclick = () => { aiWin.classList.remove('hidden'); aiBtn.classList.add('hidden'); };
aiClose.onclick = () => { aiWin.classList.add('hidden'); aiBtn.classList.remove('hidden'); };

// Boyutlandırma (Resize)
const resizer = document.getElementById('ai-resizer');
let isResizing = false;

resizer.addEventListener('mousedown', () => { isResizing = true; });
document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    let newWidth = window.innerWidth - e.clientX;
    if (newWidth > 250 && newWidth < (window.innerWidth * 0.7)) {
        aiWin.style.width = newWidth + 'px';
    }
});
document.addEventListener('mouseup', () => { isResizing = false; });

// --- AI CORE ---
const API_KEY = "BURAYA_API_KEY_YAZILACAK";

const ELDAR_PROMPT = `
Sen Eldar Hamidov'un CV asistanısın. Eldar hakkında şu bilgilere sahipsin:
YARIŞMALAR:
- Professionals St. Petersburg 2025: 1. Yer (Şampiyon).
- National Junior Cybersecurity Olympiad 2025: 2. Yer.
- WRO Azerbaijan 2024: Finalist.
- SAF Festival 2023: Winner (Innovative Exhibition).
- Teknofest Azerbaijan 2022: Finalist.
- RoboCross Egypt 2020: Global 2nd Place.
- EU4Climate 'Özün Yarat' 2020: 1st Place.
- WRO Canada 2020: 5th Place.

SERTİFİKALAR:
- USA International English Olympiad: 1st Place.
- International AI Olympiad: Honor Roll.
- Bebras Informatics (USA & Azerbaijan): Semifinalist ve Honor Roll.
- AKTA Cyber Summer School katılımcısı.

TALİMAT: Sadece bu bilgiler ışığında profesyonel ve kısa cevaplar ver. Eldar'ın yeteneklerini (Python, C++, Robotics) öne çıkar. Bilmediğin sorulara nazikçe Eldar'ın e-postasına yönlendir.
`;

async function askAI(userMsg) {
    const chat = document.getElementById('ai-messages');
    chat.innerHTML += `<div class="msg-user">${userMsg}</div>`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: ELDAR_PROMPT + "\nSoru: " + userMsg }] }]
            })
        });
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        chat.innerHTML += `<div class="msg-bot">${text}</div>`;
        chat.scrollTop = chat.scrollHeight;
    } catch (e) {
        chat.innerHTML += `<div class="msg-bot">Üzgünüm, şu an cevap veremiyorum.</div>`;
    }
}

document.getElementById('ai-send-btn').onclick = () => {
    const inp = document.getElementById('ai-user-input');
    if(inp.value) { askAI(inp.value); inp.value = ""; }
};
