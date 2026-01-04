// 1. DİL DEĞİŞTİRME SİSTEMİ
function setLang(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}
// Sayfa ilk açıldığında çalıştır
setLang('en');

// 2. AI PENCERE KONTROLLERİ
const aiBtn = document.getElementById('ai-open-btn');
const aiWin = document.getElementById('ai-window');
const aiClose = document.getElementById('ai-close-btn');

aiBtn.onclick = () => {
    aiWin.classList.remove('hidden');
    aiBtn.classList.add('hidden');
};

aiClose.onclick = () => {
    aiWin.classList.add('hidden');
    aiBtn.classList.remove('hidden');
};

// 3. RESIZE (BOYUTLANDIRMA) MANTIĞI
const resizer = document.getElementById('ai-resizer');
let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    let newWidth = window.innerWidth - e.clientX;
    if (newWidth > 250 && newWidth < (window.innerWidth * 0.8)) {
        aiWin.style.width = newWidth + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// 4. YAPAY ZEKA (API) ENTEGRASYONU
const API_KEY = "BURAYA_KENDİ_API_KEYİNİ_YAZ"; // Gemini API Key

// PROMPT: Burası senin yarışma detaylarınla dolacak!
const ELDAR_PROMPT = `
Sen Eldar Hamidov'un CV asistanısın. Sadece aşağıda verilen bilgilere dayanarak cevap ver. 
Eldar'ın Başarıları:
- Saint Petersburg "Professionallar" Yarışması (2025): 1. Yer kazandı. Bu yarışmada kiber güvenlik ve ağ sistemleri üzerine karmaşık senaryoları çözdü.
- Milli Gənc Kiber Təhlükəsizlik Olimpiadası (2025): 2. Yer. CTF formatında yarıştı.
- RoboCross Online Challenge (Mısır, 2020): Dünya 2.si oldu. Robotik kodlama yaptı.
- SAF Festivali (2023): Yenilikçi Sergi kategorisinde kazanan oldu.
Kurallar: Sadece bu yarışmalarla ilgili detaylı bilgi ver. Eğer bilmediğin bir şey olursa "Bu konuda detaylı bilgim yok, Eldar ile iletişime geçebilirsin" de.
`;

async function getAIResponse(userMsg) {
    const msgContainer = document.getElementById('ai-messages');
    
    // Kullanıcı mesajını ekle
    msgContainer.innerHTML += `<div class="msg-user">${userMsg}</div>`;
    msgContainer.scrollTop = msgContainer.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: ELDAR_PROMPT + "\nKullanıcı Sordu: " + userMsg }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        msgContainer.innerHTML += `<div class="msg-bot">${aiText}</div>`;
        msgContainer.scrollTop = msgContainer.scrollHeight;
    } catch (error) {
        msgContainer.innerHTML += `<div class="msg-bot">Hata: API'ye bağlanılamadı.</div>`;
    }
}

document.getElementById('ai-send-btn').onclick = () => {
    const input = document.getElementById('ai-user-input');
    if (input.value.trim()) {
        getAIResponse(input.value);
        input.value = "";
    }
};

// Enter tuşu ile gönderim
document.getElementById('ai-user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('ai-send-btn').click();
});
